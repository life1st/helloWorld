(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{101:function(t,e,n){t.exports={editorContainer:"Editor_2PhySOo0ox",readOnly:"Editor_2OuOltIoIB",container:"Editor_1NXcSSwe2z"}},238:function(t,e,n){t.exports={container:"Note_1r4czJoBEs",noteTitle:"Note_33TVEVF5Z5",meta:"Note_qjNvsCaKKG"}},245:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r),o=n(60),i=n(9),c=n(2),u=n(91),l=n(80),s=n(238),d=n.n(s);e.default=function(){var t=Object(c.h)().id,e=Object(c.f)(),n=Object(o.a)(t,i.a.note,{retry:!1,refetchOnWindowFocus:!1}),r=n.isLoading,s=n.data;if(n.error&&e.replace("/"),r)return a.a.createElement("div",null,"Loading...");var f=s.user,m=l.EditorState.createWithContent(Object(l.convertFromRaw)(JSON.parse(s.content)));return a.a.createElement("div",{className:d.a.container},a.a.createElement("h1",{className:d.a.noteTitle},s.title),a.a.createElement("p",{className:d.a.meta},a.a.createElement("span",null,f.name),a.a.createElement("button",{onClick:function(){e.push("/note/".concat(t,"/edit"))}},"Edit"),a.a.createElement("button",{onClick:function(){confirm("ensure delete this note: ".concat(s.title," ?"))&&i.a.deleteNote(t).then((function(){e.push("/")}))}},"Delete")),a.a.createElement(u.a,{editorConfig:{readOnly:!0,editorState:m}}),a.a.createElement("div",null,a.a.createElement("button",{onClick:function(){e.push("/")}},"Back Home")))}},91:function(t,e,n){"use strict";var r=n(0),a=n.n(r),o=n(80),i=(n(140),n(101)),c=n.n(i),u=n(141),l=n.n(u);function s(){return(s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function d(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var i,c=t[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!e||n.length!==e);r=!0);}catch(t){a=!0,o=t}finally{try{r||null==c.return||c.return()}finally{if(a)throw o}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return f(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return f(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}e.a=function(t){var e=t.submitText,n=void 0===e?"submit":e,i=t.onSubmit,u=void 0===i?function(){}:i,f=t.editorConfig,m=void 0===f?{}:f,p=d(Object(r.useState)(m.editorState?m.editorState:o.EditorState.createEmpty()),2),y=p[0],b=p[1],v=Object(r.useRef)(null);return a.a.createElement("div",{className:c.a.container},a.a.createElement("div",{className:l()(c.a.editorContainer,m.readOnly&&c.a.readOnly),onClick:function(){v.current.focus()}},a.a.createElement(o.Editor,s({},m,{ref:v,editorState:y,onChange:b}))),!m.readOnly&&a.a.createElement("button",{onClick:function(){return u(y)}},n))}}}]);
//# sourceMappingURL=4.b8bd.js.map