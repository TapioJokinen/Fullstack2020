(this["webpackJsonppuhelinluettelo-app"]=this["webpackJsonppuhelinluettelo-app"]||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),u=t.n(a),c=t(13),r=t.n(c),l=t(2),o=t(3),i=t.n(o),m="/api/persons",s=function(){return i.a.get(m).then((function(e){return e.data}))},f=function(e){return i.a.post(m,e).then((function(e){return e.data}))},d=function(e,n){return console.log(n),i.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},b=function(e){return i.a.delete("".concat(m,"/").concat(e)).then((function(e){return console.log(e)}))},h=(t(36),function(e){return u.a.createElement("div",null,"filter shown with: ",u.a.createElement("input",{value:e.filter,onChange:e.filterHandler}))}),p=function(e){var n=e.name,t=e.number,a=e.nameHandler,c=e.numberHandler,r=e.addNew;return u.a.createElement("div",null,u.a.createElement("form",null,u.a.createElement("div",null,"name: ",u.a.createElement("input",{value:n,onChange:a}),u.a.createElement("br",null),"number: ",u.a.createElement("input",{value:t,onChange:c})),u.a.createElement("div",null,u.a.createElement("button",{onClick:r,type:"submit"},"add"))))},E=function(e){var n=e.people,t=e.deletePerson;return u.a.createElement("div",null,n.map((function(e,n){return u.a.createElement("li",{key:n},e.name," ",e.number,u.a.createElement("button",{onClick:function(){return t(e.id)}},"delete"))})))},v=function(e){var n=e.message;return null===n?null:u.a.createElement("div",{className:"error"},n)},g=function(e){var n=e.message;return null===n?null:u.a.createElement("div",{className:"success"},n)},w=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],c=n[1],r=Object(a.useState)(""),o=Object(l.a)(r,2),i=o[0],m=o[1],w=Object(a.useState)(""),j=Object(l.a)(w,2),O=j[0],y=j[1],k=Object(a.useState)(""),N=Object(l.a)(k,2),S=N[0],C=N[1],H=Object(a.useState)(null),P=Object(l.a)(H,2),D=P[0],J=P[1],T=Object(a.useState)(null),x=Object(l.a)(T,2),A=x[0],B=x[1],I=function(){s().then((function(e){c(e)}))};Object(a.useEffect)(I,[]);var L=function(e){B(e),setTimeout((function(){B(null)}),2e3)},M=function(e){J(e),setTimeout((function(){J(null)}),2e3)},W=""===S?t:t.filter((function(e){return e.name.toLowerCase().includes(S)}));return u.a.createElement("div",null,u.a.createElement(v,{message:D}),u.a.createElement(g,{message:A}),u.a.createElement("h2",null,"Phonebook"),u.a.createElement(h,{value:S,filterHandler:function(e){C(e.target.value)}}),u.a.createElement("h1",null,"Add new"),u.a.createElement(p,{name:i,number:O,nameHandler:function(e){m(e.target.value)},numberHandler:function(e){y(e.target.value)},addNew:function(e){e.preventDefault();var n=!0,a={name:i,number:O,id:0};if(""===a.name||""===a.number)M("Name or number was empty");else if(a.name.length<3||a.number.length<8)M("Name or number was too short");else if(t.forEach((function(e){e.name===a.name&&(n=!1,a.id=e.id)})),n)c(t.concat(a)),f(a).then((function(e){return I()})).then((function(e){L("".concat(a.name," added successfully!"))})).catch((function(e){console.log(e)}));else{var u="".concat(a.name," was already added to phonebook. Would you like to replace it?");window.confirm(u)&&d(a.id,a).then((function(e){I(),L("".concat(a.name," updated successfully!"))})).catch((function(e){M("Person ".concat(a.name," is already removed from database.")),I()}))}}}),u.a.createElement("h2",null,"Numbers"),u.a.createElement("ul",null,u.a.createElement(E,{people:W,deletePerson:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete person ".concat(n.name))&&b(e).then((function(e){return I()})).then((function(e){L("".concat(n.name," deleted successfully!"))})).catch((function(e){M("Person ".concat(n.name," is already removed from database.")),I()}))}})))};r.a.render(u.a.createElement(u.a.StrictMode,null,u.a.createElement(w,null)),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.40fbb2a7.chunk.js.map