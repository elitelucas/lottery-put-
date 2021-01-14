(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{139:function(e,a,t){"use strict";var n=t(141),r=t(2),l=t.n(r);Object(n.a)({},l.a,{ID:l.a.oneOfType([l.a.string,l.a.number]).isRequired,component:l.a.oneOfType([l.a.string,l.a.func]),date:l.a.oneOfType([l.a.instanceOf(Date),l.a.string])})},140:function(e,a,t){"use strict";var n=t(44),r=t(16),l=t(5),c=t.n(l),s=t(1),o=t.n(s),i=(t(139),{h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6","display-1":"h1","display-2":"h1","display-3":"h1","display-4":"h1",p:"p",lead:"p",blockquote:"blockquote"}),m=function(e){var a,t=e.tag,l=e.className,s=e.type,m=Object(r.a)(e,["tag","className","type"]),u=c()(Object(n.a)({},s,!!s),l);return a=t||(!t&&i[s]?i[s]:"p"),o.a.createElement(a,Object.assign({},m,{className:u}))};m.defaultProps={type:"p"},a.a=m},142:function(e,a,t){"use strict";var n=t(16),r=t(1),l=t.n(r),c=(t(139),t(20)),s=t(140),o=c.a.create("page"),i=function(e){var a=e.title,t=e.breadcrumbs,r=e.tag,c=e.className,i=e.children,m=Object(n.a)(e,["title","breadcrumbs","tag","className","children"]),u=o.b("px-3",c);return l.a.createElement(r,Object.assign({className:u},m),l.a.createElement("div",{className:o.e("header")},a&&"string"===typeof a?l.a.createElement(s.a,{type:"h4",className:o.e("title")},a):a,t&&t),i)};i.defaultProps={tag:"div",title:""},a.a=i},187:function(e,a,t){"use strict";t.r(a);var n=t(144),r=t.n(n),l=t(145),c=t(143),s=t(142),o=t(1),i=t.n(o),m=t(133),u=t(120),p=t(134),d=t(152),f=t(153),E=t(154),h=t(155),y=t(149),g=t(150),b=t(122),O=t(123),v=t(125),N=t(124),k=t(151),j=t(17),x=t(42),w=t(140),S=t(20).a.create("page");a.default=function(e){var a=Object(o.useState)(1),t=Object(c.a)(a,2),n=t[0],C=t[1],J=Object(o.useState)([]),I=Object(c.a)(J,2),T=I[0],P=I[1],_=Object(o.useState)(-1),q=Object(c.a)(_,2),z=q[0],A=q[1],D=Object(o.useState)(1),F=Object(c.a)(D,2),R=F[0],W=F[1],B=Object(o.useState)(1),G=Object(c.a)(B,2),M=G[0],H=G[1];return Object(o.useEffect)(function(){Object(l.a)(r.a.mark(function a(){var t,l;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,fetch("/api/complaints-admin/".concat(n,"/")+R,{method:"GET",headers:{"content-type":"application/json",Authorization:JSON.parse(localStorage.getItem("auth")).userToken}});case 2:if(401==(t=a.sent).status&&e.history.push("/login"),a.prev=4,!(t.status<400)){a.next=12;break}return a.next=8,t.json();case 8:l=a.sent,P(l.data),W(parseInt(l.page)),H(parseInt(l.last_page));case 12:a.next=16;break;case 14:a.prev=14,a.t0=a.catch(4);case 16:case"end":return a.stop()}},a,null,[[4,14]])}))()},[n,R]),i.a.createElement(s.a,{title:i.a.createElement(i.a.Fragment,null,i.a.createElement(x.a,{to:"/my"},i.a.createElement(w.a,{type:"h4",className:S.e("title")},i.a.createElement(j.a,null)," Admin Complaint"))),className:"MyPage"},i.a.createElement(m.a,{style:{flexFlow:"row wrap",justifyContent:"space-between"},className:"category-bar"},i.a.createElement(u.a,{className:1===n&&"btn-active",color:"link",onClick:function(){return C(1)}},"Completed"),i.a.createElement(u.a,{className:0===n&&"btn-active",color:"link",onClick:function(){return C(0)}},"Wait")),i.a.createElement(m.a,null,i.a.createElement(p.a,{md:12},T&&T.length>0?T.filter(function(e){return e.status===(1==n)}).map(function(e,a){return i.a.createElement(u.a,{tag:"a",className:"form-control",color:"link",onClick:(t=e._id,function(){A(T.findIndex(function(e){return e._id===t}))}),key:a,style:{marginBottom:"0rem"}},e.category,"-",e.period,i.a.createElement("span",{style:{float:"right"}},1==e.status&&0==e.view_status?i.a.createElement(j.o,{className:"text-danger"}):""));var t}):"")),i.a.createElement(m.a,null,i.a.createElement(p.a,{md:12},i.a.createElement(d.a,{size:"sm","aria-label":"Page navigation example"},R>1?i.a.createElement(f.a,null,i.a.createElement(E.a,{previous:!0,onClick:function(){return W(1)}})):"",R>1?i.a.createElement(f.a,null,i.a.createElement(E.a,{onClick:function(){return W(R-1)}},R-1)):"",i.a.createElement(f.a,{active:!0},i.a.createElement(E.a,null,R)),R<M?i.a.createElement(f.a,null,i.a.createElement(E.a,{onClick:function(){return W(R+1)}},R+1)):"",R<M?i.a.createElement(f.a,null,i.a.createElement(E.a,{next:!0,onClick:function(){return W(M)}})):""))),i.a.createElement(m.a,null,i.a.createElement("div",{style:{height:"60px"}})),i.a.createElement(h.a,{isOpen:-1!==z,toggle:function(){return A(-1)}},i.a.createElement(y.a,{toggle:function(){return A(-1)}},"Complaint & Suggestion"),z>-1&&T[z]?i.a.createElement(g.a,null,i.a.createElement(m.a,null,i.a.createElement(p.a,{md:12},i.a.createElement(b.a,null,i.a.createElement(O.a,null,i.a.createElement(v.a,{for:"exampleSelect1"},"category"),i.a.createElement(N.a,{type:"text",disabled:!0,id:"exampleSelect1",className:"form-control",value:T[z].category})),i.a.createElement(O.a,null,i.a.createElement(v.a,{for:"period1"},"Period ID"),i.a.createElement(N.a,{type:"text",disabled:!0,value:T[z].period,name:"period",id:"period1",className:"form-control"})),i.a.createElement(O.a,null,i.a.createElement(v.a,{for:"whatsapp1"},"Whatsapp Number"),i.a.createElement(N.a,{type:"text",disabled:!0,value:T[z].whatsapp,name:"whatsapp",id:"whatsapp1",className:"form-control"})),i.a.createElement(O.a,null,i.a.createElement(v.a,{for:"content1"},"Content"),i.a.createElement(N.a,{type:"textarea",disabled:!0,value:T[z].content,name:"content",id:"content1",className:"form-control"})),i.a.createElement(O.a,null,i.a.createElement(v.a,{for:"reply"},"Reply"),i.a.createElement(N.a,{disabled:T[z].status>0?"disabled":"",type:"textarea",value:T[z].reply,onChange:function(e){var a=JSON.parse(JSON.stringify(T));a[z].reply=e.target.value,P(a)},name:"reply",id:"reply",className:"form-control"})))))):"",i.a.createElement(k.a,null,i.a.createElement(u.a,{color:"primary",onClick:function(){return a=z,void Object(l.a)(r.a.mark(function t(){var n;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("/api/complaints-admin",{method:"POST",headers:{"content-type":"application/json",Authorization:JSON.parse(localStorage.getItem("auth")).userToken},body:JSON.stringify({id:T[a]._id,reply:T[a].reply})});case 2:401==t.sent.status&&e.history.push("/login"),(n=JSON.parse(JSON.stringify(T)))[a].status=!0,P(n),A(-1);case 8:case"end":return t.stop()}},t)}))();var a}},"Ok"),i.a.createElement(u.a,{color:"secondary",onClick:function(){return A(-1)}},"Close"))))}}}]);
//# sourceMappingURL=34.b965ad52.chunk.js.map