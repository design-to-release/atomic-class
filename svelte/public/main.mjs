import { Button } from './build/bundle.js';
window.Button = Button;

function reset(rs) {
    var root = document.querySelector('root');
    if (root) document.body.removeChild(root);
    root = document.createElement('root');
    document.body.prepend(root);
    if (rs) {
        try {
            eval(rs);
        } catch(e) {
            root.innerHTML = e;
        }
        
    }
}

var editor = CodeMirror.fromTextArea(document.querySelector('#editor'), {
    lineNumbers: true,
    matchBrackets: true,
    mode: "application/ecmascript"
  });
  editor.on('change', function(e) {
    e.save();
    var rs = e.doc.getValue();
    reset(rs);
});

reset(document.querySelector('#editor').innerHTML);