(window.webpackJsonppuhelinluettelo=window.webpackJsonppuhelinluettelo||[]).push([[0],{17:function(e,t,n){e.exports=n(41)},22:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(15),o=n.n(c),u=(n(22),n(16)),l=n(2),i=function(e){var t=e.addContact,n=e.newNumber,a=e.newName,c=e.handleNameInputChange,o=e.handleNumberInputChange;return r.a.createElement("form",{onSubmit:t},r.a.createElement("div",{style:{color:"blue"}},"name: ",r.a.createElement("span",null,"\xa0\xa0")," ",r.a.createElement("input",{value:a,onChange:c})),r.a.createElement("div",{style:{color:"blue"}},"number: ",r.a.createElement("input",{value:n,onChange:o})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},s=function(e){var t=e.search,n=e.handleSearchInputChange;return r.a.createElement("div",{style:{color:"blue"}},"search: ",r.a.createElement("input",{value:t,onChange:n}))},m=function(e){var t=e.persons,n=e.search,a=e.handleDeleteClick;e.handleUpdateClick;return t.map((function(e){return e.name.toLowerCase().indexOf(n)>-1?r.a.createElement("table",{key:e.id},r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",{style:{width:"100px"}},r.a.createElement("button",{style:{width:"80px"},onClick:function(){return a(e.id)}},"Delete")),r.a.createElement("td",{style:{width:"200px"}},e.name," ",r.a.createElement("span",null,"\xa0")),r.a.createElement("td",{style:{width:"150px"}},e.number)))):null}))},d=n(3),f=n.n(d),p=n(5),h=n(4),b=n.n(h),v="/api/persons",w={getAll:function(){var e=Object(p.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=b.a.get(v),e.abrupt("return",t.then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),create:function(e){return b.a.post(v,e)},update:function(){var e=Object(p.a)(f.a.mark((function e(t,n){var a,r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=b.a.put("".concat(v,"/").concat(t),n),e.next=3,a;case 3:return r=e.sent,e.abrupt("return",r.data);case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),remove:function(e){return b.a.delete("".concat(v,"/").concat(e))}},y=function(e){var t=e.message,n=e.isPositive;return null===t?null:!0===n?r.a.createElement("div",{className:"success"},t):r.a.createElement("div",{className:"error"},t)};function E(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}var O=function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)(""),d=Object(l.a)(o,2),f=d[0],p=d[1],h=Object(a.useState)(""),b=Object(l.a)(h,2),v=b[0],O=b[1],g=Object(a.useState)(""),j=Object(l.a)(g,2),C=j[0],k=j[1],N=Object(a.useState)(null),P=Object(l.a)(N,2),x=P[0],S=P[1],D=Object(a.useState)(!0),I=Object(l.a)(D,2),T=I[0],A=I[1];Object(a.useEffect)((function(){w.getAll().then((function(e){c(e)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(i,{addContact:function(e){e.preventDefault();var t={name:f,number:v},a=n.find((function(e){return e.name.toLowerCase()===f.toLowerCase()})),r=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?E(n,!0).forEach((function(t){Object(u.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):E(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},a,{number:v});a?window.confirm("NOTICE!\n ".concat(f," already exists.\n\n      Want to permanently overwrite the old number?"))&&w.update(a.id,r).then((function(e){c(n.map((function(t){return t.id!==e.id?t:e}))),A(!0),S("Number of '".concat(t.name,"' was updated!")),setTimeout((function(){S(null)}),6e3)})).catch((function(e){A(!1),S("".concat(t.name,"' has been deleted just before you tried to update it.\r\n              Maybe by some other user of the system.")),setTimeout((function(){S(null)}),8e3)})):w.create(t).then((function(e){c(n.concat(e.data)),A(!0),S("New contact ".concat(t.name," was succesfully saved!")),setTimeout((function(){S(null)}),5e3)})).catch((function(e){console.log("Palvelimen error olio: ",e.response.data),A(!1),S("Contact '".concat(t.name,"' was not added to the server due unexpected error.")),setTimeout((function(){S(null)}),6e3)})),p(""),O("")},newName:f,newNumber:v,handleNameInputChange:function(e){p(e.target.value)},handleNumberInputChange:function(e){O(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(y,{message:x,isPositive:T}),r.a.createElement(s,{search:C,handleSearchInputChange:function(e){k(e.target.value)}}),r.a.createElement(m,{persons:n,search:C,handleDeleteClick:function(e){var t=n.find((function(t){return t.id===e}));window.confirm("Removing contact ".concat(t.name,". Are you sure? "))&&w.remove(e).then((function(a){c(n.filter((function(t){return t.id!==e}))),200===a.status&&(A(!0),S("".concat(t.name," was deleted from the database.")),setTimeout((function(){S(null)}),6e3))})).catch((function(e){A(!1),console.log("Palvelimen palauttama error: ",e.response.data),S("".concat(t.name," may not have been deleted due unexpected error. Pls. check.")),setTimeout((function(){S(null)}),6e3),window.location.reload()}))}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[17,1,2]]]);
//# sourceMappingURL=main.c4fa6b7e.chunk.js.map