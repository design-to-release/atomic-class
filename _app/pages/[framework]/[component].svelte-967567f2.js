import{S as j,i as N,s as W,e as w,t as Q,c as k,a as y,g as X,d as g,b,D as q,f as S,E as C,h as Y,G as I,H as oe,I as H,k as T,n as A,O as pe,P as re,j as R,m as D,o as M,x as V,u as K,v as L,Q as be,A as ae,R as ce,T as we,U as ve,V as ke,W as ye,X as Ee,Y as Ce,Z,_ as Se,$ as Ie,C as le,a0 as xe}from"../../chunks/vendor-1c972bae.js";import{p as F}from"../../chunks/stores-1db0de02.js";import{b as z}from"../../chunks/paths-28a87002.js";import{_ as Be}from"../../chunks/preload-helper-cc74dd90.js";var Pe=`import { defineComponent } from "skypack/san";
import { Button } from "@atomic-class/playground/san-components";

export default defineComponent({
  template: \`
  <div>
    <ac-button
      text="{{ buttonA.text }}"
      keycode="{{ buttonA.keycode }}"
    ></ac-button>

    <ac-button
      text="{{ buttonB.text }}"
      keycode="{{ buttonB.keycode }}"
      state="{{ buttonB.state }}"
    ></ac-button>

    <ac-button
      text="{{ buttonC.text }}"
      keycode="{{ buttonC.keycode }}"
    ></ac-button>
  </div>
  \`,

  components: {
    "ac-button": Button,
  },

  initData() {
    return {
      buttonA: {
        text: "Please Press A",
        keycode: 65,
      },
      buttonB: {
        text: "Please Press B",
        keycode: 66,
        state: "disabled",
      },
      buttonC: {
        text: "Please Press C",
        keycode: 67,
      },
    };
  },
});`,je={button:Pe},Ne=`import { Button } from '@atomic-class/playground/svelte-components';

const root = document.createElement('div');

const button = new Button({
	target: root,
	props: { keycode: 65, text: 'Please Press A', },
});

const buttonDisabled = new Button({
	target: root,
	props: { keycode: 66, text: 'Please Press B', state: 'disabled' },
});

const buttonCustom = new Button({
	target: root,
	props: {
		keycode: 67,
		text: 'Please Press C',
	},
});

export default root;`,We={button:Ne},ie={san:je,svelte:We};function fe(o,e,t){const n=o.slice();return n[4]=e[t],n}function ue(o){let e,t=o[4]+"",n,s;return{c(){e=w("a"),n=Q(t),this.h()},l(a){e=k(a,"A",{href:!0,class:!0});var r=y(e);n=X(r,t),r.forEach(g),this.h()},h(){b(e,"href",s=""+(z+"/"+o[2]+"/"+o[4])),b(e,"class","link svelte-1rdlccc"),q(e,"active",o[1]===o[4])},m(a,r){S(a,e,r),C(e,n)},p(a,r){r&1&&t!==(t=a[4]+"")&&Y(n,t),r&5&&s!==(s=""+(z+"/"+a[2]+"/"+a[4]))&&b(e,"href",s),r&3&&q(e,"active",a[1]===a[4])},d(a){a&&g(e)}}}function Te(o){let e,t=o[0],n=[];for(let s=0;s<t.length;s+=1)n[s]=ue(fe(o,t,s));return{c(){e=w("section");for(let s=0;s<n.length;s+=1)n[s].c();this.h()},l(s){e=k(s,"SECTION",{class:!0});var a=y(e);for(let r=0;r<n.length;r+=1)n[r].l(a);a.forEach(g),this.h()},h(){b(e,"class","px-4 py-3 flex flex-col items-center border-r border-gray-100 w-36 text-green-600")},m(s,a){S(s,e,a);for(let r=0;r<n.length;r+=1)n[r].m(e,null)},p(s,[a]){if(a&7){t=s[0];let r;for(r=0;r<t.length;r+=1){const c=fe(s,t,r);n[r]?n[r].p(c,a):(n[r]=ue(c),n[r].c(),n[r].m(e,null))}for(;r<n.length;r+=1)n[r].d(1);n.length=t.length}},i:I,o:I,d(s){s&&g(e),oe(n,s)}}}function Ae(o,e,t){let n,s;H(o,F,c=>t(3,s=c));let{list:a}=e,{actived:r}=e;return o.$$set=c=>{"list"in c&&t(0,a=c.list),"actived"in c&&t(1,r=c.actived)},o.$$.update=()=>{o.$$.dirty&8&&t(2,n=s.params.framework)},[a,r,n,s]}class Oe extends j{constructor(e){super();N(this,e,Ae,Te,W,{list:0,actived:1})}}function de(o,e,t){const n=o.slice();return n[4]=e[t],n[6]=t,n}function he(o){let e,t,n,s,a=o[4]+"",r,c,i,d;function _(){return o[3](o[6])}return{c(){e=w("div"),t=w("i"),n=T(),s=w("div"),r=Q(a),c=T(),this.h()},l(m){e=k(m,"DIV",{class:!0});var p=y(e);t=k(p,"I",{class:!0}),y(t).forEach(g),n=A(p),s=k(p,"DIV",{class:!0});var l=y(s);r=X(l,a),l.forEach(g),c=A(p),p.forEach(g),this.h()},h(){b(t,"class","icon svelte-1qsxw8d"),b(s,"class","content svelte-1qsxw8d"),q(s,"active",o[0]===o[6]),b(e,"class","relative")},m(m,p){S(m,e,p),C(e,t),C(e,n),C(e,s),C(s,r),C(e,c),i||(d=pe(e,"click",_),i=!0)},p(m,p){o=m,p&2&&a!==(a=o[4]+"")&&Y(r,a),p&1&&q(s,"active",o[0]===o[6])},d(m){m&&g(e),i=!1,d()}}}function Re(o){let e,t=o[1],n=[];for(let s=0;s<t.length;s+=1)n[s]=he(de(o,t,s));return{c(){e=w("section");for(let s=0;s<n.length;s+=1)n[s].c();this.h()},l(s){e=k(s,"SECTION",{class:!0});var a=y(e);for(let r=0;r<n.length;r+=1)n[r].l(a);a.forEach(g),this.h()},h(){b(e,"class","flex")},m(s,a){S(s,e,a);for(let r=0;r<n.length;r+=1)n[r].m(e,null)},p(s,[a]){if(a&7){t=s[1];let r;for(r=0;r<t.length;r+=1){const c=de(s,t,r);n[r]?n[r].p(c,a):(n[r]=he(c),n[r].c(),n[r].m(e,null))}for(;r<n.length;r+=1)n[r].d(1);n.length=t.length}},i:I,o:I,d(s){s&&g(e),oe(n,s)}}}function De(o,e,t){let{list:n}=e,{selectedIndex:s=0}=e;const a=re(),r=c=>{s!==c&&(t(0,s=c),a("selectedchange",{selectedIndex:s}))};return o.$$set=c=>{"list"in c&&t(1,n=c.list),"selectedIndex"in c&&t(0,s=c.selectedIndex)},[s,n,a,r]}class Me extends j{constructor(e){super();N(this,e,De,Re,W,{list:1,selectedIndex:0})}}const G=new Map,U=new Map,$=new WeakMap,J=new Map;function Ve(o,e){return`${o}${e}`}function Ke(o){let e,t,n,s,a,r;return t=new Me({props:{list:o[4].map(me),selectedIndex:U.get(o[3].path)}}),t.$on("selectedchange",o[7]),{c(){e=w("section"),R(t.$$.fragment),n=T(),s=w("section"),this.h()},l(c){e=k(c,"SECTION",{class:!0});var i=y(e);D(t.$$.fragment,i),n=A(i),s=k(i,"SECTION",{class:!0}),y(s).forEach(g),i.forEach(g),this.h()},h(){b(s,"class","flex-grow overflow-auto"),b(e,"class",a="flex flex-col flex-grow "+o[0])},m(c,i){S(c,e,i),M(t,e,null),C(e,n),C(e,s),o[8](s),r=!0},p(c,[i]){const d={};i&16&&(d.list=c[4].map(me)),i&8&&(d.selectedIndex=U.get(c[3].path)),t.$set(d),(!r||i&1&&a!==(a="flex flex-col flex-grow "+c[0]))&&b(e,"class",a)},i(c){r||(V(t.$$.fragment,c),r=!0)},o(c){K(t.$$.fragment,c),r=!1},d(c){c&&g(e),L(t),o[8](null)}}}const me=o=>o.name;function Le(o,e,t){let n,s,a=I,r=()=>(a(),a=be(i,u=>t(4,s=u)),i);H(o,F,u=>t(3,n=u)),o.$$.on_destroy.push(()=>a());let{className:c}=e,{editorWindows:i}=e;r();let{refresh:d}=e,_;const m=re();ae(()=>{d.subscribe(()=>{var u;const x=n.path,B=(u=U.get(x))!==null&&u!==void 0?u:0;p(B);const E=l(),P=G.get(E);J.has(E)||J.set(E,P.doc.toString());const O=J.get(E);m("textchange",{lang:s[B].lang,state:P,source:O})})});function p(u){const x=n.path;U.set(x,u);const B=l();if(!G.has(B)){const O=s[u].code;G.set(B,f(O,{lang:s[u].lang}))}const E=G.get(B);$.has(E)||$.set(E,new ce({state:E}));const P=$.get(E);_.replaceChildren(P.dom)}function l(){var u;const x=n.path;return Ve(x,(u=U.get(x))!==null&&u!==void 0?u:0)}function f(u,x){const B=l(),{tabSize:E,create:P}=we,{updateListener:O}=ce;let ee=ve();x.lang==="css"&&(ee=ke());const _e=[ye,ee,E.of(2),Ee.of(Ce),O.of(te=>{if(te.docChanged){const se=te.state,ne=se.doc.toString();J.set(B,ne),m("textchange",{lang:x.lang,state:se,source:ne})}})];return P({doc:u,extensions:_e})}const h=u=>p(u.detail.selectedIndex);function v(u){Z[u?"unshift":"push"](()=>{_=u,t(2,_)})}return o.$$set=u=>{"className"in u&&t(0,c=u.className),"editorWindows"in u&&r(t(1,i=u.editorWindows)),"refresh"in u&&t(6,d=u.refresh)},[c,i,_,n,s,p,d,h,v]}class Ue extends j{constructor(e){super();N(this,e,Le,Ke,W,{className:0,editorWindows:1,refresh:6})}}function qe(o){let e;return{c(){e=w("section"),this.h()},l(t){e=k(t,"SECTION",{id:!0,class:!0}),y(e).forEach(g),this.h()},h(){b(e,"id","preview"),b(e,"class","h-80 p-4")},m(t,n){S(t,e,n),o[6](e)},p:I,i:I,o:I,d(t){t&&g(e),o[6](null)}}}function He(o,e,t){let{framework:n}=e,{js:s}=e,{css:a=""}=e,{error:r}=e;const c={san:p,svelte:l};let i,d,_,m;ae(()=>{const h=i.attachShadow({mode:"open"});m=w("link"),m.rel="stylesheet",d=w("section"),t(5,_=w("style")),h.append(m,_,d)});function p(h){m.href=`${z}/packages/playground/san-components/mod.css`,d.replaceChildren(),new h().attach(d)}function l(h){m.href=`${z}/packages/playground/svelte-components/mod.css`,d.replaceChildren(h)}function f(h){Z[h?"unshift":"push"](()=>{i=h,t(0,i),t(3,s),t(2,n)})}return o.$$set=h=>{"framework"in h&&t(2,n=h.framework),"js"in h&&t(3,s=h.js),"css"in h&&t(4,a=h.css),"error"in h&&t(1,r=h.error)},o.$$.update=()=>{if(o.$$.dirty&12&&typeof s=="string"){const h=`data:text/javascript;charset=utf-8,${encodeURIComponent(s)}`;Be(()=>import(h),[]).then(({default:v})=>{t(1,r=void 0),t(0,i.innerHTML="",i),c[n](v)}).catch(v=>t(1,r=v))}o.$$.dirty&48&&_&&t(5,_.textContent=a,_)},[i,r,n,s,a,_,f]}class ze extends j{constructor(e){super();N(this,e,He,qe,W,{framework:2,js:3,css:4,error:1})}}function ge(o){let e,t=o[0].message+"",n;return{c(){e=w("span"),n=Q(t),this.h()},l(s){e=k(s,"SPAN",{class:!0});var a=y(e);n=X(a,t),a.forEach(g),this.h()},h(){b(e,"class","font-bold text-red-800")},m(s,a){S(s,e,a),C(e,n)},p(s,a){a&1&&t!==(t=s[0].message+"")&&Y(n,t)},d(s){s&&g(e)}}}function Ge(o){let e,t=o[0]&&ge(o);return{c(){e=w("section"),t&&t.c(),this.h()},l(n){e=k(n,"SECTION",{class:!0});var s=y(e);t&&t.l(s),s.forEach(g),this.h()},h(){b(e,"class","flex-shrink-0 h-16 bg-gray-50 text-gray-500 p-3 text-xs")},m(n,s){S(n,e,s),t&&t.m(e,null)},p(n,[s]){n[0]?t?t.p(n,s):(t=ge(n),t.c(),t.m(e,null)):t&&(t.d(1),t=null)},i:I,o:I,d(n){n&&g(e),t&&t.d()}}}function Je(o,e,t){let{error:n}=e;return o.$$set=s=>{"error"in s&&t(0,n=s.error)},[n]}class Qe extends j{constructor(e){super();N(this,e,Je,Ge,W,{error:0})}}function Xe(o){let e,t,n,s,a,r,c,i,d,_;e=new Oe({props:{list:o[2],actived:o[1]}});function m(l){o[10](l)}let p={js:o[4][0].code,css:o[4][1].code,framework:o[0]};return o[3]!==void 0&&(p.error=o[3]),s=new ze({props:p}),Z.push(()=>Se(s,"error",m)),c=new Ue({props:{className:"border-b border-t border-gray-200",editorWindows:o[5],refresh:o[6]}}),c.$on("textchange",o[7]),d=new Qe({props:{error:o[3]}}),{c(){R(e.$$.fragment),t=T(),n=w("section"),R(s.$$.fragment),r=T(),R(c.$$.fragment),i=T(),R(d.$$.fragment),this.h()},l(l){D(e.$$.fragment,l),t=A(l),n=k(l,"SECTION",{class:!0});var f=y(n);D(s.$$.fragment,f),r=A(f),D(c.$$.fragment,f),i=A(f),D(d.$$.fragment,f),f.forEach(g),this.h()},h(){b(n,"class","flex flex-col w-full")},m(l,f){M(e,l,f),S(l,t,f),S(l,n,f),M(s,n,null),C(n,r),M(c,n,null),C(n,i),M(d,n,null),_=!0},p(l,[f]){const h={};f&4&&(h.list=l[2]),f&2&&(h.actived=l[1]),e.$set(h);const v={};f&16&&(v.js=l[4][0].code),f&16&&(v.css=l[4][1].code),f&1&&(v.framework=l[0]),!a&&f&8&&(a=!0,v.error=l[3],Ie(()=>a=!1)),s.$set(v);const u={};f&8&&(u.error=l[3]),d.$set(u)},i(l){_||(V(e.$$.fragment,l),V(s.$$.fragment,l),V(c.$$.fragment,l),V(d.$$.fragment,l),_=!0)},o(l){K(e.$$.fragment,l),K(s.$$.fragment,l),K(c.$$.fragment,l),K(d.$$.fragment,l),_=!1},d(l){L(e,l),l&&g(t),l&&g(n),L(s),L(c),L(d)}}}function Ye(o,e,t){let n,s;H(o,F,f=>t(9,s=f));let a,r,c,i,d=le([]);H(o,d,f=>t(4,n=f));const _=le(0);let m;function p({detail:f}){const{lang:h,source:v}=f;xe(d,n[h==="js"?0:1].code=v,n)}function l(f){m=f,t(3,m)}return o.$$.update=()=>{if(o.$$.dirty&771){const{framework:f,component:h}=s.params;t(0,a=f),t(1,r=h),t(8,c=ie[a][r]),t(2,i=Object.keys(ie[a])),d.set([{name:"JavaScript",code:c,lang:"js"},{name:"CSS",code:"",lang:"css"}]),_.set(Math.random())}},[a,r,i,m,n,d,_,p,c,s,l]}class tt extends j{constructor(e){super();N(this,e,Ye,Xe,W,{})}}export{tt as default};
