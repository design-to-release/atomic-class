/** @type {Map<string, import('@codemirror/basic-setup').EditorState>} */
export const edStateByKey = new Map();
/** @type {Map<string, number>} */
export const edActiveWindowByKey = new Map();
/** @type {WeakMap<import('@codemirror/basic-setup').EditorState, import('@codemirror/basic-setup').EditorView>} */
export const edViewByState = new WeakMap();
/** @type {Map<string, string>} */
export const edSourceCodeByKey = new Map();
