function e(){}function t(e){return e()}function n(){return Object.create(null)}function o(e){e.forEach(t)}function r(e){return"function"==typeof e}function u(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function i(e,t){e.appendChild(t)}function c(e){e.parentNode.removeChild(e)}function s(e){return document.createElement(e)}function a(e){return document.createTextNode(e)}function d(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function f(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}let l;function p(e){l=e}function m(e){(function(){if(!l)throw new Error("Function called outside component initialization");return l})().$$.on_mount.push(e)}const h=[],b=[],$=[],y=[],g=Promise.resolve();let x=!1;function v(e){$.push(e)}let _=!1;const k=new Set;function w(){if(!_){_=!0;do{for(let e=0;e<h.length;e+=1){const t=h[e];p(t),E(t.$$)}for(p(null),h.length=0;b.length;)b.pop()();for(let e=0;e<$.length;e+=1){const t=$[e];k.has(t)||(k.add(t),t())}$.length=0}while(h.length);for(;y.length;)y.pop()();x=!1,_=!1,k.clear()}}function E(e){if(null!==e.fragment){e.update(),o(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(v)}}const O=new Set;function j(e,t){-1===e.$$.dirty[0]&&(h.push(e),x||(x=!0,g.then(w)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function A(u,i,s,a,d,f,m,h=[-1]){const b=l;p(u);const $=u.$$={fragment:null,ctx:null,props:f,update:e,not_equal:d,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(b?b.$$.context:i.context||[]),callbacks:n(),dirty:h,skip_bound:!1,root:i.target||b.$$.root};m&&m($.root);let y=!1;if($.ctx=s?s(u,i.props||{},((e,t,...n)=>{const o=n.length?n[0]:t;return $.ctx&&d($.ctx[e],$.ctx[e]=o)&&(!$.skip_bound&&$.bound[e]&&$.bound[e](o),y&&j(u,e)),t})):[],$.update(),y=!0,o($.before_update),$.fragment=!!a&&a($.ctx),i.target){if(i.hydrate){const e=function(e){return Array.from(e.childNodes)}(i.target);$.fragment&&$.fragment.l(e),e.forEach(c)}else $.fragment&&$.fragment.c();i.intro&&((g=u.$$.fragment)&&g.i&&(O.delete(g),g.i(x))),function(e,n,u,i){const{fragment:c,on_mount:s,on_destroy:a,after_update:d}=e.$$;c&&c.m(n,u),i||v((()=>{const n=s.map(t).filter(r);a?a.push(...n):o(n),e.$$.on_mount=[]})),d.forEach(v)}(u,i.target,i.anchor,i.customElement),w()}var g,x;p(b)}"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;var L,T=(function(e,t){var n,o,r;n=t,o=function(e){var t={exports:{}};return e(t,t.exports),t.exports}((function(e,t){!function(e){function t(e){return 0===e.length?[]:e.split(/\s+/)}function n(e,n){var o=t(e);return-1===o.indexOf(n)?(o.push(n),o.join(" ")):e}function o(e,n){var o=t(e),r=t(n);return(o=o.filter((function(e){return-1==r.indexOf(e)}))).join(" ")}function r(e,n){return t(e).indexOf(n)>-1}var u=Object.freeze({__proto__:null,split:t,add:n,remove:o,has:r});e.add=n,e.has=r,e.remove=o,e.split=t,e.state=u,Object.defineProperty(e,"__esModule",{value:!0})}(t)})),r="default hover",n.keyboard=function(e,t,n){if(o.has(t,"disabled"))return t;if(e.keyCode!==n)return t;switch(e.type){case"keydown":t=o.add(t,"active");break;case"keyup":t=o.remove(t,"active")}return t},n.mouse=function(e,t){if(o.has(t,"disabled"))return t;switch(e.type){case"mouseenter":t=o.remove(t,r),t=o.add(t,"hover");break;case"mouseleave":t=o.remove(t,r),t=o.add(t,"default");break;case"mousedown":t=o.add(t,"active");break;case"mouseup":t=o.remove(t,"active")}return t},Object.defineProperty(n,"__esModule",{value:!0})}(L={exports:{}},L.exports),L.exports);function C(t){let n,r,u,l,p,m,h,b;return{c(){n=s("span"),r=s("span"),l=a(" "),p=a(t[1]),f(r,"class",u="icon "+(-1==t[0].indexOf("disabled")?"default":"block")+" material-icons align-bottom svelte-1s6c02c"),f(n,"class",m="_D9W0 "+t[0]+" px-4 py-2 rounded-lg text-white font-bold m-2 text-base svelte-1s6c02c")},m(e,o){!function(e,t,n){e.insertBefore(t,n||null)}(e,n,o),i(n,r),i(n,l),i(n,p),h||(b=[d(n,"mouseenter",t[2]),d(n,"mouseleave",t[2]),d(n,"mousedown",t[2]),d(n,"mouseup",t[2])],h=!0)},p(e,[t]){1&t&&u!==(u="icon "+(-1==e[0].indexOf("disabled")?"default":"block")+" material-icons align-bottom svelte-1s6c02c")&&f(r,"class",u),2&t&&function(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}(p,e[1]),1&t&&m!==(m="_D9W0 "+e[0]+" px-4 py-2 rounded-lg text-white font-bold m-2 text-base svelte-1s6c02c")&&f(n,"class",m)},i:e,o:e,d(e){e&&c(n),h=!1,o(b)}}}function M(e,t,n){let{text:o}=t,{keycode:r}=t,{state:u="default"}=t;function i(e){n(0,u=T.keyboard(e,u,r))}return m((()=>{document.addEventListener("keydown",i),document.addEventListener("keyup",i)})),e.$$set=e=>{"text"in e&&n(1,o=e.text),"keycode"in e&&n(3,r=e.keycode),"state"in e&&n(0,u=e.state)},[u,o,function(e){n(0,u=T.mouse(e,u))},r]}class N extends class{$destroy(){!function(e,t){const n=e.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}{constructor(e){super(),A(this,e,M,C,u,{text:1,keycode:3,state:0})}}export{N as Button};
//# sourceMappingURL=mod.js.map