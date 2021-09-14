import type { TreeConstructor } from 'hyntax';
import type { LoaderContext } from 'webpack';

import hash from 'hash-sum';
import { constructTree, tokenize } from 'hyntax';
import MagicString from 'magic-string';
import { Project, SyntaxKind } from 'ts-morph';
import { PluginSymbol } from '../plugin';
import { getIninDataReturnStmt } from './ast/script';

const enum ACKey {
  NS = 'ac-',
  Props = 'ac-props',
}

export default async function(this: LoaderContext<{ dbg: boolean }>, contents: string): Promise<string> {
  const loaderContext = this;
  const options = loaderContext.getOptions();

  const adoptedClasses: Set<string> | undefined = loaderContext[PluginSymbol]?.adoptedClasses;

  if (!adoptedClasses) {
    console.warn('\x1B[33mAtomic Class Webpack Plugin maybe missing!\x1B[39m');
  }

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

  interface ACProp {
    classes: string;
    overlap: boolean;
  }
  type ACProps = Record<string, ACProp>;
  interface ACPropsVarFlag {
    id: string;
    userDefinedName?: string;
  }

  // Key: definition of var
  // Value: props
  const elProps = new WeakMap<ACPropsVarFlag, ACProps>();

  // Valid var definitions, in order to preserve the reference,
  // so that the data in the WeakMap is not destroyed.
  // It is also a map that maintains the mapping between
  // user-defined variable names and ACPropsVarFlag,
  // which is used to query ACProps in TypeScript AST
  // by the `Identifier` of `PropertyAssignment`.
  const validPropsVarDefs = new Map<string, ACPropsVarFlag>();

  // The children of the current element will be added
  // to the end of the stack, and the pointer will keep moving forward
  const stack = [tpl];
  for (let usedIndex = 0, i = 0; i < stack.length; ++i) {
    let curr = stack[i].content;

    // If the user defines a variable and passes it into the `ac-props`,
    // then we will extract the contents of the current element all attributes
    // that start with `ac-*`, and use them as the content of the variable.
    const elPropsVarFuture: ACPropsVarFlag = {
      id: `_ac_props_${usedIndex}_${hash(curr)}`,
    };

    const currElProps: ACProps = {};
    elProps.set(elPropsVarFuture, currElProps);

    if (curr.children) {
      stack.push(...curr.children.filter((i) => i.nodeType === 'tag') as TreeConstructor.TagNode[]);
    }

    if (curr.attributes) {
      for (const attr of curr.attributes) {
        const attrKey = attr.key!.content;

        // Process ac-props
        if (attrKey === ACKey.Props) {
          elPropsVarFuture.userDefinedName = attr.value?.content;
          magicContent.overwrite(
            attr.key!.startPosition,
            attr.endWrapper!.endPosition + 1,
            '',
          );
        } // Process ac-* except ac-props
        else if (attrKey.startsWith(ACKey.NS)) {
          magicContent.overwrite(
            attr.key!.startPosition,
            attr.endWrapper!.endPosition + 1,
            '',
          );

          // Examples:
          //   ac-active-ol => ['active', 'ol']
          //   ac-active => ['active', undefined]
          const [state, olFlag] = attr.key!.content.split('-').slice(1) as [string, string?];
          currElProps[state] = {
            classes: attr.value?.content.trim() ?? '',
            overlap: olFlag ? true : false,
          };
        } // Only for collecting used class names.
        else if (attrKey === 'class') {
          // `{{(.*?)}}` is used to exclude variables from the template.
          const classes = attr.value?.content.replace(/{{(.*?)}}/g, '').trim().split(/\s+/);
          if (classes) {
            for (const cls of classes) {
              adoptedClasses?.add(cls);
            }
          }
        }
      }
      if (elPropsVarFuture.userDefinedName) {
        ++usedIndex;
        validPropsVarDefs.set(elPropsVarFuture.userDefinedName, elPropsVarFuture);
      }
    }
  }

  // Extracts the used class names.
  //
  // ============= WARNING =============
  // Be sure to be alert to the potential
  // performance problems caused by for loop nesting!!!
  // ============= WARNING =============
  //
  for (const [_, def] of validPropsVarDefs) {
    const props = Object.values(elProps.get(def)!);
    for (const prop of props) {
      // After ensuring that there are no extra spaces
      // at the beginning and end of classes,
      // we can omit the filter operator.
      const classes = prop.classes.split(/\s+/);
      for (const cls of classes) {
        adoptedClasses?.add(cls);
      }
    }
  }

  if (script) {
    const basePos = script.content.value.startPosition;

    const proj = new Project();
    const sourceFile = proj.createSourceFile(
      'temp.ts',
      script.content.value.content,
    );

    const exportAssignment = sourceFile.getExportAssignment((i) => !i.isExportEquals())!;
    const returnStmt = getIninDataReturnStmt(exportAssignment);
    const acPropsAssignments = returnStmt.getDescendantsOfKind(SyntaxKind.PropertyAssignment).filter(i =>
      validPropsVarDefs.has(i.getName())
    );

    for (const i of acPropsAssignments) {
      const name = i.getName();
      const props = elProps.get(validPropsVarDefs.get(name)!)!;
      const startPos = basePos + i.getStart();
      const endPos = basePos + i.getEnd();
      magicContent.overwrite(startPos, endPos, `${name}: ${JSON.stringify(props)}`);
    }
  }

  contents = magicContent.toString();

  if (options.dbg) {
    console.log(contents);
  }

  return contents;
}
