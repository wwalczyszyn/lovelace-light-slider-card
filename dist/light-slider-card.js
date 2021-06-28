const t="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,e=(t,e,s=null)=>{for(;e!==s;){const s=e.nextSibling;t.removeChild(e),e=s}},s=`{{lit-${String(Math.random()).slice(2)}}}`,i=`\x3c!--${s}--\x3e`,r=new RegExp(`${s}|${i}`);class n{constructor(t,e){this.parts=[],this.element=e;const i=[],n=[],o=document.createTreeWalker(e.content,133,null,!1);let c=0,u=-1,d=0;const{strings:p,values:{length:_}}=t;for(;d<_;){const t=o.nextNode();if(null!==t){if(u++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:s}=e;let i=0;for(let t=0;t<s;t++)a(e[t].name,"$lit$")&&i++;for(;i-- >0;){const e=p[d],s=h.exec(e)[2],i=s.toLowerCase()+"$lit$",n=t.getAttribute(i);t.removeAttribute(i);const a=n.split(r);this.parts.push({type:"attribute",index:u,name:s,strings:a}),d+=a.length-1}}"TEMPLATE"===t.tagName&&(n.push(t),o.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(s)>=0){const s=t.parentNode,n=e.split(r),o=n.length-1;for(let e=0;e<o;e++){let i,r=n[e];if(""===r)i=l();else{const t=h.exec(r);null!==t&&a(t[2],"$lit$")&&(r=r.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),i=document.createTextNode(r)}s.insertBefore(i,t),this.parts.push({type:"node",index:++u})}""===n[o]?(s.insertBefore(l(),t),i.push(t)):t.data=n[o],d+=o}}else if(8===t.nodeType)if(t.data===s){const e=t.parentNode;null!==t.previousSibling&&u!==c||(u++,e.insertBefore(l(),t)),c=u,this.parts.push({type:"node",index:u}),null===t.nextSibling?t.data="":(i.push(t),u--),d++}else{let e=-1;for(;-1!==(e=t.data.indexOf(s,e+1));)this.parts.push({type:"node",index:-1}),d++}}else o.currentNode=n.pop()}for(const t of i)t.parentNode.removeChild(t)}}const a=(t,e)=>{const s=t.length-e.length;return s>=0&&t.slice(s)===e},o=t=>-1!==t.index,l=()=>document.createComment(""),h=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function c(t,e){const{element:{content:s},parts:i}=t,r=document.createTreeWalker(s,133,null,!1);let n=d(i),a=i[n],o=-1,l=0;const h=[];let c=null;for(;r.nextNode();){o++;const t=r.currentNode;for(t.previousSibling===c&&(c=null),e.has(t)&&(h.push(t),null===c&&(c=t)),null!==c&&l++;void 0!==a&&a.index===o;)a.index=null!==c?-1:a.index-l,n=d(i,n),a=i[n]}h.forEach((t=>t.parentNode.removeChild(t)))}const u=t=>{let e=11===t.nodeType?0:1;const s=document.createTreeWalker(t,133,null,!1);for(;s.nextNode();)e++;return e},d=(t,e=-1)=>{for(let s=e+1;s<t.length;s++){const e=t[s];if(o(e))return s}return-1};const p=new WeakMap,_=t=>"function"==typeof t&&p.has(t),f={},g={};class b{constructor(t,e,s){this.__parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this.__parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const e=t?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),s=[],i=this.template.parts,r=document.createTreeWalker(e,133,null,!1);let n,a=0,l=0,h=r.nextNode();for(;a<i.length;)if(n=i[a],o(n)){for(;l<n.index;)l++,"TEMPLATE"===h.nodeName&&(s.push(h),r.currentNode=h.content),null===(h=r.nextNode())&&(r.currentNode=s.pop(),h=r.nextNode());if("node"===n.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(h.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(h,n.name,n.strings,this.options));a++}else this.__parts.push(void 0),a++;return t&&(document.adoptNode(e),customElements.upgrade(e)),e}}const m=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),v=` ${s} `;class y{constructor(t,e,s,i){this.strings=t,this.values=e,this.type=s,this.processor=i}getHTML(){const t=this.strings.length-1;let e="",r=!1;for(let n=0;n<t;n++){const t=this.strings[n],a=t.lastIndexOf("\x3c!--");r=(a>-1||r)&&-1===t.indexOf("--\x3e",a+1);const o=h.exec(t);e+=null===o?t+(r?v:i):t.substr(0,o.index)+o[1]+o[2]+"$lit$"+o[3]+s}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==m&&(e=m.createHTML(e)),t.innerHTML=e,t}}const w=t=>null===t||!("object"==typeof t||"function"==typeof t),x=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class S{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new O(this)}_getValue(){const t=this.strings,e=t.length-1,s=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=s[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!x(t))return t}let i="";for(let r=0;r<e;r++){i+=t[r];const e=s[r];if(void 0!==e){const t=e.value;if(w(t)||!x(t))i+="string"==typeof t?t:String(t);else for(const e of t)i+="string"==typeof e?e:String(e)}}return i+=t[e],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class O{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===f||w(t)&&t===this.value||(this.value=t,_(t)||(this.committer.dirty=!0))}commit(){for(;_(this.value);){const t=this.value;this.value=f,t(this)}this.value!==f&&this.committer.commit()}}class j{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(l()),this.endNode=t.appendChild(l())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=l()),t.__insert(this.endNode=l())}insertAfterPart(t){t.__insert(this.startNode=l()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;_(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=f,t(this)}const t=this.__pendingValue;t!==f&&(w(t)?t!==this.value&&this.__commitText(t):t instanceof y?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):x(t)?this.__commitIterable(t):t===g?(this.value=g,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,s="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=s:this.__commitNode(document.createTextNode(s)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof b&&this.value.template===e)this.value.update(t.values);else{const s=new b(e,t.processor,this.options),i=s._clone();s.update(t.values),this.__commitNode(i),this.value=s}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,i=0;for(const r of t)s=e[i],void 0===s&&(s=new j(this.options),e.push(s),0===i?s.appendIntoPart(this):s.insertAfterPart(e[i-1])),s.setValue(r),s.commit(),i++;i<e.length&&(e.length=i,this.clear(s&&s.endNode))}clear(t=this.startNode){e(this.startNode.parentNode,t.nextSibling,this.endNode)}}class ${constructor(t,e,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this.__pendingValue=t}commit(){for(;_(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=f,t(this)}if(this.__pendingValue===f)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=f}}class P extends S{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new C(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class C extends O{}let N=!1;(()=>{try{const t={get capture(){return N=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class k{constructor(t,e,s){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;_(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=f,t(this)}if(this.__pendingValue===f)return;const t=this.__pendingValue,e=this.value,s=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),i=null!=t&&(null==e||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=T(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=f}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const T=t=>t&&(N?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);function z(t){let e=E.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},E.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const r=t.strings.join(s);return i=e.keyString.get(r),void 0===i&&(i=new n(t,t.getTemplateElement()),e.keyString.set(r,i)),e.stringsArray.set(t.strings,i),i}const E=new Map,V=new WeakMap;const A=new class{handleAttributeExpressions(t,e,s,i){const r=e[0];if("."===r){return new P(t,e.slice(1),s).parts}if("@"===r)return[new k(t,e.slice(1),i.eventContext)];if("?"===r)return[new $(t,e.slice(1),s)];return new S(t,e,s).parts}handleTextExpression(t){return new j(t)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const I=(t,...e)=>new y(t,e,"html",A),U=(t,e)=>`${t}--${e}`;let R=!0;void 0===window.ShadyCSS?R=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),R=!1);const M=t=>e=>{const i=U(e.type,t);let r=E.get(i);void 0===r&&(r={stringsArray:new WeakMap,keyString:new Map},E.set(i,r));let a=r.stringsArray.get(e.strings);if(void 0!==a)return a;const o=e.strings.join(s);if(a=r.keyString.get(o),void 0===a){const s=e.getTemplateElement();R&&window.ShadyCSS.prepareTemplateDom(s,t),a=new n(e,s),r.keyString.set(o,a)}return r.stringsArray.set(e.strings,a),a},L=["html","svg"],q=new Set,B=(t,e,s)=>{q.add(t);const i=s?s.element:document.createElement("template"),r=e.querySelectorAll("style"),{length:n}=r;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(i,t);const a=document.createElement("style");for(let t=0;t<n;t++){const e=r[t];e.parentNode.removeChild(e),a.textContent+=e.textContent}(t=>{L.forEach((e=>{const s=E.get(U(e,t));void 0!==s&&s.keyString.forEach((t=>{const{element:{content:e}}=t,s=new Set;Array.from(e.querySelectorAll("style")).forEach((t=>{s.add(t)})),c(t,s)}))}))})(t);const o=i.content;s?function(t,e,s=null){const{element:{content:i},parts:r}=t;if(null==s)return void i.appendChild(e);const n=document.createTreeWalker(i,133,null,!1);let a=d(r),o=0,l=-1;for(;n.nextNode();)for(l++,n.currentNode===s&&(o=u(e),s.parentNode.insertBefore(e,s));-1!==a&&r[a].index===l;){if(o>0){for(;-1!==a;)r[a].index+=o,a=d(r,a);return}a=d(r,a)}}(s,a,o.firstChild):o.insertBefore(a,o.firstChild),window.ShadyCSS.prepareTemplateStyles(i,t);const l=o.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(s){o.insertBefore(a,o.firstChild);const t=new Set;t.add(a),c(s,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const F={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},H=(t,e)=>e!==t&&(e==e||t==t),D={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:H};class W extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach(((e,s)=>{const i=this._attributeNameForProperty(s,e);void 0!==i&&(this._attributeToPropertyMap.set(i,s),t.push(i))})),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach(((t,e)=>this._classProperties.set(e,t)))}}static createProperty(t,e=D){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():`__${t}`,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const r=this[t];this[e]=i,this.requestUpdateInternal(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||D}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const s of e)this.createProperty(s,t[s])}}static _attributeNameForProperty(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=H){return s(t,e)}static _propertyValueFromAttribute(t,e){const s=e.type,i=e.converter||F,r="function"==typeof i?i:i.fromAttribute;return r?r(t,s):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const s=e.type,i=e.converter;return(i&&i.toAttribute||F.toAttribute)(t,s)}initialize(){this._updateState=0,this._updatePromise=new Promise((t=>this._enableUpdatingResolver=t)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((t,e)=>this[e]=t)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=D){const i=this.constructor,r=i._attributeNameForProperty(t,s);if(void 0!==r){const t=i._propertyValueToAttribute(e,s);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(r):this.setAttribute(r,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const s=this.constructor,i=s._attributeToPropertyMap.get(t);if(void 0!==i){const t=s.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=s._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,s){let i=!0;if(void 0!==t){const r=this.constructor;s=s||r.getPropertyOptions(t),r._valueHasChanged(this[t],e,s.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==s.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,s))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((t,e)=>this._propertyToAttribute(e,this[e],t))),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}W.finalized=!0;const J=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?Object.assign(Object.assign({},e),{finisher(s){s.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(s){s.createProperty(e.key,t)}};const G=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,K=Symbol();class Q{constructor(t,e){if(e!==K)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(G?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const X=(t,...e)=>{const s=e.reduce(((e,s,i)=>e+(t=>{if(t instanceof Q)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[i+1]),t[0]);return new Q(s,K)};(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const Y={};class Z extends W{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,s)=>t.reduceRight(((t,s)=>Array.isArray(s)?e(s,t):(t.add(s),t)),s),s=e(t,new Set),i=[];s.forEach((t=>i.unshift(t))),this._styles=i}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map((t=>{if(t instanceof CSSStyleSheet&&!G){const e=Array.prototype.slice.call(t.cssRules).reduce(((t,e)=>t+e.cssText),"");return new Q(String(e),K)}return t}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?G?this.renderRoot.adoptedStyleSheets=t.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map((t=>t.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==Y&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)})))}render(){return Y}}Z.finalized=!0,Z.render=(t,s,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const r=i.scopeName,n=V.has(s),a=R&&11===s.nodeType&&!!s.host,o=a&&!q.has(r),l=o?document.createDocumentFragment():s;if(((t,s,i)=>{let r=V.get(s);void 0===r&&(e(s,s.firstChild),V.set(s,r=new j(Object.assign({templateFactory:z},i))),r.appendInto(s)),r.setValue(t),r.commit()})(t,l,Object.assign({templateFactory:M(r)},i)),o){const t=V.get(l);V.delete(l);const i=t.value instanceof b?t.value.template:void 0;B(r,l,i),e(s,s.firstChild),s.appendChild(l),V.set(s,t)}!n&&a&&window.ShadyCSS.styleElement(s.host)};class tt{constructor(t){this._config=t}set hass(t){this._hass=t,this.stateObj=t.states[this._config.entity]}get value(){return this._value?Math.round(this._value/this.step)*this.step:0}set value(t){t!==this.value&&(this._value=t)}get string(){return`${this.value}`}instantString(t){return this.isValueOff(t)?this._hass.localize("component.light.state._.off"):`${t}`}get hidden(){return!1}get hasSlider(){return!0}get hasToggle(){return!0}get isOff(){return 0===this.value}isValueOff(t){return 0==t}get min(){var t,e;return null!==(e=null!==(t=this._config.min)&&void 0!==t?t:this._min)&&void 0!==e?e:0}get max(){var t,e;return null!==(e=null!==(t=this._config.max)&&void 0!==t?t:this._max)&&void 0!==e?e:100}get step(){var t,e;return null!==(e=null!==(t=this._config.step)&&void 0!==t?t:this._step)&&void 0!==e?e:5}get icon(){var t,e,s,i;return this.isOff&&(this._config.icon_off||this._icon_off&&!this._config.icon)?null!==(t=this._config.icon_off)&&void 0!==t?t:this._icon_off:null!==(i=null!==(s=null!==(e=this._config.icon)&&void 0!==e?e:this._icon)&&void 0!==s?s:this.stateObj.attributes.icon)&&void 0!==i?i:"mdi:lightbulb"}instantIcon(t){var e,s,i,r;return this.isValueOff(t)&&(this._config.icon_off||this._icon_off&&!this._config.icon)?null!==(e=this._config.icon_off)&&void 0!==e?e:this._icon_off:null!==(r=null!==(i=null!==(s=this._config.icon)&&void 0!==s?s:this._icon)&&void 0!==i?i:this.stateObj.attributes.icon)&&void 0!==r?r:"mdi:lightbulb"}get sliderColor(){var t,e;return this.isOff&&(this._config.slider_color_auto||this._config.slider_color_rgb_off)?null!==(e=null!==(t=this._config.slider_color_rgb_off)&&void 0!==t?t:this._slider_color_rgb_off)&&void 0!==e?e:"rgb(70, 70, 70)":this.sliderInstantColor(this.value)}sliderInstantColor(t){var e,s,i,r,n,a,o;if(this.isValueOff(t)&&(this._config.slider_color_auto||this._config.slider_color_rgb_off))return null!==(s=null!==(e=this._config.slider_color_rgb_off)&&void 0!==e?e:this._slider_color_rgb_off)&&void 0!==s?s:"rgb(70, 70, 70)";if(this._config.slider_color_auto||this._config.slider_color_rgb_0&&this._config.slider_color_rgb_100){const e=null!==(r=null!==(i=this._config.slider_color_rgb_0)&&void 0!==i?i:this._slider_color_rgb_0)&&void 0!==r?r:"rgb(158, 158, 158)",s=null!==(a=null!==(n=this._config.slider_color_rgb_100)&&void 0!==n?n:this._slider_color_rgb_100)&&void 0!==a?a:"rgb(250, 250, 250)",o=e.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i),l=s.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);if(o&&l){const e=(t-this.min)/(this.max-this.min);return`rgb(${parseInt(o[1])+e*(parseInt(l[1])-parseInt(o[1]))}, ${parseInt(o[2])+e*(parseInt(l[2])-parseInt(o[2]))}, ${parseInt(o[3])+e*(parseInt(l[3])-parseInt(o[3]))})`}}return null!==(o=this._config.slider_color)&&void 0!==o?o:"var(--accent-color)"}get sliderTrackColor(){var t;return null!==(t=this._config.slider_track_color)&&void 0!==t?t:"var(--disabled-text-color)"}get sliderThumbColor(){var t;return null!==(t=this._config.slider_thumb_color)&&void 0!==t?t:"var(--disabled-text-color)"}}const et={red:0,green:1,blue:2},st={hue:0,saturation:1};class it extends tt{get attribute(){return this._config.attribute||"brightness_pct"}get _value(){if(!this.stateObj||"on"!==this.stateObj.state)return 0;const t=this.stateObj.attributes;switch(this.attribute){case"color_temp":return t.color_temp;case"color_temp_pct":return(t.color_temp-t.min_mireds)/(t.max_mireds-t.min_mireds)*100;case"white_value":return t.white_value;case"brightness":return t.brightness;case"brightness_pct":return 100*t.brightness/255;case"red":case"green":case"blue":return t.rgb_color?t.rgb_color[et[this.attribute]]:0;case"hue":case"saturation":return t.hs_color?t.hs_color[st[this.attribute]]:0;case"effect":return t.effect_list?t.effect_list.indexOf(t.effect):0;default:return 0}}get _step(){switch(this.attribute){case"effect":return 1;default:return 5}}get _min(){switch(this.attribute){case"color_temp":return this.stateObj?this.stateObj.attributes.min_mireds:0;default:return 0}}get _max(){switch(this.attribute){case"color_temp":return this.stateObj?this.stateObj.attributes.max_mireds:0;case"red":case"green":case"blue":case"white_value":case"brightness":return 255;case"hue":return 360;case"effect":return this.stateObj&&this.stateObj.attributes.effect_list?this.stateObj.attributes.effect_list.length-1:0;default:return 100}}set _value(t){if(!this.stateObj)return;const e=this.stateObj.attributes;let s,i=this.attribute,r=!0;switch(i){case"color_temp_pct":t=Math.round(t/100*(e.max_mireds-e.min_mireds))+e.min_mireds,i="color_temp";break;case"brightness":case"brightness_pct":(t="brightness"===i?Math.round(t):Math.round(t/100*255))||(r=!1),i="brightness";break;case"red":case"green":case"blue":s=this.stateObj.attributes.rgb_color||[0,0,0],s[et[i]]=t,t=s,i="rgb_color";break;case"hue":case"saturation":s=this.stateObj.attributes.hs_color||[0,0],s[st[i]]=t,t=s,i="hs_color";break;case"effect":t=this.stateObj.attributes.effect_list[t],i="effect"}r?this._hass.callService("light","turn_on",{entity_id:this.stateObj.entity_id,[i]:t}):this._hass.callService("light","turn_off",{entity_id:this.stateObj.entity_id})}get _icon(){return"mdi:lightbulb"}get _icon_off(){return"mdi:lightbulb-off"}get isOff(){return this.stateObj&&"off"===this.stateObj.state}isValueOff(t){return("brightness"==this.attribute||"brightness_pct"==this.attribute)&&0==t}get string(){if(this.isOff)return this._hass.localize("component.light.state._.off");switch(this.attribute){case"color_temp":case"brightness":return`${this.value}`;case"color_temp_pct":case"brightness_pct":case"saturation":return`${this.value} %`;case"hue":return`${this.value} °`;case"effect":return this.stateObj?this.stateObj.attributes.effect:"";default:return this.value}}instantString(t){switch(this.attribute){case"color_temp":return`${t}`;case"brightness":return 0==t?this._hass.localize("component.light.state._.off"):`${t}`;case"brightness_pct":return 0==t?this._hass.localize("component.light.state._.off"):`${t} %`;case"color_temp_pct":case"saturation":return`${t} %`;case"hue":return`${t} °`;case"effect":return this.stateObj?`${t}`:"";default:return`${t}`}}get _slider_color_rgb_0(){switch(this.attribute){case"color_temp":case"color_temp_pct":return"rgb(226, 250, 255)";case"brightness":case"brightness_pct":return"rgb(82, 82, 82)";default:return null}}get _slider_color_rgb_100(){switch(this.attribute){case"color_temp":case"color_temp_pct":return"rgb(255, 180, 0)";case"brightness":case"brightness_pct":return"rgb(240, 240, 240)";default:return null}}get hasSlider(){if(!this.stateObj)return!1;switch(this.attribute){case"brightness":case"brightness_pct":return"brightness"in this.stateObj.attributes||!!("supported_features"in this.stateObj.attributes&&1&this.stateObj.attributes.supported_features);case"color_temp":case"color_temp_pct":return"color_temp"in this.stateObj.attributes||!!("supported_features"in this.stateObj.attributes&&2&this.stateObj.attributes.supported_features);case"white_value":return"white_value"in this.stateObj.attributes||!!("supported_features"in this.stateObj.attributes&&128&this.stateObj.attributes.supported_features);case"red":case"green":case"blue":return"rgb_color"in this.stateObj.attributes||!!("supported_features"in this.stateObj.attributes&&16&this.stateObj.attributes.supported_features);case"hue":case"saturation":return"hs_color"in this.stateObj.attributes||!!("supported_features"in this.stateObj.attributes&&16&this.stateObj.attributes.supported_features);case"effect":return"effect"in this.stateObj.attributes;default:return!1}}}class rt extends tt{get _icon(){return"mdi:volume-high"}get _icon_off(){return"mdi:volume-off"}get _value(){return this.stateObj.attributes.is_volume_muted?0:Math.ceil(100*this.stateObj.attributes.volume_level)}set _value(t){t/=100,this._hass.callService("media_player","volume_set",{entity_id:this.stateObj.entity_id,volume_level:t}),t&&this._hass.callService("media_player","volume_mute",{entity_id:this.stateObj.entity_id,is_volume_muted:!1})}get isOff(){return"off"===this.stateObj.state||0==this.stateObj.attributes.volume_level}isValueOff(t){return 0==t}get string(){return this.stateObj.attributes.is_volume_muted?"-":this.stateObj.attributes.volume_level?`${this.value} %`:this._hass.localize("component.media_player.state._.off")}instantString(t){return this.isValueOff(t)?this._hass.localize("component.media_player.state._.off"):`${t} %`}}class nt extends tt{get attribute(){return this._config.attribute||"temperature"}get _icon(){switch(this.attribute){case"fan_mode":return"mdi:fan";default:return"mdi:thermometer"}}get _icon_off(){switch(this.attribute){case"fan_mode":return"mdi:fan-off";default:return"mdi:thermometer-off"}}get _slider_color_rgb_0(){return"temperature"===this.attribute?"rgb(0, 191, 255)":null}get _slider_color_rgb_100(){return"temperature"===this.attribute?"rgb(220, 20, 60)":null}get _value(){switch(this.attribute){case"fan_mode":if(this.isOff)return 0;return this.stateObj.attributes.fan_modes.indexOf(this.stateObj.attributes.fan_mode)+1;default:return this.stateObj.attributes.temperature}}set _value(t){switch(this.attribute){case"fan_mode":if(0==t)this._hass.callService("climate","turn_off",{entity_id:this.stateObj.entity_id});else{const e=this.stateObj.attributes.fan_modes;this._hass.callService("climate","set_fan_mode",{entity_id:this.stateObj.entity_id,fan_mode:e[t-1]}),this.isOff&&this._hass.callService("climate","turn_on",{entity_id:this.stateObj.entity_id})}break;case"temperature":default:this._hass.callService("climate","set_temperature",{entity_id:this.stateObj.entity_id,temperature:t})}}get string(){switch(this.attribute){case"fan_mode":return this.isOff?this._hass.localize("component.climate.state._.off"):this.stateObj.attributes.fan_mode;default:return`${this.value} ${this._hass.config.unit_system.temperature}`}}instantString(t){switch(this.attribute){case"fan_mode":return[this._hass.localize("component.climate.state._.off")].concat(this.stateObj.attributes.fan_modes)[t];default:return`${t} ${this._hass.config.unit_system.temperature}`}}get isOff(){return"off"===this.stateObj.state}get _min(){switch(this.attribute){case"fan_mode":return 0;default:return this.stateObj.attributes.min_temp}}get _max(){switch(this.attribute){case"fan_mode":return this.stateObj.attributes.fan_modes.length;default:return this.stateObj.attributes.max_temp}}get _step(){return 1}}class at extends tt{get attribute(){return this._config.attribute||"position"}get _value(){switch(this.attribute){case"position":return"closed"===this.stateObj.state?0:this.stateObj.attributes.current_position;case"tilt":return this.stateObj.attributes.current_tilt_position;default:return 0}}set _value(t){switch(this.attribute){case"position":this._hass.callService("cover","set_cover_position",{entity_id:this.stateObj.entity_id,position:t});break;case"tilt":this._hass.callService("cover","set_cover_tilt_position",{entity_id:this.stateObj.entity_id,tilt_position:t})}}get string(){if(!this.hasSlider)return"";switch(this.attribute){case"position":return"closed"===this.stateObj.state?this._hass.localize("component.cover.state._.closed"):100===this.value?this._hass.localize("component.cover.state._.open"):`${this.value} %`;case"tilt":return this.value}}instantString(t){switch(this.attribute){case"position":return 0==t?this._hass.localize("component.cover.state._.closed"):100==t?this._hass.localize("component.cover.state._.open"):`${t} %`;case"tilt":return`${t}`}return""}get hasSlider(){switch(this.attribute){case"position":if("current_position"in this.stateObj.attributes)return!0;if("supported_features"in this.stateObj.attributes&&4&this.stateObj.attributes.supported_features)return!0;case"tilt":if("current_tilt_position"in this.stateObj.attributes)return!0;if("supported_features"in this.stateObj.attributes&&128&this.stateObj.attributes.supported_features)return!0;default:return!1}}get _step(){return 10}}class ot extends tt{get _value(){return"off"!==this.stateObj.state?this.stateObj.attributes.percentage:0}set _value(t){t>0?this._hass.callService("fan","set_percentage",{entity_id:this.stateObj.entity_id,percentage:t}):this._hass.callService("fan","turn_off",{entity_id:this.stateObj.entity_id})}get string(){return"off"===this.stateObj.state?this._hass.localize("component.fan.state._.off"):this.stateObj.attributes.speed}get hasSlider(){return"speed"in this.stateObj.attributes}get _step(){return this.stateObj.attributes.percentage_step}}class lt extends tt{get _value(){return this.stateObj.state}set _value(t){this._hass.callService("input_number","set_value",{entity_id:this.stateObj.entity_id,value:t})}get string(){return`${parseFloat(this.stateObj.state)} ${this.stateObj.attributes.unit_of_measurement||""}`.trim()}instantString(t){return`${t} ${this.stateObj.attributes.unit_of_measurement||""}`.trim()}get isOff(){return!1}isValueOff(t){return!1}get hasSlider(){return"slider"===this.stateObj.attributes.mode}get _min(){return this.stateObj.attributes.min}get _max(){return this.stateObj.attributes.max}get _step(){return this.stateObj.attributes.step}}class ht extends tt{get _value(){return this.stateObj.attributes.options.indexOf(this.stateObj.state)}set _value(t){t in this.stateObj.attributes.options&&this._hass.callService("input_select","select_option",{entity_id:this.stateObj.entity_id,option:this.stateObj.attributes.options[t]})}get string(){return this.stateObj.state}get isOff(){return!1}isValueOff(t){return!1}get hasSlider(){return this.stateObj.attributes.options&&this.stateObj.attributes.options.length>0}get _max(){return this.stateObj.attributes.options.length-1}get _step(){return 1}}class ct extends tt{get _value(){return this.stateObj.state}set _value(t){this._hass.callService("number","set_value",{entity_id:this.stateObj.entity_id,value:t})}get string(){return`${parseFloat(this.stateObj.state)} ${this.stateObj.attributes.unit_of_measurement||""}`.trim()}instantString(t){return`${t} ${this.stateObj.attributes.unit_of_measurement||""}`.trim()}get isOff(){return!1}isValueOff(t){return!1}get hasSlider(){return!0}get _min(){return this.stateObj.attributes.min}get _max(){return this.stateObj.attributes.max}get _step(){return this.stateObj.attributes.step}}var ut,dt="1.0.0";class pt extends Z{setConfig(t){if(this._config=t,!t.entity)throw new Error("No entity specified.");const e=t.entity.split(".")[0],s=function(t){return{light:it,media_player:rt,climate:nt,cover:at,fan:ot,input_number:lt,input_select:ht,number:ct}[t]}(e);if(!s)throw new Error(`Unsupported entity type: ${e}`);this.ctrl=new s(t)}async resized(){await this.updateComplete}async firstUpdated(){await this.resized()}render(){var t,e,s,i,r,n,a,o,l,h,c,u,d,p;const _=this.ctrl;if(_.hass=this.hass,!_.stateObj)return I`
        <hui-warning>
          ${this.hass.localize("ui.panel.lovelace.warning.entity_not_found","entity",this._config.entity)}
        </hui-warning>
      `;const f="unavailable"!==_.stateObj.state&&_.hasSlider,g=!this._config.hide_state,b=!this._config.hide_title,m=!this._config.hide_icon,v=this._config.hide_thumb,y=this._config.transparent_card,w=null!==(t=this._config.title)&&void 0!==t?t:_.stateObj.attributes.friendly_name,x=null!==(e=this._config.horizontal)&&void 0!==e&&e,S=null!==(s=this._config.state_position)&&void 0!==s?s:"before",O=x?null!==(i=this._config.slider_height)&&void 0!==i?i:"100px":null!==(r=this._config.slider_width)&&void 0!==r?r:"150px",j=x?null!==(n=this._config.slider_width)&&void 0!==n?n:"100%":null!==(a=this._config.slider_height)&&void 0!==a?a:"400px",$=null!==(o=this._config.slider_corner_radius)&&void 0!==o?o:"var(--ha-card-border-radius)",P=this._config.slider_color?this._config.slider_color:_.sliderColor,C=this._config.slider_track_color?this._config.slider_track_color:_.sliderTrackColor,N=this._config.slider_thumb_color?this._config.slider_thumb_color:_.sliderThumbColor,k=v?0:null!==(l=this._config.slider_thumb_size)&&void 0!==l?l:"100px",T=null!==(h=this._config.state_color)&&void 0!==h?h:"var(--primary-text-color)",z=null!==(c=this._config.title_color)&&void 0!==c?c:"var(--primary-text-color)",E=null!==(u=this._config.icon_color)&&void 0!==u?u:"var(--primary-text-color)",V=null!==(d=this._config.icon_position)&&void 0!==d?d:"inline",A=null!==(p=this._config.icon_size)&&void 0!==p?p:"inside"===V?"40px":null;return f?I`
      <ha-card style="${y?"background: none; box-shadow: none;":""}">
        <div class="wrapper" @click=${t=>t.stopPropagation()}>
          <div class="title-wrapper">
            ${m&&"inline"===V?I`
            <ha-icon id="state-icon" icon="${_.icon}" style="color: ${E}; ${A?`--mdc-icon-size: ${A};`:""}"></ha-icon>`:""}
            ${b?I`
            <span class="title" style="color: ${z}">${w}</span>`:""}
          </div>
          <div class="slider-wrapper ${x?"horizontal":"vertical"}">
          ${!m||"before"!==V&&"after"!==V?"":I`
            <ha-icon id="state-icon" icon="${_.icon}" class="${V}" style="color: ${E}; ${A?`--mdc-icon-size: ${A};`:""}"></ha-icon>`}
          ${!g||"before"!==S&&"after"!==S?"":I`
            <span id="slider-value" class="state ${S}">
                ${"unavailable"===_.stateObj.state?this.hass.localize("state.default.unavailable"):_.string}
            </span>`}
          
            <div class="range-holder ${v?"hide-thumb":""}" style="--slider-height: ${j}; --slider-width: ${O}; --state-color: ${T}; ">
              <input type="range" style="--slider-border-radius: ${$}; --slider-color: ${P}; --slider-thumb-color:${N}; --slider-track-color:${C}; --thumb-size: ${k};"                  
                  .value="${this._updateCurrentValue(_)}"
                  .min=${_.min}
                  .max=${_.max}
                  .step=${_.step}
                  @input=${t=>this._previewValue(_,t)}
                  @change=${t=>this._setValue(_,t)}>
                  
              <div class="inside-wrapper">
                  ${m&&"inside"===V?I`
                  <ha-icon id="state-icon" class="${V}" icon="${_.icon}" style="color: ${E}; ${A?`--mdc-icon-size: ${A};`:""}"></ha-icon>`:""}
                  ${g&&"inside"===S?I`
                  <span id="slider-value" class="state ${S}">
                      ${"unavailable"===_.stateObj.state?this.hass.localize("state.default.unavailable"):_.string}
                  </span>`:""}
              </div>
            </div>
          </div>
        </div>
      </ha-card>
    `:""}_updateCurrentValue(t){const e=this.shadowRoot.getElementById("slider-value");return e&&(e.innerText=t.string),t.isOff?0:t.value}_previewValue(t,e){const s=this.shadowRoot.getElementById("slider-value");s&&(s.innerText=t.instantString(e.target.value));const i=this.shadowRoot.getElementById("state-icon");i&&i.setAttribute("icon",t.instantIcon(e.target.value)),e.target.style.setProperty("--slider-color",t.sliderInstantColor(e.target.value))}_setValue(t,e){t.value=e.target.value;const s=this.shadowRoot.getElementById("slider-value");s&&(s.innerText=t.instantString(e.target.value));const i=this.shadowRoot.getElementById("state-icon");i&&i.setAttribute("icon",t.instantIcon(e.target.value)),e.target.style.setProperty("--slider-color",t.sliderInstantColor(e.target.value))}static get styles(){return X`
      .wrapper {
        padding: 10px;
        display: flex;
        align-items: center;
        flex-direction: column;
      }
      .title-wrapper {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        max-width: 100%;
      }
      .title-wrapper > ha-icon + span {
        margin-left: 10px;
      }
      .title {
        font-size: 24px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        line-height: 28px;
      }
      .slider-wrapper {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
        flex-direction: column;
      }
      .slider-wrapper.horizontal {
        flex-direction: row;
      }
      .state {
        margin: 10px 0px 20px 0;
        font-size: 22px;
        color: var(--state-color);
        max-width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        line-height: normal;
      }
      .horizontal .state {
        text-overflow: initial;
        overflow: visible;
        margin: 0px 20px 0px 10px;
      }
      .state.after {
        order: 2;
        margin: 20px 0px 10px 0;
      }
      ha-icon.before {
        margin: 10px 0px 20px 0;
      }
      ha-icon.after {
        order: 1;
        margin: 20px 0px 10px 0;
      }
      .horizontal ha-icon.before {
        margin: 0px 20px 0px 10px;
      }
      .horizontal ha-icon.after {
        order: 1;
        margin: 0px 10px 0px 20px;
      }
      .horizontal .state.after {
        margin: 0px 10px 0px 20px;
      }
      ha-icon.before + .state.before,
      ha-icon.after + .state.after {
        margin: 10px 0px 10px 0;
      }
      .horizontal ha-icon.before + .state.before,
      .horizontal ha-icon.after + .state.after {
        margin: 0px 10px 0px 10px;
      }
      .inside-wrapper {
        position: absolute;
        width: 100%;
        text-align: center;
        bottom: calc(0.45 * var(--slider-width));
        pointer-events: none;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
      }
      .horizontal .inside-wrapper {
        bottom: initial;
        left: calc(0.45 * var(--slider-width));
        flex-direction: row;
        height: 100%;
        width: initial;
      }
      .inside-wrapper > ha-icon {
        -webkit-filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.2));
        filter: drop-shadow(rgba(0, 0, 0, 0.2) 0 1px 3px);
      }
      .state.inside {
        display: block;
        text-align: center;
        margin: 20px 10px 0 10px;
        -webkit-filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.2));
        filter: drop-shadow(rgba(0, 0, 0, 0.2) 0 1px 3px);
      }
      .horizontal .state.inside {
        margin: 10px 0 10px 20px;
      }
      .range-holder {
        height: var(--slider-height);
        width: var(--slider-width);
        position: relative;
        display: block;
        margin: auto;
      }
      .horizontal .range-holder {
        height: var(--slider-width);
        width: var(--slider-height);
      }
      .range-holder input[type="range"] {
          outline: 0;
          border: 0;
          border-radius: var(--slider-border-radius, 12px);
          width: var(--slider-height);
          margin: 0;
          //transition: box-shadow 0.2s ease-in-out;
          overflow: hidden;
          height: var(--slider-width);
          -webkit-appearance: none;
          background-color: var(--slider-track-color);
          position: absolute;
          top: calc(50% - (var(--slider-width) / 2));
          right: calc(50% - (var(--slider-height) / 2));
      }
      .vertical .range-holder input[type="range"] {
          -webkit-transform:rotate(270deg);
          -moz-transform:rotate(270deg);
          -o-transform:rotate(270deg);
          -ms-transform:rotate(270deg);
          transform:rotate(270deg);
      }
      .range-holder input[type="range"]::-webkit-slider-runnable-track {
          height: var(--slider-width);
          -webkit-appearance: none;
          background-color: var(--slider-track-color);
          margin-top: -1px;
          //transition: box-shadow 0.2s ease-in-out;
      }
      .range-holder input[type="range"]::-moz-thumb-track {
        height: var(--slider-width);
        background-color: var(--slider-track-color);
        margin-top: -1px;
        //transition: box-shadow 0.2s ease-in-out;
      }
      .range-holder input[type="range"]::-webkit-slider-thumb {
          width: 25px;
          border-right:10px solid var(--slider-color);
          border-left:10px solid var(--slider-color);
          border-top:20px solid var(--slider-color);
          border-bottom:20px solid var(--slider-color);
          -webkit-appearance: none;
          height: var(--thumb-size);
          cursor: grab;
          background: var(--slider-color);
          box-shadow: -350px 0 0 350px var(--slider-color), inset 0 0 0 80px var(--slider-thumb-color);
          border-radius: 0;
          //transition: box-shadow 0.2s ease-in-out;
          position: relative;
          top: calc((var(--slider-width) - var(--thumb-size)) / 2);
      }
      .range-holder.hide-thumb input[type="range"]::-webkit-slider-thumb {
        box-shadow: -350px 0 0 350px var(--slider-color);
      }
      .range-holder input[type="range"]::-moz-range-thumb {
          width: 5px;
          border-right:12px solid var(--slider-color);
          border-left:12px solid var(--slider-color);
          border-top:20px solid var(--slider-color);
          border-bottom:20px solid var(--slider-color);
          height: calc(var(--thumb-size) - 2*20px);
          cursor: grab;
          background: var(--slider-color);
          box-shadow: -350px 0 0 350px var(--slider-color), inset 0 0 0 80px var(--slider-thumb-color);
          border-radius: 0;
          //transition: box-shadow 0.2s ease-in-out;
          position: relative;
          top: calc((var(--slider-width) - (var(--thumb-size) - 2*20px)) / 2);
      }
      .range-holder.hide-thumb input[type="range"]::-moz-range-thumb {
        box-shadow: -350px 0 0 350px var(--slider-color);
      }
    `}}!function(t,e,s,i){var r,n=arguments.length,a=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,s,i);else for(var o=t.length-1;o>=0;o--)(r=t[o])&&(a=(n<3?r(a):n>3?r(e,s,a):r(e,s))||a);n>3&&a&&Object.defineProperty(e,s,a)}([(t,e)=>void 0!==e?((t,e,s)=>{e.constructor.createProperty(s,t)})(ut,t,e):J(ut,t)],pt.prototype,"hass",void 0),customElements.get("light-slider-card")||(customElements.define("light-slider-card",pt),console.info(`%cLIGHT-SLIDER-CARD ${dt} IS INSTALLED`,"color: green; font-weight: bold",""));
