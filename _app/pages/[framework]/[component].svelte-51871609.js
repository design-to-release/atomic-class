import{S as B,i as N,s as W,e as v,t as J,c as w,a as k,g as Q,d as h,b,D as q,f as C,E,h as X,G as S,H as oe,I as H,k as T,n as D,O as _e,P as re,j as R,m as A,o as M,x as V,u as K,v as L,Q as be,A as ae,R as ce,T as ve,U as we,V as ke,W as ye,X as Ee,Y as Ce,Z as Y,_ as Se,$ as Ie,C as le,a0 as xe}from"../../chunks/vendor-1c972bae.js";import{p as Z}from"../../chunks/stores-1db0de02.js";import{b as F}from"../../chunks/paths-28a87002.js";import{_ as Pe}from"../../chunks/preload-helper-cc74dd90.js";var je=`import { defineComponent } from "skypack/san";
import { Button } from "@atomic-class/playground/san-components";

export default defineComponent({
  template: \`
    <div>
      <ac-button
        text="{{ button.text }}"
        keycode="{{ button.keycode }}"
      ></ac-button>

      <ac-button
        text="{{ buttonDisabled.text }}"
        keycode="{{ buttonDisabled.keycode }}"
        states="{{ buttonDisabled.states }}"
      ></ac-button>

      <ac-button
        text="{{ buttonCustom.text }}"
        keycode="{{ buttonCustom.keycode }}"
        props="{{ buttonCustom.props }}"
      ></ac-button>
    </div>
  \`,

  components: {
    "ac-button": Button,
  },

  initData() {
    return {
      button: {
        text: "Please Press A",
        keycode: 65,
      },
      buttonDisabled: {
        text: "Please Press B",
        keycode: 66,
        states: ["disable"],
      },
      buttonCustom: {
        keycode: 67,
        text: "Please Press C",
        props: {
          base: { classes: "text-yellow" },
          default: { classes: "bg-green", overlap: false },
          hover: {
            classes: "bg-greenyellow cursor-pointer",
            overlap: false,
          },
          active: { classes: "bg-orange", overlap: true },
          disable: {
            classes: "bg-black-400 text-white-900 cursor-not-allowed",
            overlap: true,
          },
        },
      },
    };
  },
});`,Be={button:je},Ne=`import { Button } from '@atomic-class/playground/svelte-components';

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

export default root;`,We={button:Ne},ie={san:Be,svelte:We};function fe(o,e,t){const n=o.slice();return n[4]=e[t],n}function ue(o){let e,t=o[4]+"",n,s;return{c(){e=v("a"),n=J(t),this.h()},l(a){e=w(a,"A",{href:!0,class:!0});var r=k(e);n=Q(r,t),r.forEach(h),this.h()},h(){b(e,"href",s=""+(F+"/"+o[2]+"/"+o[4])),b(e,"class","link svelte-1rdlccc"),q(e,"active",o[1]===o[4])},m(a,r){C(a,e,r),E(e,n)},p(a,r){r&1&&t!==(t=a[4]+"")&&X(n,t),r&5&&s!==(s=""+(F+"/"+a[2]+"/"+a[4]))&&b(e,"href",s),r&3&&q(e,"active",a[1]===a[4])},d(a){a&&h(e)}}}function Te(o){let e,t=o[0],n=[];for(let s=0;s<t.length;s+=1)n[s]=ue(fe(o,t,s));return{c(){e=v("section");for(let s=0;s<n.length;s+=1)n[s].c();this.h()},l(s){e=w(s,"SECTION",{class:!0});var a=k(e);for(let r=0;r<n.length;r+=1)n[r].l(a);a.forEach(h),this.h()},h(){b(e,"class","px-4 py-3 flex flex-col items-center border-r border-gray-100 w-36 text-green-600")},m(s,a){C(s,e,a);for(let r=0;r<n.length;r+=1)n[r].m(e,null)},p(s,[a]){if(a&7){t=s[0];let r;for(r=0;r<t.length;r+=1){const c=fe(s,t,r);n[r]?n[r].p(c,a):(n[r]=ue(c),n[r].c(),n[r].m(e,null))}for(;r<n.length;r+=1)n[r].d(1);n.length=t.length}},i:S,o:S,d(s){s&&h(e),oe(n,s)}}}function De(o,e,t){let n,s;H(o,Z,c=>t(3,s=c));let{list:a}=e,{actived:r}=e;return o.$$set=c=>{"list"in c&&t(0,a=c.list),"actived"in c&&t(1,r=c.actived)},o.$$.update=()=>{o.$$.dirty&8&&t(2,n=s.params.framework)},[a,r,n,s]}class Oe extends B{constructor(e){super();N(this,e,De,Te,W,{list:0,actived:1})}}function de(o,e,t){const n=o.slice();return n[4]=e[t],n[6]=t,n}function he(o){let e,t,n,s,a=o[4]+"",r,c,f,d;function m(){return o[3](o[6])}return{c(){e=v("div"),t=v("i"),n=T(),s=v("div"),r=J(a),c=T(),this.h()},l(p){e=w(p,"DIV",{class:!0});var g=k(e);t=w(g,"I",{class:!0}),k(t).forEach(h),n=D(g),s=w(g,"DIV",{class:!0});var i=k(s);r=Q(i,a),i.forEach(h),c=D(g),g.forEach(h),this.h()},h(){b(t,"class","icon svelte-1qsxw8d"),b(s,"class","content svelte-1qsxw8d"),q(s,"active",o[0]===o[6]),b(e,"class","relative")},m(p,g){C(p,e,g),E(e,t),E(e,n),E(e,s),E(s,r),E(e,c),f||(d=_e(e,"click",m),f=!0)},p(p,g){o=p,g&2&&a!==(a=o[4]+"")&&X(r,a),g&1&&q(s,"active",o[0]===o[6])},d(p){p&&h(e),f=!1,d()}}}function Re(o){let e,t=o[1],n=[];for(let s=0;s<t.length;s+=1)n[s]=he(de(o,t,s));return{c(){e=v("section");for(let s=0;s<n.length;s+=1)n[s].c();this.h()},l(s){e=w(s,"SECTION",{class:!0});var a=k(e);for(let r=0;r<n.length;r+=1)n[r].l(a);a.forEach(h),this.h()},h(){b(e,"class","flex")},m(s,a){C(s,e,a);for(let r=0;r<n.length;r+=1)n[r].m(e,null)},p(s,[a]){if(a&7){t=s[1];let r;for(r=0;r<t.length;r+=1){const c=de(s,t,r);n[r]?n[r].p(c,a):(n[r]=he(c),n[r].c(),n[r].m(e,null))}for(;r<n.length;r+=1)n[r].d(1);n.length=t.length}},i:S,o:S,d(s){s&&h(e),oe(n,s)}}}function Ae(o,e,t){let{list:n}=e,{selectedIndex:s=0}=e;const a=re(),r=c=>{s!==c&&(t(0,s=c),a("selectedchange",{selectedIndex:s}))};return o.$$set=c=>{"list"in c&&t(1,n=c.list),"selectedIndex"in c&&t(0,s=c.selectedIndex)},[s,n,a,r]}class Me extends B{constructor(e){super();N(this,e,Ae,Re,W,{list:1,selectedIndex:0})}}const z=new Map,U=new Map,$=new WeakMap,G=new Map;function Ve(o,e){return`${o}${e}`}function Ke(o){let e,t,n,s,a,r;return t=new Me({props:{list:o[4].map(me),selectedIndex:U.get(o[3].path)}}),t.$on("selectedchange",o[7]),{c(){e=v("section"),R(t.$$.fragment),n=T(),s=v("section"),this.h()},l(c){e=w(c,"SECTION",{class:!0});var f=k(e);A(t.$$.fragment,f),n=D(f),s=w(f,"SECTION",{class:!0}),k(s).forEach(h),f.forEach(h),this.h()},h(){b(s,"class","flex-grow overflow-auto"),b(e,"class",a="flex flex-col flex-grow "+o[0])},m(c,f){C(c,e,f),M(t,e,null),E(e,n),E(e,s),o[8](s),r=!0},p(c,[f]){const d={};f&16&&(d.list=c[4].map(me)),f&8&&(d.selectedIndex=U.get(c[3].path)),t.$set(d),(!r||f&1&&a!==(a="flex flex-col flex-grow "+c[0]))&&b(e,"class",a)},i(c){r||(V(t.$$.fragment,c),r=!0)},o(c){K(t.$$.fragment,c),r=!1},d(c){c&&h(e),L(t),o[8](null)}}}const me=o=>o.name;function Le(o,e,t){let n,s,a=S,r=()=>(a(),a=be(f,u=>t(4,s=u)),f);H(o,Z,u=>t(3,n=u)),o.$$.on_destroy.push(()=>a());let{className:c}=e,{editorWindows:f}=e;r();let{refresh:d}=e,m;const p=re();ae(()=>{d.subscribe(()=>{var u;const x=n.path,P=(u=U.get(x))!==null&&u!==void 0?u:0;g(P);const y=i(),j=z.get(y);G.has(y)||G.set(y,j.doc.toString());const O=G.get(y);p("textchange",{lang:s[P].lang,state:j,source:O})})});function g(u){const x=n.path;U.set(x,u);const P=i();if(!z.has(P)){const O=s[u].code;z.set(P,l(O,{lang:s[u].lang}))}const y=z.get(P);$.has(y)||$.set(y,new ce({state:y}));const j=$.get(y);m.replaceChildren(j.dom)}function i(){var u;const x=n.path;return Ve(x,(u=U.get(x))!==null&&u!==void 0?u:0)}function l(u,x){const P=i(),{tabSize:y,create:j}=ve,{updateListener:O}=ce;let ee=we();x.lang==="css"&&(ee=ke());const pe=[ye,ee,y.of(2),Ee.of(Ce),O.of(te=>{if(te.docChanged){const se=te.state,ne=se.doc.toString();G.set(P,ne),p("textchange",{lang:x.lang,state:se,source:ne})}})];return j({doc:u,extensions:pe})}const _=u=>g(u.detail.selectedIndex);function I(u){Y[u?"unshift":"push"](()=>{m=u,t(2,m)})}return o.$$set=u=>{"className"in u&&t(0,c=u.className),"editorWindows"in u&&r(t(1,f=u.editorWindows)),"refresh"in u&&t(6,d=u.refresh)},[c,f,m,n,s,g,d,_,I]}class Ue extends B{constructor(e){super();N(this,e,Le,Ke,W,{className:0,editorWindows:1,refresh:6})}}function qe(o){let e;return{c(){e=v("section"),this.h()},l(t){e=w(t,"SECTION",{id:!0,class:!0}),k(e).forEach(h),this.h()},h(){b(e,"id","preview"),b(e,"class","h-80 p-4")},m(t,n){C(t,e,n),o[6](e)},p:S,i:S,o:S,d(t){t&&h(e),o[6](null)}}}function He(o,e,t){let{framework:n}=e,{js:s}=e,{css:a=""}=e,{error:r}=e;const c={san:p,svelte:g};let f,d,m;ae(()=>{const l=f.attachShadow({mode:"open"}),_=v("link");_.rel="stylesheet",_.href=`${F}/packages/playground/svelte-components/mod.css`,d=v("section"),t(5,m=v("style")),l.append(_,m,d)});function p(l){d.replaceChildren(),new l().attach(d)}function g(l){d.replaceChildren(l)}function i(l){Y[l?"unshift":"push"](()=>{f=l,t(0,f),t(3,s),t(2,n)})}return o.$$set=l=>{"framework"in l&&t(2,n=l.framework),"js"in l&&t(3,s=l.js),"css"in l&&t(4,a=l.css),"error"in l&&t(1,r=l.error)},o.$$.update=()=>{if(o.$$.dirty&12&&typeof s=="string"){const l=`data:text/javascript;charset=utf-8,${encodeURIComponent(s)}`;Pe(()=>import(l),[]).then(({default:_})=>{t(1,r=void 0),t(0,f.innerHTML="",f),c[n](_)}).catch(_=>t(1,r=_))}o.$$.dirty&48&&m&&t(5,m.textContent=a,m)},[f,r,n,s,a,m,i]}class ze extends B{constructor(e){super();N(this,e,He,qe,W,{framework:2,js:3,css:4,error:1})}}function ge(o){let e,t=o[0].message+"",n;return{c(){e=v("span"),n=J(t),this.h()},l(s){e=w(s,"SPAN",{class:!0});var a=k(e);n=Q(a,t),a.forEach(h),this.h()},h(){b(e,"class","font-bold text-red-800")},m(s,a){C(s,e,a),E(e,n)},p(s,a){a&1&&t!==(t=s[0].message+"")&&X(n,t)},d(s){s&&h(e)}}}function Ge(o){let e,t=o[0]&&ge(o);return{c(){e=v("section"),t&&t.c(),this.h()},l(n){e=w(n,"SECTION",{class:!0});var s=k(e);t&&t.l(s),s.forEach(h),this.h()},h(){b(e,"class","flex-shrink-0 h-16 bg-gray-50 text-gray-500 p-3 text-xs")},m(n,s){C(n,e,s),t&&t.m(e,null)},p(n,[s]){n[0]?t?t.p(n,s):(t=ge(n),t.c(),t.m(e,null)):t&&(t.d(1),t=null)},i:S,o:S,d(n){n&&h(e),t&&t.d()}}}function Je(o,e,t){let{error:n}=e;return o.$$set=s=>{"error"in s&&t(0,n=s.error)},[n]}class Qe extends B{constructor(e){super();N(this,e,Je,Ge,W,{error:0})}}function Xe(o){let e,t,n,s,a,r,c,f,d,m;e=new Oe({props:{list:o[2],actived:o[1]}});function p(i){o[10](i)}let g={js:o[4][0].code,css:o[4][1].code,framework:o[0]};return o[3]!==void 0&&(g.error=o[3]),s=new ze({props:g}),Y.push(()=>Se(s,"error",p)),c=new Ue({props:{className:"border-b border-t border-gray-200",editorWindows:o[5],refresh:o[6]}}),c.$on("textchange",o[7]),d=new Qe({props:{error:o[3]}}),{c(){R(e.$$.fragment),t=T(),n=v("section"),R(s.$$.fragment),r=T(),R(c.$$.fragment),f=T(),R(d.$$.fragment),this.h()},l(i){A(e.$$.fragment,i),t=D(i),n=w(i,"SECTION",{class:!0});var l=k(n);A(s.$$.fragment,l),r=D(l),A(c.$$.fragment,l),f=D(l),A(d.$$.fragment,l),l.forEach(h),this.h()},h(){b(n,"class","flex flex-col w-full")},m(i,l){M(e,i,l),C(i,t,l),C(i,n,l),M(s,n,null),E(n,r),M(c,n,null),E(n,f),M(d,n,null),m=!0},p(i,[l]){const _={};l&4&&(_.list=i[2]),l&2&&(_.actived=i[1]),e.$set(_);const I={};l&16&&(I.js=i[4][0].code),l&16&&(I.css=i[4][1].code),l&1&&(I.framework=i[0]),!a&&l&8&&(a=!0,I.error=i[3],Ie(()=>a=!1)),s.$set(I);const u={};l&8&&(u.error=i[3]),d.$set(u)},i(i){m||(V(e.$$.fragment,i),V(s.$$.fragment,i),V(c.$$.fragment,i),V(d.$$.fragment,i),m=!0)},o(i){K(e.$$.fragment,i),K(s.$$.fragment,i),K(c.$$.fragment,i),K(d.$$.fragment,i),m=!1},d(i){L(e,i),i&&h(t),i&&h(n),L(s),L(c),L(d)}}}function Ye(o,e,t){let n,s;H(o,Z,l=>t(9,s=l));let a,r,c,f,d=le([]);H(o,d,l=>t(4,n=l));const m=le(0);let p;function g({detail:l}){const{lang:_,source:I}=l;xe(d,n[_==="js"?0:1].code=I,n)}function i(l){p=l,t(3,p)}return o.$$.update=()=>{if(o.$$.dirty&771){const{framework:l,component:_}=s.params;t(0,a=l),t(1,r=_),t(8,c=ie[a][r]),t(2,f=Object.keys(ie[a])),d.set([{name:"JavaScript",code:c,lang:"js"},{name:"CSS",code:"",lang:"css"}]),m.set(Math.random())}},[a,r,f,p,n,d,m,g,c,s,i]}class tt extends B{constructor(e){super();N(this,e,Ye,Xe,W,{})}}export{tt as default};
