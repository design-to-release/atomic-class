import type { TreeConstructor } from 'hyntax';
import type { LoaderContext } from 'webpack';

import { constructTree, tokenize } from 'hyntax';
import MagicString from 'magic-string';
import { Project } from 'ts-morph';
import { PluginSymbol } from '../plugin';
import { expandsReturnStmt, getIninDataReturnStmt } from './ast/script';

export default async function(this: LoaderContext<{ dbg: boolean }>, contents: string): Promise<string> {
  const loaderContext = this;
  const options = loaderContext.getOptions();

  const magicContent = new MagicString(contents);
  const { tokens } = tokenize(contents);
  const { ast } = constructTree(tokens);

  const tpl = ast.content.children.find(
    ({ nodeType, content }) => nodeType === 'tag' && (content as TreeConstructor.NodeContents.Tag).name === 'template',
  ) as TreeConstructor.TagNode | undefined;
  const script = ast.content.children.find(({ nodeType }) => nodeType === 'script') as
    | TreeConstructor.ScriptNode
    | undefined;

  if (!tpl) {
    return contents;
  }

  let stack = [tpl];
  let usedIndex = 0;
  const sheetRegistries: Array<Record<string, string[] | undefined>> = [];
  for (let curr = tpl.content, i = 0; i < stack.length; ++i) {
    curr = stack[i].content;
    if (curr.children) {
      stack.push(...curr.children.filter((i) => i.nodeType === 'tag') as TreeConstructor.TagNode[]);
    }

    if (curr.attributes) {
      let needInject = false;
      let classAttrNode = undefined;
      for (const attr of curr.attributes) {
        if (attr.key?.content.startsWith('ac-')) {
          const usedClasses = attr.value?.content.split(' ').filter(i => {
            if (i) {
              loaderContext[PluginSymbol].adoptedClasses.add(i);
              return true;
            }

            return false;
          });
          needInject = true;
          magicContent.overwrite(
            attr.key.startPosition,
            (attr.endWrapper?.endPosition ?? attr.key.startPosition) + 1,
            '',
          );

          if (!sheetRegistries[usedIndex]) {
            sheetRegistries[usedIndex] = {};
          }
          sheetRegistries[usedIndex][attr.key.content.slice(3)] = usedClasses;
        } else if (attr.key?.content === 'class') {
          classAttrNode = attr;
        }
      }
      if (needInject) {
        let startPos = curr.openStart.endPosition;
        let endPos = -1;
        const cls = `class="${classAttrNode?.value?.content
          ?? ''} {{ __θac${usedIndex} }}"`;
        if (classAttrNode) {
          startPos = classAttrNode.key?.startPosition ?? 0;
          endPos = classAttrNode.endWrapper?.endPosition ?? 0;
        }
        const event = `on-actrigger="__ac${usedIndex}Trigger"`;

        if (endPos === -1) {
          magicContent.appendRight(startPos + 1, ` ${event} ${cls} `);
        } else {
          magicContent.overwrite(startPos, endPos + 1, `${event} ${cls}`);
        }

        usedIndex++;
      }
    }
  }

  if (script) {
    const basePos = script.content.value.startPosition;

    magicContent.appendRight(
      basePos + 1,
      `\r\nimport { ac as __θac } from '@atomic-class/san';
      ${
        Array(usedIndex).fill(0).map((_, i) => `
        const __ac${i}Trigger = function (ev) {
          __θac(${JSON.stringify(sheetRegistries[i])}, function (vm, s) {
            vm.data.set('__θac0', s);
          })(this, ev);
        };
      `).join('\r\n')
      }`,
    );

    const proj = new Project();
    const sourceFile = proj.createSourceFile(
      'temp.ts',
      script.content.value.content,
    );

    const exportAssignment = sourceFile.getExportAssignment((i) => !i.isExportEquals())!;
    const returnStmt = getIninDataReturnStmt(exportAssignment);

    expandsReturnStmt(
      magicContent,
      returnStmt,
      `{ ${Array(usedIndex).fill(0).map((_, i) => `__θac${i}: ''`).join(',')} }`,
      basePos,
    );

    // Inject event handlers
    magicContent.appendRight(
      basePos + (exportAssignment.getStart() ?? 0) + 18,
      `${
        Array(usedIndex).fill(0).map((_, i) => `
        __ac${i}Trigger,
      `).join('')
      }`,
    );
  }

  contents = magicContent.toString();

  if (options.dbg) {
    console.log(contents);
  }

  return contents;
}
