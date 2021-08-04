const MagicString = require("magic-string");
const { tokenize, constructTree } = require("hyntax");
const { Project, SyntaxKind } = require("ts-morph");
const { getOptions } = require("loader-utils");

module.exports = async function (source) {
  const magicContent = new MagicString(source);
  const { tokens } = tokenize(source);
  const { ast } = constructTree(tokens);

  const tpl = ast.content.children.find(
    ({ nodeType, content }) =>
      nodeType === "tag" && content.name === "template",
  );
  const script = ast.content.children.find(({ nodeType }) =>
    nodeType === "script"
  );

  let stack = [tpl];
  let usedIndex = 0;
  const sheetRegistries = [];
  for (let curr = tpl.content, i = 0; i < stack.length; ++i) {
    curr = stack[i].content;
    if (curr.children) {
      stack.push(...curr.children.filter((i) => i.nodeType === "tag"));
    }

    if (curr.attributes) {
      let needInject = false;
      let classAttrNode = undefined;
      for (const attr of curr.attributes) {
        if (attr.key.content.startsWith("ac-")) {
          needInject = true;
          magicContent.overwrite(
            attr.key.startPosition,
            attr.endWrapper.endPosition + 1,
            "",
          );

          if (!sheetRegistries[usedIndex]) {
            sheetRegistries[usedIndex] = {};
          }
          sheetRegistries[usedIndex][attr.key.content.slice(3)] =
            attr.value.content;
        } else if (attr.key.content === "class") {
          classAttrNode = attr;
        }
      }
      if (needInject) {
        let startPos = curr.openStart.endPosition;
        let endPos = -1;
        const cls = `class="${classAttrNode?.value.content ??
          ""} {{ __θac${usedIndex} }}"`;
        if (classAttrNode) {
          startPos = classAttrNode.key.startPosition;
          endPos = classAttrNode.endWrapper.endPosition;
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
    const basePos = script.content.openEnd.endPosition;

    magicContent.appendRight(
      basePos + 1,
      `\r\n${
        sheetRegistries.map((iter, index) =>
          `const __θac${index}Registry=${JSON.stringify(iter)};`
        ).join("\r\n")
      }`,
    );

    const proj = new Project();
    const sourceFile = proj.createSourceFile(
      "temp.ts",
      script.content.value.content,
    );
    const exportAssignment = sourceFile.getExportAssignment((i) =>
      !i.isExportEquals()
    );
    const returnStmt = exportAssignment.getDescendantStatements().find((i) =>
      i.asKind(SyntaxKind.ReturnStatement)
    );

    let startPos = basePos + returnStmt.getStart() + 8;
    let endPos = basePos + returnStmt.getEnd() + 1;
    magicContent.appendRight(startPos, "Object.assign(");
    magicContent.appendRight(
      endPos,
      `, { ${
        Array(usedIndex).fill().map((_, i) => `__θac${i}: ''`).join(",")
      } });`,
    );

    // Inject event handlers
    magicContent.appendRight(
      basePos + exportAssignment.getStart() + 18,
      `${
        Array(usedIndex).fill().map((_, i) => `
        __ac${i}Trigger({ detail }) {
          const { states } = detail;
          this.data.set('__θac${i}', states.map(i => __θac${i}Registry[i]).join(' '));
        },
      `).join("")
      }`,
    );
  }

  source = magicContent.toString();

  if (getOptions(this).dbg) {
    console.log(source);
  }

  return source;
};
