import type MagicString from 'magic-string';
import type { ExportAssignment, ReturnStatement } from 'ts-morph';

import { SyntaxKind } from 'ts-morph';

/**
 * Get the return statement
 *
 *     export default {
 *       initData() {
 *         return {}
 *       }
 *     }
 */
export function getIninDataReturnStmt(ea: ExportAssignment): ReturnStatement {
  // TODO: We assume that `initData` method exist,
  // and `initData` method has one and only one `return` statement.
  const initDataMethodDecl = ea.getDescendantsOfKind(SyntaxKind.MethodDeclaration).find(i =>
    i.getName() === 'initData'
  );
  return initDataMethodDecl!.getStatementByKind(SyntaxKind.ReturnStatement)!;
}

export function expandsReturnStmt(ms: MagicString, rs: ReturnStatement, content: string, basePos = 0): void {
  let startPos = basePos + (rs.getStart() ?? 0);
  let endPos = basePos + (rs.getEnd() ?? startPos);
  const origExpr = rs.getFullText().trim().replace('return', '').replace(/;$/, '');
  ms.overwrite(startPos, endPos, `return Object.assign(${origExpr}, ${content});`);
}
