import type { TreeConstructor } from 'hyntax';
import { constructTree, tokenize } from 'hyntax';

export default function(source: string): [template: TreeConstructor.TagNode, script: TreeConstructor.ScriptNode] {
  const { tokens } = tokenize(source);
  const { ast } = constructTree(tokens);

  const tpl = ast.content.children.find(
    ({ nodeType, content }) => nodeType === 'tag' && (content as TreeConstructor.NodeContents.Tag).name === 'template',
  );
  const script = ast.content.children.find(({ nodeType }) => nodeType === 'script');

  // Assuming they all exist.
  return [tpl as TreeConstructor.TagNode, script as TreeConstructor.ScriptNode];
}

// function generateDefaultTemplate() { }

// function generateDefaultScript() { }
