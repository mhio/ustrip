var de=Object.defineProperty,ce=Object.defineProperties;var fe=Object.getOwnPropertyDescriptors;var Z=Object.getOwnPropertySymbols;var pe=Object.prototype.hasOwnProperty,me=Object.prototype.propertyIsEnumerable;var Y=(t,e,n)=>e in t?de(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Q=(t,e)=>{for(var n in e||(e={}))pe.call(e,n)&&Y(t,n,e[n]);if(Z)for(var n of Z(e))me.call(e,n)&&Y(t,n,e[n]);return t},j=(t,e)=>ce(t,fe(e));var G=(t,e,n)=>new Promise((o,a)=>{var r=f=>{try{i(n.next(f))}catch(h){a(h)}},s=f=>{try{i(n.throw(f))}catch(h){a(h)}},i=f=>f.done?o(f.value):Promise.resolve(f.value).then(r,s);i((n=n.apply(t,e)).next())});import{u as x,d as M,a as _e,c as y,o as he,b as w,e as E,w as u,f as l,V as L,m as ve,g as R,h as g,i as k,j as p,k as A,l as J,n as H,t as X,p as ye,q as we,r as V,s as be,v as B,x as D,y as I,z as _,A as xe,B as ge,C as Ve,D as W,E as C,F as ke,G as Le,H as He,I as Se,J as Ue,K as Ae,L as Me,M as $e,N as Ce,O as Te,P as Oe,Q as Re,R as Be,S as De}from"./vendor-J-85Et3A.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();var Ie="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z",Ee="M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z",Fe="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z",Ne="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z";const Pe=new RegExp("utm_|stm_|clid|_hs|icid|igshid|linkid|mc_|mkt_tok|yclid|_openstat|wicked|otc|oly_|rb_clickid|soc_|si|ref_","i"),Ke=new RegExp("([?&](icid|mkt_tok|(g|fb)clid|igshid|_hs(enc|mi)|linkid|mc_[ce]id|(utm|stm)_(source|medium|term|campaign|content|cid|reader|referrer|name|social|social-type)|rb_clickid|yclid|_openstat|wickedid|otc|oly_(anon|enc)_id|soc_(src|trk)|si|ref_(src|url))=[^&#]*)","ig");function ee(t){const e=t.indexOf("?");if(e<0||t.search(Pe)<e)return t;let n=t.replace(Ke,"");return n.charAt(e)==="&"&&(n=`${n.substring(0,e)}?${n.substring(e+1)}`),n}function qe(t){const e=t.indexOf("/"),n=t.indexOf("?"),o=t.indexOf("#");return e>-1&&o>-1&&n>-1?Math.min(e,n,o):e>-1&&n>-1?Math.min(e,n):e>-1&&o>-1?Math.min(e,o):n>-1&&o>-1?Math.min(n,o):e>-1?e:n>-1?n:o>-1?o:-1}function F(t,e){if(!t)return null;if(e.has(t))return t;const n=qe(t),o=t.substring(0,n);if(e.has(o))return o;try{const a=new URL(t);return e.has(a.hostname)?a.hostname:null}catch(a){if(a instanceof TypeError)return null;throw a}}function N(t,e,n){let o=String(t);const a=F(t,n);if(!a)return o;let r=et(e);if(a==="youtu.be"&&r==="www.youtube.com")return ze(t);if(P(o))try{const s=new URL(o);return s.hostname=r,String(s)}catch(s){if(s instanceof TypeError)return o.replace(a,r);throw s}return o.replace(a,r)}function ze(t){let e=t;P(e)||(e=`https://${e}`);try{const n=new URL(e);if(n.hostname="www.youtube.com",n.pathname==="/")return String(n);const o=new URLSearchParams;o.set("v",n.pathname.replace(/^\//,""));for(const[a,r]of n.searchParams.entries())o.append(a,r);return n.pathname="/watch",n.search=o.toString(),String(n)}catch(n){if(n instanceof TypeError)return e.replace("youtu.be","www.youtube.com");throw n}}const te=new Set(["x.com","www.x.com","twitter.com","www.twitter.com","t.co"]);function Ze(t){return F(t,te)}function Ye(t,e){return N(t,e,te)}const ne=new Set(["youtube.com","www.youtube.com","youtu.be"]);function Qe(t){return F(t,ne)}function je(t,e){return N(t,e,ne)}const ae=new Set(["old.reddit.com","np.reddit.com","reddit.com","www.reddit.com","redd.it"]);function Ge(t){return F(t,ae)}function Je(t,e){return N(t,e,ae)}function We(t){return Ze(t)?"twitter":Qe(t)?"youtube":Ge(t)?"reddit":null}function Xe(t,e,n,o){switch(We(t)){case"twitter":return Ye(t,e);case"youtube":return je(t,n);case"reddit":return Je(t,o);default:return t}}function P(t){return!!/^[a-z]+:\/\//.exec(t)}function et(t){if(!P(t))return t;try{return new URL(t).hostname}catch(e){if(e instanceof TypeError)return t;throw e}}function oe(){const t=x("alt_reddit","https://libreddit.spike.codes"),e=x("alt_twitter","https://nitter.net"),n=x("alt_youtube","https://www.youtube.com"),o=x("alt_is_default",!1),a=x("drop_open",!0),r=x("dark_theme",!0);return{alt_reddit:t,alt_twitter:e,alt_youtube:n,alt_is_default:o,drop_open:a,dark_theme:r}}const tt=M({__name:"AppMenu",setup(t){const{alt_reddit:e,alt_twitter:n,alt_youtube:o,alt_is_default:a,drop_open:r,dark_theme:s}=oe(),i=_e(),f=y(()=>i.global.current.value.dark?"Light":"Dark");he(()=>{i.global.name.value=s.value?"dark":"light"});function h(){s.value=!s.value,i.global.name.value=s.value?"dark":"light"}return(S,d)=>(w(),E(we,{"close-on-content-click":!1,class:"menu-border"},{activator:u(({props:m})=>[l(R,ve(m,{icon:"",size:"small",elevation:"0"}),{default:u(()=>[l(L,{"aria-hidden":"false",icon:"$menu"})]),_:2},1040)]),default:u(()=>[l(ye,{class:"menu-text-field"},{default:u(()=>[l(g,null,{default:u(()=>[l(k,{label:"twitter alternate",modelValue:p(n),"onUpdate:modelValue":d[0]||(d[0]=m=>A(n)?n.value=m:null),density:"compact","hide-details":""},null,8,["modelValue"])]),_:1}),l(g,null,{default:u(()=>[l(k,{label:"reddit alternate",modelValue:p(e),"onUpdate:modelValue":d[1]||(d[1]=m=>A(e)?e.value=m:null),density:"compact","hide-details":""},null,8,["modelValue"])]),_:1}),l(g,null,{default:u(()=>[l(k,{label:"youtube alternate",modelValue:p(o),"onUpdate:modelValue":d[2]||(d[2]=m=>A(o)?o.value=m:null),density:"compact","hide-details":""},null,8,["modelValue"])]),_:1}),l(g,{class:"mt-2"},{default:u(()=>[l(J,{label:"Drop opens new popup window",modelValue:p(r),"onUpdate:modelValue":d[3]||(d[3]=m=>A(r)?r.value=m:null),density:"compact","hide-details":""},null,8,["modelValue"])]),_:1}),l(g,null,{default:u(()=>[l(J,{label:"Drop/Enter opens alternate link",modelValue:p(a),"onUpdate:modelValue":d[4]||(d[4]=m=>A(a)?a.value=m:null),density:"compact","hide-details":""},null,8,["modelValue"])]),_:1}),l(g,null,{default:u(()=>[l(R,{onClick:h,elevation:"0",block:""},{default:u(()=>[l(L,{class:"mr-2","aria-hidden":"false",icon:"$lightbulb"}),H(" "+X(f.value),1)]),_:1})]),_:1})]),_:1})]),_:1}))}}),le=(t,e)=>{const n=t.__vccOpts||t;for(const[o,a]of e)n[o]=a;return n},nt=le(tt,[["__scopeId","data-v-154bab3a"]]),at=_("span",null,"Copied",-1),ot={key:0},T=M({__name:"ButtonCopy",props:{text:{default:""},icon:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},setup(t){var i;const e=t,n=!!((i=navigator==null?void 0:navigator.clipboard)!=null&&i.writeText),o=y(()=>e.icon?"":"mr-2"),a=y(()=>e.icon?"compact":void 0),r=V(!1);function s(){return G(this,null,function*(){e.text&&(yield navigator.clipboard.writeText(e.text),r.value=!0,setTimeout(()=>r.value=!1,600))})}return(f,h)=>p(n)?(w(),E(R,{key:0,raised:"",onClick:s,icon:e.icon,disabled:!f.text,class:"ml-1",density:a.value,variant:"text",rounded:"sm"},{default:u(()=>[l(be,{modelValue:r.value,"onUpdate:modelValue":h[0]||(h[0]=S=>r.value=S),location:"bottom",activator:"parent","open-on-click":"","open-on-hover":!1,"close-delay":"500"},{default:u(()=>[at]),_:1},8,["modelValue"]),l(L,{"aria-hidden":"false",icon:"$content-copy",class:B(o.value)},null,8,["class"]),e.icon===!1?(w(),D("span",ot,"Copy")):I("",!0)]),_:1},8,["icon","disabled","density"])):I("",!0)}}),lt={key:0},O=M({__name:"ButtonLinkBlank",props:{text:{default:""},icon:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},setup(t){const e=t,n=y(()=>e.icon?"":"mr-2"),o=y(()=>e.icon?"compact":void 0);return(a,r)=>(w(),E(R,{raised:"",href:a.text,target:"_blank",disabled:!a.text,class:"mr-1",icon:a.icon,density:o.value,variant:"text",rounded:"sm"},{default:u(()=>[l(L,{"aria-hidden":"false",icon:"$open-in-new",class:B(n.value)},null,8,["class"]),e.icon===!1?(w(),D("span",lt,"Open")):I("",!0)]),_:1},8,["href","disabled","icon","density"]))}}),re=t=>(ke("data-v-9532d272"),t=t(),Le(),t),rt=["onDrop","onDragenter","onDragover","onDragleave"],st={class:"d-flex d-sm-none mt-1 mb-2"},it={class:"d-flex d-sm-none mt-1"},ut={key:0,class:"mt-4 mb-4 text-medium-emphasis float-right font-80"},dt=re(()=>_("b",null,"Open",-1)),ct=re(()=>_("b",null,"Copy",-1)),ft=M({__name:"FixUrl",setup(t){const{alt_is_default:e,alt_reddit:n,alt_twitter:o,alt_youtube:a,drop_open:r}=oe(),s=V(""),i=V(""),f=V(""),h=V(null),S=V(null),d=y(()=>Xe(i.value,o.value,a.value,n.value)),m=y(()=>!i.value||i.value.length<1),se=y(()=>!d.value||d.value.length<1),{xs:$}=xe();ge(s,()=>{ue()});function K(){f.value="drop-hover"}function q(){f.value=""}function ie(b){if(q(),!!b.dataTransfer){console.debug("dropped data",b.dataTransfer.items);for(const c of b.dataTransfer.items)if(c.kind==="string"&&c.type.match("^text/plain")){c.getAsString(v=>{s.value=v,r&&He(()=>z())});return}}}function ue(){return i.value=ee(s.value)}function z(){const b=e.value?d.value:i.value;window.open(b,"_blank","noreferrer")}return(b,c)=>(w(),D("div",{class:B(f.value),onDrop:C(ie,["prevent"]),onDragenter:C(K,["prevent"]),onDragover:C(K,["prevent"]),onDragleave:C(q,["prevent"])},[l(p(k),{modelValue:s.value,"onUpdate:modelValue":c[0]||(c[0]=v=>s.value=v),onKeyup:Ve(z,["enter"]),onFocus:c[1]||(c[1]=v=>v.target.select()),autofocus:"",label:"URL",variant:"underlined",density:"compact",class:"mb-1 mt-2"},null,8,["modelValue","onKeyup"]),l(p(k),{onClick:c[2]||(c[2]=v=>{var U;return(U=h.value)==null?void 0:U.select()}),ref_key:"ref_tf_fixed",ref:h,modelValue:i.value,"onUpdate:modelValue":c[3]||(c[3]=v=>i.value=v),readonly:"","hide-details":"",label:"Fixed URL",disabled:m.value,variant:"underlined",density:"compact",class:"mb-1 mt-2"},W({_:2},[p($)?void 0:{name:"append",fn:u(()=>[l(O,{icon:"",text:i.value},null,8,["text"]),l(T,{icon:"",text:i.value},null,8,["text"])]),key:"0"}]),1032,["modelValue","disabled"]),_("div",st,[l(O,{text:i.value},null,8,["text"]),l(T,{text:i.value},null,8,["text"])]),l(p(k),{onClick:c[4]||(c[4]=v=>{var U;return(U=S.value)==null?void 0:U.select()}),ref_key:"ref_tf_alt",ref:S,modelValue:d.value,"onUpdate:modelValue":c[5]||(c[5]=v=>d.value=v),readonly:"","hide-details":"",label:"Alternate Instance",disabled:se.value,variant:"underlined",density:"compact",class:B(["mb-1",p($)?"mt-4":"mt-8"])},W({_:2},[p($)?void 0:{name:"append",fn:u(()=>[l(O,{icon:"",text:d.value},null,8,["text"]),l(T,{icon:"",text:d.value},null,8,["text"])]),key:"0"}]),1032,["modelValue","disabled","class"]),_("div",it,[l(O,{text:d.value},null,8,["text"]),l(T,{text:d.value},null,8,["text"])]),p($)?I("",!0):(w(),D("p",ut,[l(L,{"aria-hidden":"false",class:"mr-1",icon:"$open-in-new"}),dt,H(" the URL in a new window "),l(L,{class:"ml-2 mr-1",icon:"$content-copy"}),ct,H(" the URL to the clipboard ")]))],42,rt))}}),pt=le(ft,[["__scopeId","data-v-9532d272"]]),mt=_("div",{class:"flex-grow-1 mt-1 u-ellipses"},[H(" Remove "),_("code",{color:"pink"},"tracking"),H(" parameters from a URL ")],-1),_t={class:"d-flex w-100"},ht=_("div",{class:"flex-grow-1"},null,-1),vt={class:"flex-shrink-1 text-caption"},yt={class:"text-decoration-none text-medium-emphasis font-70",href:"https://github.com/mhio/ustrip"},wt={class:"ml-1"},bt=M({__name:"App",setup(t){const e="cf88d93";return Se(()=>{const n=ee(window.location.href);n!==window.location.href&&(console.log("fixing myself!",n),window.location.href=n)}),(n,o)=>(w(),E(Ue,null,{default:u(()=>[l(Ce,null,{default:u(()=>[l(Ae,{elevation:"0",class:"ma-0"},{default:u(()=>[l(Me,{class:"d-flex mr-0 pr-1"},{default:u(()=>[mt,l(nt,{class:"flex-shrink-1"})]),_:1}),l($e,null,{default:u(()=>[l(pt)]),_:1})]),_:1})]),_:1}),l(Te,{height:"20",class:"flex-shrink-1 flex-grow-0"},{default:u(()=>[_("div",_t,[ht,_("div",vt,[_("a",yt,[H(" mhio/ustrip"),_("span",wt,"#"+X(p(e)),1)])])])]),_:1})]),_:1}))}}),xt=Oe({theme:{defaultTheme:"dark"},icons:{defaultSet:"mdi",aliases:j(Q({},Be),{"content-copy":Ie,"open-in-new":Ne,menu:Fe,lightbulb:Ee}),sets:{mdi:De}}});Re(bt).use(xt).mount("#app");
