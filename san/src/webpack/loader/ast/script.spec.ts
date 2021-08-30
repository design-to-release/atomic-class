import MagicString from 'magic-string';
import { Project } from 'ts-morph';
import { mods } from './testdata/simple-modules';
import { expandsReturnStmt, getIninDataReturnStmt } from './script';

function createSourceFile(contents: string) {
  const proj = new Project();
  return proj.createSourceFile('temp.ts', contents);
}

test('Basic', async () => {
  const contents = mods.basic;
  const sourceFile = createSourceFile(contents);

  const exportAssignment = sourceFile.getExportAssignment((i) => !i.isExportEquals())!;
  const returnStmt = getIninDataReturnStmt(exportAssignment);
  expect(returnStmt.getFullText()).toEqual(`
      return {
        hello: "world",
      };`);

  const magicContent = new MagicString(contents);
  expandsReturnStmt(magicContent, returnStmt, `{ foo: "bar" }`);
  expect(magicContent.toString()).toEqual(
    `export default {
    initData() {
      return Object.assign( {
        hello: "world",
      }, { foo: "bar" });
    },
  };`,
  );
});
