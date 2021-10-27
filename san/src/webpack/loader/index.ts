import type { TreeConstructor } from 'hyntax';
import type { LoaderContext } from 'webpack';

import hash from 'hash-sum';
import MagicString from 'magic-string';
import { PluginSymbol } from '../plugin';
import splitSFC from './ast/split-sfc';

const enum ACKey {
  NS = 'ac-',
  Props = 'ac-props',
  Id = 'ac-id',
  State = 'ac-state',
  Class = 'ac-class',
}

export default async function(this: LoaderContext<{ dbg: boolean }>, contents: string): Promise<string> {
  const loaderContext = this;
  const options = loaderContext.getOptions();

  const adoptedClasses: Set<string> | undefined = loaderContext[PluginSymbol]?.adoptedClasses;

  if (!adoptedClasses) {
    console.warn('\x1B[33mAtomic Class Webpack Plugin maybe missing!\x1B[39m');
  }

  function $collectingClasses(classList: string[]): void {
    if (adoptedClasses) {
      for (const i of classList) {
        adoptedClasses.add(i);
      }
    }
  }

  const magicContent = new MagicString(contents);

  const [tpl, _script] = splitSFC(contents);

  interface ACProp {
    tailwind: string[];
  }
  type ACProps = Record<string, ACProp>;
  interface ACElement {
    tagName: string;
    customId: string;
    props: ACProps;
    stateExpr: string;
  }

  // Key: definition of var
  // Value: props
  // const elProps = new WeakMap<ACPropsVarFlag, ACProps>();

  // Valid var definitions, in order to preserve the reference,
  // so that the data in the WeakMap is not destroyed.
  // It is also a map that maintains the mapping between
  // user-defined variable names and ACPropsVarFlag,
  // which is used to query ACProps in TypeScript AST
  // by the `Identifier` of `PropertyAssignment`.
  // const validPropsVarDefs = new Map<string, ACPropsVarFlag>();

  const acElements = new Set<ACElement>();

  // The children of the current element will be added
  // to the end of the stack, and the pointer will keep moving forward
  const stack = [tpl];
  for (let i = 0; i < stack.length; ++i) {
    const curr = stack[i].content;

    if (curr.children) {
      stack.push(...curr.children.filter((i) => i.nodeType === 'tag') as TreeConstructor.TagNode[]);
    }

    if (!curr.attributes) {
      continue;
    }

    let isACEl = false;
    let customId: string | undefined;
    let stateExpr: string | undefined;
    let classAttrRef: TreeConstructor.TagAttribute | undefined;
    const id = `${ACKey.NS}${hash(curr)}`;
    const props: ACProps = {};

    for (const attr of curr.attributes) {
      // If attribute exists, its key must also fucking exist.
      const attrKey = attr.key!.content;

      if (!attrKey.startsWith(ACKey.NS)) {
        if (attrKey === 'class') {
          classAttrRef = attr;
          // `{{(.*?)}}` is used to exclude variables from the template.
          $collectingClasses(classStrToList(attr.value?.content.replace(/{{(.*?)}}/g, '') ?? ''));
        }
        continue;
      }

      //
      // Now analyze the attributes starting with "ac-".
      //

      // It's of course an AC Element.
      isACEl = true;
      magicContent.remove(attr.key!.startPosition, attr.endWrapper!.endPosition + 1);

      // The IFELSE block here is only used to determine the attrKey,
      // please make sure not to add other logic.
      if (attrKey === ACKey.Id) {
        // I won't waste any time on your crappy code.
        // Even if you set an empty id, I'll still move on.
        customId = attr.value?.content ?? id;
      } else if (attrKey === ACKey.State) {
        stateExpr = attr.value!.content;
      } else {
        const classList = classStrToList(attr.value?.content ?? '');
        $collectingClasses(classList);
        // So the later defined attributes will override the previous.
        props[attrKey.slice(ACKey.NS.length)] = {
          tailwind: [...classList],
        };
      }
    }

    if (isACEl) {
      customId = customId ?? id;
      stateExpr = stateExpr ?? '';
      let additionalClasses = `${customId} ${stateExpr} ${props['class']?.tailwind.join(' ') ?? ''}`.trim();

      if (classAttrRef?.value) {
        const trailingSpace = classAttrRef.value.content === '' ? '' : ' ';
        magicContent.appendRight(classAttrRef.startWrapper!.startPosition + 1, `${additionalClasses}${trailingSpace}`);
      } else {
        magicContent.appendRight(curr.openStart.endPosition + 1, ` class="${additionalClasses}"`);
      }
      acElements.add({
        tagName: curr.name,
        customId,
        props,
        stateExpr,
      });
    }
  }

  magicContent.append('<style lang="postcss">');
  for (const el of acElements) {
    for (const [state, props] of Object.entries(el.props)) {
      if (state === 'class') {
        continue;
      }
      magicContent.append(`\n.${el.customId}.${state}{@apply ${props.tailwind.join(' ')};}`);
    }
  }
  magicContent.append('\n</style>');

  contents = magicContent.toString();

  if (options.dbg) {
    console.log(contents);
  }

  return contents;
}

function classStrToList(cls: string): string[] {
  return cls.trim().split(/\s+/).filter(i => i);
}
