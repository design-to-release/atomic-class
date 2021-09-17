import { basicSetup, EditorView } from "@codemirror/basic-setup";
import { EditorState, Compartment, StateField } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";

let language = new Compartment, tabSize = new Compartment;

export function initEditor(code, changeCallback) {
    const listenChangesExtension = StateField.define({
        // we won't use the actual StateField value, null or undefined is fine
        create: () => null,
        update: (value, transaction) => {
          if (transaction.docChanged) {
            changeCallback(transaction.newDoc.toString());
            // access new content via the Transaction
            // console.log(transaction.newDoc.toString());
          }
          return null;
        },
    });
    document.querySelector('.editor').innerHTML = '';
    let state = EditorState.create({
        doc: code.replace(/(^\s|\s$)/g, ''),
        extensions: [
          basicSetup,
          language.of(javascript()),
          tabSize.of(EditorState.tabSize.of(4)),
          listenChangesExtension
        ]
    });
    const view = new EditorView({
        state,
        parent: document.querySelector('.editor'),
    });
    return view;
} 