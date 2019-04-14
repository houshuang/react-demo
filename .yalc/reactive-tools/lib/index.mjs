import{useState as t,useRef as e,useEffect as n}from"react";var r=function(t,e){return t===e||t!=t&&e!=e},o=function(t,e){for(var n=t.length;n--;)if(r(t[n][0],e))return n;return-1},i=Array.prototype.splice;function c(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}c.prototype.clear=function(){this.__data__=[],this.size=0},c.prototype.delete=function(t){var e=this.__data__,n=o(e,t);return!(n<0||(n==e.length-1?e.pop():i.call(e,n,1),--this.size,0))},c.prototype.get=function(t){var e=this.__data__,n=o(e,t);return n<0?void 0:e[n][1]},c.prototype.has=function(t){return o(this.__data__,t)>-1},c.prototype.set=function(t,e){var n=this.__data__,r=o(n,t);return r<0?(++this.size,n.push([t,e])):n[r][1]=e,this};var u=c,a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function s(t,e){return t(e={exports:{}},e.exports),e.exports}var p,f="object"==typeof a&&a&&a.Object===Object&&a,l="object"==typeof self&&self&&self.Object===Object&&self,h=f||l||Function("return this")(),y=h.Symbol,b=Object.prototype,d=b.hasOwnProperty,v=b.toString,j=y?y.toStringTag:void 0,g=Object.prototype.toString,_=y?y.toStringTag:void 0,m=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":_&&_ in Object(t)?function(t){var e=d.call(t,j),n=t[j];try{t[j]=void 0}catch(t){}var r=v.call(t);return e?t[j]=n:delete t[j],r}(t):function(t){return g.call(t)}(t)},O=function(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)},w=function(t){if(!O(t))return!1;var e=m(t);return"[object Function]"==e||"[object GeneratorFunction]"==e||"[object AsyncFunction]"==e||"[object Proxy]"==e},A=h["__core-js_shared__"],S=(p=/[^.]+$/.exec(A&&A.keys&&A.keys.IE_PROTO||""))?"Symbol(src)_1."+p:"",I=Function.prototype.toString,E=function(t){if(null!=t){try{return I.call(t)}catch(t){}try{return t+""}catch(t){}}return""},x=/^\[object .+?Constructor\]$/,z=Function.prototype,P=Object.prototype,F=RegExp("^"+z.toString.call(P.hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),T=function(t,e){var n=function(t,e){return null==t?void 0:t[e]}(t,e);return function(t){return!(!O(t)||(e=t,S&&S in e))&&(w(t)?F:x).test(E(t));var e}(n)?n:void 0},D=T(h,"Map"),L=T(Object,"create"),M=Object.prototype.hasOwnProperty,U=Object.prototype.hasOwnProperty;function k(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}k.prototype.clear=function(){this.__data__=L?L(null):{},this.size=0},k.prototype.delete=function(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e},k.prototype.get=function(t){var e=this.__data__;if(L){var n=e[t];return"__lodash_hash_undefined__"===n?void 0:n}return M.call(e,t)?e[t]:void 0},k.prototype.has=function(t){var e=this.__data__;return L?void 0!==e[t]:U.call(e,t)},k.prototype.set=function(t,e){var n=this.__data__;return this.size+=this.has(t)?0:1,n[t]=L&&void 0===e?"__lodash_hash_undefined__":e,this};var R=k,$=function(t,e){var n,r,o=t.__data__;return("string"==(r=typeof(n=e))||"number"==r||"symbol"==r||"boolean"==r?"__proto__"!==n:null===n)?o["string"==typeof e?"string":"hash"]:o.map};function B(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}B.prototype.clear=function(){this.size=0,this.__data__={hash:new R,map:new(D||u),string:new R}},B.prototype.delete=function(t){var e=$(this,t).delete(t);return this.size-=e?1:0,e},B.prototype.get=function(t){return $(this,t).get(t)},B.prototype.has=function(t){return $(this,t).has(t)},B.prototype.set=function(t,e){var n=$(this,t),r=n.size;return n.set(t,e),this.size+=n.size==r?0:1,this};var C=B;function V(t){var e=this.__data__=new u(t);this.size=e.size}V.prototype.clear=function(){this.__data__=new u,this.size=0},V.prototype.delete=function(t){var e=this.__data__,n=e.delete(t);return this.size=e.size,n},V.prototype.get=function(t){return this.__data__.get(t)},V.prototype.has=function(t){return this.__data__.has(t)},V.prototype.set=function(t,e){var n=this.__data__;if(n instanceof u){var r=n.__data__;if(!D||r.length<199)return r.push([t,e]),this.size=++n.size,this;n=this.__data__=new C(r)}return n.set(t,e),this.size=n.size,this};var N=V,W=function(){try{var t=T(Object,"defineProperty");return t({},"",{}),t}catch(t){}}(),q=function(t,e,n){"__proto__"==e&&W?W(t,e,{configurable:!0,enumerable:!0,value:n,writable:!0}):t[e]=n},G=Object.prototype.hasOwnProperty,J=function(t,e,n){var o=t[e];G.call(t,e)&&r(o,n)&&(void 0!==n||e in t)||q(t,e,n)},H=function(t,e,n,r){var o=!n;n||(n={});for(var i=-1,c=e.length;++i<c;){var u=e[i],a=r?r(n[u],t[u],u,n,t):void 0;void 0===a&&(a=t[u]),o?q(n,u,a):J(n,u,a)}return n},K=function(t){return null!=t&&"object"==typeof t},Q=function(t){return K(t)&&"[object Arguments]"==m(t)},X=Object.prototype,Y=X.hasOwnProperty,Z=X.propertyIsEnumerable,tt=Q(function(){return arguments}())?Q:function(t){return K(t)&&Y.call(t,"callee")&&!Z.call(t,"callee")},et=Array.isArray,nt=function(){return!1},rt=s(function(t,e){var n=e&&!e.nodeType&&e,r=n&&t&&!t.nodeType&&t,o=r&&r.exports===n?h.Buffer:void 0;t.exports=(o?o.isBuffer:void 0)||nt}),ot=/^(?:0|[1-9]\d*)$/,it=function(t,e){var n=typeof t;return!!(e=null==e?9007199254740991:e)&&("number"==n||"symbol"!=n&&ot.test(t))&&t>-1&&t%1==0&&t<e},ct=function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=9007199254740991},ut={};ut["[object Float32Array]"]=ut["[object Float64Array]"]=ut["[object Int8Array]"]=ut["[object Int16Array]"]=ut["[object Int32Array]"]=ut["[object Uint8Array]"]=ut["[object Uint8ClampedArray]"]=ut["[object Uint16Array]"]=ut["[object Uint32Array]"]=!0,ut["[object Arguments]"]=ut["[object Array]"]=ut["[object ArrayBuffer]"]=ut["[object Boolean]"]=ut["[object DataView]"]=ut["[object Date]"]=ut["[object Error]"]=ut["[object Function]"]=ut["[object Map]"]=ut["[object Number]"]=ut["[object Object]"]=ut["[object RegExp]"]=ut["[object Set]"]=ut["[object String]"]=ut["[object WeakMap]"]=!1;var at=function(t){return function(e){return t(e)}},st=s(function(t,e){var n=e&&!e.nodeType&&e,r=n&&t&&!t.nodeType&&t,o=r&&r.exports===n&&f.process,i=function(){try{return r&&r.require&&r.require("util").types||o&&o.binding&&o.binding("util")}catch(t){}}();t.exports=i}),pt=st&&st.isTypedArray,ft=pt?at(pt):function(t){return K(t)&&ct(t.length)&&!!ut[m(t)]},lt=Object.prototype.hasOwnProperty,ht=function(t,e){var n=et(t),r=!n&&tt(t),o=!n&&!r&&rt(t),i=!n&&!r&&!o&&ft(t),c=n||r||o||i,u=c?function(t,e){for(var n=-1,r=Array(t);++n<t;)r[n]=e(n);return r}(t.length,String):[],a=u.length;for(var s in t)!e&&!lt.call(t,s)||c&&("length"==s||o&&("offset"==s||"parent"==s)||i&&("buffer"==s||"byteLength"==s||"byteOffset"==s)||it(s,a))||u.push(s);return u},yt=Object.prototype,bt=function(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||yt)},dt=function(t,e){return function(n){return t(e(n))}},vt=dt(Object.keys,Object),jt=Object.prototype.hasOwnProperty,gt=function(t){return null!=t&&ct(t.length)&&!w(t)},_t=function(t){return gt(t)?ht(t):function(t){if(!bt(t))return vt(t);var e=[];for(var n in Object(t))jt.call(t,n)&&"constructor"!=n&&e.push(n);return e}(t)},mt=Object.prototype.hasOwnProperty,Ot=function(t){return gt(t)?ht(t,!0):function(t){if(!O(t))return function(t){var e=[];if(null!=t)for(var n in Object(t))e.push(n);return e}(t);var e=bt(t),n=[];for(var r in t)("constructor"!=r||!e&&mt.call(t,r))&&n.push(r);return n}(t)},wt=s(function(t,e){var n=e&&!e.nodeType&&e,r=n&&t&&!t.nodeType&&t,o=r&&r.exports===n?h.Buffer:void 0,i=o?o.allocUnsafe:void 0;t.exports=function(t,e){if(e)return t.slice();var n=t.length,r=i?i(n):new t.constructor(n);return t.copy(r),r}}),At=function(){return[]},St=Object.prototype.propertyIsEnumerable,It=Object.getOwnPropertySymbols,Et=It?function(t){return null==t?[]:(t=Object(t),function(e,n){for(var r=-1,o=null==e?0:e.length,i=0,c=[];++r<o;){var u=e[r];St.call(t,u)&&(c[i++]=u)}return c}(It(t)))}:At,xt=function(t,e){for(var n=-1,r=e.length,o=t.length;++n<r;)t[o+n]=e[n];return t},zt=dt(Object.getPrototypeOf,Object),Pt=Object.getOwnPropertySymbols?function(t){for(var e=[];t;)xt(e,Et(t)),t=zt(t);return e}:At,Ft=function(t,e,n){var r=e(t);return et(t)?r:xt(r,n(t))},Tt=function(t){return Ft(t,_t,Et)},Dt=function(t){return Ft(t,Ot,Pt)},Lt=T(h,"DataView"),Mt=T(h,"Promise"),Ut=T(h,"Set"),kt=T(h,"WeakMap"),Rt=E(Lt),$t=E(D),Bt=E(Mt),Ct=E(Ut),Vt=E(kt),Nt=m;(Lt&&"[object DataView]"!=Nt(new Lt(new ArrayBuffer(1)))||D&&"[object Map]"!=Nt(new D)||Mt&&"[object Promise]"!=Nt(Mt.resolve())||Ut&&"[object Set]"!=Nt(new Ut)||kt&&"[object WeakMap]"!=Nt(new kt))&&(Nt=function(t){var e=m(t),n="[object Object]"==e?t.constructor:void 0,r=n?E(n):"";if(r)switch(r){case Rt:return"[object DataView]";case $t:return"[object Map]";case Bt:return"[object Promise]";case Ct:return"[object Set]";case Vt:return"[object WeakMap]"}return e});var Wt=Nt,qt=Object.prototype.hasOwnProperty,Gt=h.Uint8Array,Jt=function(t){var e=new t.constructor(t.byteLength);return new Gt(e).set(new Gt(t)),e},Ht=/\w*$/,Kt=y?y.prototype:void 0,Qt=Kt?Kt.valueOf:void 0,Xt=Object.create,Yt=function(){function t(){}return function(e){if(!O(e))return{};if(Xt)return Xt(e);t.prototype=e;var n=new t;return t.prototype=void 0,n}}(),Zt=st&&st.isMap,te=Zt?at(Zt):function(t){return K(t)&&"[object Map]"==Wt(t)},ee=st&&st.isSet,ne=ee?at(ee):function(t){return K(t)&&"[object Set]"==Wt(t)},re={};re["[object Arguments]"]=re["[object Array]"]=re["[object ArrayBuffer]"]=re["[object DataView]"]=re["[object Boolean]"]=re["[object Date]"]=re["[object Float32Array]"]=re["[object Float64Array]"]=re["[object Int8Array]"]=re["[object Int16Array]"]=re["[object Int32Array]"]=re["[object Map]"]=re["[object Number]"]=re["[object Object]"]=re["[object RegExp]"]=re["[object Set]"]=re["[object String]"]=re["[object Symbol]"]=re["[object Uint8Array]"]=re["[object Uint8ClampedArray]"]=re["[object Uint16Array]"]=re["[object Uint32Array]"]=!0,re["[object Error]"]=re["[object Function]"]=re["[object WeakMap]"]=!1;var oe=ie;function ie(t){this.element=t}function ce(t,e,n){return t<n?n+e:n}function ue(t,e,n){return t<n?n-Math.min(e,n-t):n}ie.prototype._get=ie.prototype._insert=ie.prototype._remove=function(){throw new Error("`_get()`, `_insert(index, length)`, and `_remove(index, length)` prototype methods must be defined.")},ie.prototype._getElementValue=function(){return this.element.value.replace(/\r\n/g,"\n")},ie.prototype._getInputEnd=function(t,e){if(this.element!==document.activeElement)return null;var n=e.length-this.element.selectionStart;return 0===n?n:t.slice(t.length-n)!==e.slice(e.length-n)?null:n},ie.prototype.onInput=function(){var t=this._get(),e=this._getElementValue();if(t!==e){var n=0,r=this._getInputEnd(t,e);if(null===r){for(;t.charAt(n)===e.charAt(n);)n++;for(r=0;t.charAt(t.length-1-r)===e.charAt(e.length-1-r)&&r+n<t.length&&r+n<e.length;)r++}else for(;t.charAt(n)===e.charAt(n)&&n+r<t.length&&n+r<e.length;)n++;if(t.length!==n+r){var o=t.slice(n,t.length-r);this._remove(n,o)}if(e.length!==n+r){var i=e.slice(n,e.length-r);this._insert(n,i)}}},ie.prototype.onInsert=function(t,e){this._transformSelectionAndUpdate(t,e,ce)},ie.prototype.onRemove=function(t,e){this._transformSelectionAndUpdate(t,e,ue)},ie.prototype._transformSelectionAndUpdate=function(t,e,n){if(document.activeElement===this.element){var r=n(t,e,this.element.selectionStart),o=n(t,e,this.element.selectionEnd),i=this.element.selectionDirection;this.update(),this.element.setSelectionRange(r,o,i)}else this.update()},ie.prototype.update=function(){var t=this._get();this._getElementValue()!==t&&(this.element.value=t)};var ae=se;function se(t,e,n){oe.call(this,t),this.doc=e,this.path=n||[],this._opListener=null,this._inputListener=null}function pe(t,e){for(var n=0;n<t.length;n++)if(e[n]!==t[n])return!1;return!0}(se.prototype=Object.create(oe.prototype)).constructor=se,se.prototype.setup=function(){this.update(),this.attachDoc(),this.attachElement()},se.prototype.destroy=function(){this.detachElement(),this.detachDoc()},se.prototype.attachElement=function(){var t=this;this._inputListener=function(){t.onInput()},this.element.addEventListener("input",this._inputListener,!1)},se.prototype.detachElement=function(){this.element.removeEventListener("input",this._inputListener,!1)},se.prototype.attachDoc=function(){var t=this;this._opListener=function(e,n){t._onOp(e,n)},this.doc.on("op",this._opListener)},se.prototype.detachDoc=function(){this.doc.removeListener("op",this._opListener)},se.prototype._onOp=function(t,e){if(e!==this&&0!==t.length){if(t.length>1)throw new Error("Op with multiple components emitted");var n=t[0];pe(this.path,n.p)?(this._parseInsertOp(n),this._parseRemoveOp(n)):pe(n.p,this.path)&&this._parseParentOp()}},se.prototype._parseInsertOp=function(t){t.si&&this.onInsert(t.p[t.p.length-1],t.si.length)},se.prototype._parseRemoveOp=function(t){t.sd&&this.onRemove(t.p[t.p.length-1],t.sd.length)},se.prototype._parseParentOp=function(){this.update()},se.prototype._get=function(){for(var t=this.doc.data,e=0;e<this.path.length;e++)t=t[this.path[e]];return t},se.prototype._insert=function(t,e){var n=this.path.concat(t);this.doc.submitOp({p:n,si:e},{source:this})},se.prototype._remove=function(t,e){var n=this.path.concat(t);this.doc.submitOp({p:n,sd:e},{source:this})};var fe=function(t){return"symbol"==typeof t||K(t)&&"[object Symbol]"==m(t)},le=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,he=/^\w*$/,ye="Expected a function";function be(t,e){if("function"!=typeof t||null!=e&&"function"!=typeof e)throw new TypeError(ye);var n=function(){var r=arguments,o=e?e.apply(this,r):r[0],i=n.cache;if(i.has(o))return i.get(o);var c=t.apply(this,r);return n.cache=i.set(o,c)||i,c};return n.cache=new(be.Cache||C),n}be.Cache=C;var de,ve,je=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,ge=/\\(\\)?/g,_e=(de=be(function(t){var e=[];return 46===t.charCodeAt(0)&&e.push(""),t.replace(je,function(t,n,r,o){e.push(r?o.replace(ge,"$1"):n||t)}),e},function(t){return 500===ve.size&&ve.clear(),t}),ve=de.cache,de),me=y?y.prototype:void 0,Oe=me?me.toString:void 0,we=function(t){if("string"==typeof t||fe(t))return t;var e=t+"";return"0"==e&&1/t==-1/0?"-0":e},Ae=function(t,e,n){var r=null==t?void 0:function(t,e){for(var n=0,r=(e=function(t,e){return et(t)?t:function(t,e){if(et(t))return!1;var n=typeof t;return!("number"!=n&&"symbol"!=n&&"boolean"!=n&&null!=t&&!fe(t))||he.test(t)||!le.test(t)||null!=e&&t in Object(e)}(t,e)?[t]:_e(function(t){return null==t?"":function t(e){if("string"==typeof e)return e;if(et(e))return function(t,e){for(var n=-1,r=null==t?0:t.length,o=Array(r);++n<r;)o[n]=e(t[n],n,t);return o}(e,t)+"";if(fe(e))return Oe?Oe.call(e):"";var n=e+"";return"0"==n&&1/e==-1/0?"-0":n}(t)}(t))}(e,t)).length;null!=t&&n<r;)t=t[we(e[n++])];return n&&n==r?t:void 0}(t,e);return void 0===r?n:r},Se=function(t,e){var n="000000000"+t;return n.substr(n.length-e)},Ie="object"==typeof window?window:self,Ee=Object.keys(Ie).length,xe=navigator.mimeTypes?navigator.mimeTypes.length:0,ze=Se((xe+navigator.userAgent.length).toString(36)+Ee.toString(36),4),Pe=function(){return ze},Fe=0,Te=4,De=36,Le=Math.pow(De,Te);function Me(){return Se((Math.random()*Le<<0).toString(De),Te)}function Ue(){return Fe=Fe<Le?Fe:0,++Fe-1}function ke(){return"c"+(new Date).getTime().toString(De)+Se(Ue().toString(De),Te)+Pe()+(Me()+Me())}ke.slug=function(){var t=(new Date).getTime().toString(36),e=Ue().toString(36).slice(-4),n=Pe().slice(0,1)+Pe().slice(-1),r=Me().slice(-2);return t.slice(-2)+e+n+r},ke.isCuid=function(t){return"string"==typeof t&&!!t.startsWith("c")},ke.isSlug=function(t){if("string"!=typeof t)return!1;var e=t.length;return e>=7&&e<=10},ke.fingerprint=Pe;var Re=ke,$e=function(t,e){void 0===e&&(e=[]);var n=Array.isArray(e)?e:[e];return t.concat(n)},Be=function(t,e,n,r,o,i,c,u){void 0===o&&(o={}),this.stream=c,this.backend=i,this.meta=o,this.readOnly=!!n,this.doc=t,this.path=e||[],this.sessionId=u||"",this.submitOp=n?function(){return r&&r()}:function(e){t.submitOp(e)},this.updateFn=r};Be.prototype.getMergedPath=function(t){return $e(this.path,t)},Be.prototype.getLearningTypesObj=function(){return{}},Be.prototype.bindTextField=function(t,e){var n=$e(this.path,e);"string"!=typeof Ae(this.doc.data,n)&&console.error("Cannot use bindTextField on path that is not initialized as a string, path: "+JSON.stringify(n)+", value "+Ae(this.doc.data,n)+", doc.data: "+JSON.stringify(this.doc.data)+".");var r=new ae(t,this.doc,n);return r.setup(),r},Be.prototype.listPrepend=function(t,e){this.submitOp({p:$e(this.path,e).concat([0]),li:t})},Be.prototype.listAppend=function(t,e){this.submitOp({p:$e(this.path,e).concat([999999]),li:t})},Be.prototype.listInsert=function(t,e){this.submitOp({p:$e(this.path,e),li:t})},Be.prototype.listDel=function(t,e){this.submitOp({p:$e(this.path,e),ld:t})},Be.prototype.listReplace=function(t,e,n){this.submitOp({p:$e(this.path,n),ld:t,li:e})},Be.prototype.numIncr=function(t,e){this.doc.preventCompose=!0,this.submitOp({p:$e(this.path,e),na:t})},Be.prototype.objInsert=function(t,e){this.submitOp({p:$e(this.path,e),oi:t})},Be.prototype.keyedObjInsert=function(t,e){var n=Re(),r=Array.isArray(e)?e:[e];this.submitOp({p:$e(this.path,r.concat([n])),oi:Object.assign({},{id:n},t)})},Be.prototype.objDel=function(t,e){this.submitOp({p:$e(this.path,e),od:t})},Be.prototype.objReplace=function(t,e,n){this.submitOp({p:$e(this.path,n),od:t,oi:e})},Be.prototype.objSet=function(t,e){this.submitOp({p:this.path.concat([e]),oi:t})},Be.prototype.specialize=function(t){var e=Array.isArray(t)?t:[t];return new Be(this.doc,this.path.concat(e),this.readOnly,this.updateFn||function(t){},this.meta,this.backend)},Be.prototype.specializeData=function(t,e){return"string"==typeof t||"number"==typeof t?e[[t]]:t.reduce(function(t,e){return t[[e]]},e)};var Ce=function(t,e,n,r,o,i,c){return new Be(t,[],!!n,r,e,o,i,c)},Ve=function(r,o,i){t(!1);var c=t(null),u=c[0],a=c[1],s=t(null),p=s[0],f=s[1],l=t(!1),h=l[0],y=l[1],b=e(),d=e(),v=e(),j=!1,g=function(){j||(p||f(Ce(b.current)),null!==b.current.data&&(a(function t(e,n,r,o,i,c){var u,a=1&n,s=2&n,p=4&n;if(r&&(u=i?r(e,o,i,c):r(e)),void 0!==u)return u;if(!O(e))return e;var f=et(e);if(f){if(u=function(t){var e=t.length,n=new t.constructor(e);return e&&"string"==typeof t[0]&&qt.call(t,"index")&&(n.index=t.index,n.input=t.input),n}(e),!a)return function(t,e){var n=-1,r=t.length;for(e||(e=Array(r));++n<r;)e[n]=t[n];return e}(e,u)}else{var l=Wt(e),h="[object Function]"==l||"[object GeneratorFunction]"==l;if(rt(e))return wt(e,a);if("[object Object]"==l||"[object Arguments]"==l||h&&!i){if(u=s||h?{}:function(t){return"function"!=typeof t.constructor||bt(t)?{}:Yt(zt(t))}(e),!a)return s?function(t,e){return H(t,Pt(t),e)}(e,function(t,n){return t&&H(e,Ot(e),t)}(u)):function(t,e){return H(t,Et(t),e)}(e,function(t,n){return t&&H(e,_t(e),t)}(u))}else{if(!re[l])return i?e:{};u=function(t,e,n){var r,o,i=t.constructor;switch(e){case"[object ArrayBuffer]":return Jt(t);case"[object Boolean]":case"[object Date]":return new i(+t);case"[object DataView]":return function(t,e){var n=e?Jt(t.buffer):t.buffer;return new t.constructor(n,t.byteOffset,t.byteLength)}(t,n);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":case"[object Uint16Array]":case"[object Uint32Array]":return function(t,e){var n=e?Jt(t.buffer):t.buffer;return new t.constructor(n,t.byteOffset,t.length)}(t,n);case"[object Map]":return new i;case"[object Number]":case"[object String]":return new i(t);case"[object RegExp]":return(o=new(r=t).constructor(r.source,Ht.exec(r))).lastIndex=r.lastIndex,o;case"[object Set]":return new i;case"[object Symbol]":return Qt?Object(Qt.call(t)):{}}}(e,l,a)}}c||(c=new N);var y=c.get(e);if(y)return y;if(c.set(e,u),ne(e))return e.forEach(function(o){u.add(t(o,n,r,o,e,c))}),u;if(te(e))return e.forEach(function(o,i){u.set(i,t(o,n,r,i,e,c))}),u;var b=p?s?Dt:Tt:s?keysIn:_t,d=f?void 0:b(e);return function(o,i){for(var a=-1,s=null==o?0:o.length;++a<s&&!1!==(p=o[a],f=a,d&&(p=e[f=p]),void J(u,f,t(p,n,r,f,e,c))););var p,f}(d||e),u}(b.current.data,5)),d.current&&(window.clearInterval(d.current),d.current=void 0)))};return n(function(){return b.current=r.get(o,i),b.current.setMaxListeners(3e3),b.current.subscribe(),d.current=window.setInterval(function(){v.current+=1,v.current>10?(y(!0),window.clearInterval(d.current),d.current=null):g()},1e3),b.current.type?g():b.current.once("load",function(){g()}),b.current.on("op",function(){g()}),function(){b.current.removeListener("op",g),b.current.removeListener("load",g),j=!0,d.current&&(window.clearInterval(d.current),d.current=void 0)}},[]),[u,p,h]};export{Ve as useReactive,Ce as generateReactiveFn};
//# sourceMappingURL=index.mjs.map
