/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function t(t,s,n){if(n||2===arguments.length)for(var o,r=0,i=s.length;r<i;r++)!o&&r in s||(o||(o=Array.prototype.slice.call(s,0,r)),o[r]=s[r]);return t.concat(o||Array.prototype.slice.call(s))}function s(s){return t(["base"],s.states,!0).map((function(t){var n;return(null===(n=s.props[t])||void 0===n?void 0:n.classes)||""})).join(" ")}function n(s){var n=[],o=[];t(["base"],s.states,!0).forEach((function(t){var o,r=(null===(o=s.props[t])||void 0===o?void 0:o.classes)||"",i={};r.split(/\s/).forEach((function(t){var s=t.split(":").pop().split(/-\d+$/).shift().split("-"),n=s[0];s[1]&&["x","y","w","h","cols","rows","span","clip","opacity","repeat"].indexOf(s[1])>-1&&(n+="-"+s[1]),i[n]=i[n]||[],i[n].push(t)})),n.push(i)}));var r=Object.assign.apply(Object,t([{}],n,!1));return Object.keys(r).forEach((function(t){o.push(r[t].join(" "))})),o.join(" ")}export{s as css,n as tailwindcss};
//# sourceMappingURL=es.js.map
