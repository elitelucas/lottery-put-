(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{139:function(e,t,a){"use strict";var n=a(141),r=a(2),c=a.n(r);Object(n.a)({},c.a,{ID:c.a.oneOfType([c.a.string,c.a.number]).isRequired,component:c.a.oneOfType([c.a.string,c.a.func]),date:c.a.oneOfType([c.a.instanceOf(Date),c.a.string])})},140:function(e,t,a){"use strict";var n=a(44),r=a(16),c=a(5),l=a.n(c),s=a(1),o=a.n(s),u=(a(139),{h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6","display-1":"h1","display-2":"h1","display-3":"h1","display-4":"h1",p:"p",lead:"p",blockquote:"blockquote"}),i=function(e){var t,a=e.tag,c=e.className,s=e.type,i=Object(r.a)(e,["tag","className","type"]),m=l()(Object(n.a)({},s,!!s),c);return t=a||(!a&&u[s]?u[s]:"p"),o.a.createElement(t,Object.assign({},i,{className:m}))};i.defaultProps={type:"p"},t.a=i},142:function(e,t,a){"use strict";var n=a(16),r=a(1),c=a.n(r),l=(a(139),a(20)),s=a(140),o=l.a.create("page"),u=function(e){var t=e.title,a=e.breadcrumbs,r=e.tag,l=e.className,u=e.children,i=Object(n.a)(e,["title","breadcrumbs","tag","className","children"]),m=o.b("px-3",l);return c.a.createElement(r,Object.assign({className:m},i),c.a.createElement("div",{className:o.e("header")},t&&"string"===typeof t?c.a.createElement(s.a,{type:"h4",className:o.e("title")},t):t,a&&a),u)};u.defaultProps={tag:"div",title:""},t.a=u},189:function(e,t,a){"use strict";a.r(t);var n=a(141),r=a(144),c=a.n(r),l=a(145),s=a(143),o=a(142),u=a(1),i=a.n(u),m=a(120),p=a(133),h=a(134),d=a(152),E=a(153),f=a(154),y=a(155),g=a(149),b=a(150),O=a(122),w=a(123),j=a(125),k=a(124),v=a(151),x=a(17),N=a(42),S=a(140),C=a(20).a.create("page");t.default=function(e){var t=Object(u.useState)([]),a=Object(s.a)(t,2),r=a[0],T=a[1],A=Object(u.useState)(!1),J=Object(s.a)(A,2),P=J[0],z=J[1],I=Object(u.useState)({money:0,userphone:""}),R=Object(s.a)(I,2),_=R[0],q=R[1],B=Object(u.useState)(1),D=Object(s.a)(B,2),G=D[0],M=D[1],F=Object(u.useState)(1),L=Object(s.a)(F,2),U=L[0],H=L[1],K=function(){var t=Object(l.a)(c.a.mark(function t(a){return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!window.confirm("Really remove reward?")){t.next=6;break}return t.next=3,fetch("/api/reward/"+a,{method:"DELETE",headers:{"content-type":"application/json",Authorization:JSON.parse(localStorage.getItem("auth")).userToken}});case 3:401==t.sent.status&&e.history.push("/login"),Q(G)();case 6:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),Q=function(t){return Object(l.a)(c.a.mark(function a(){var n,r;return c.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,fetch("/api/rewards/"+t,{method:"GET",headers:{"content-type":"application/json",Authorization:JSON.parse(localStorage.getItem("auth")).userToken}});case 2:return 401==(n=a.sent).status&&e.history.push("/login"),a.next=6,n.json();case 6:return r=a.sent,a.next=9,T(r.rewards);case 9:return a.next=11,M(parseInt(r.page));case 11:return a.next=13,H(r.last_page);case 13:case"end":return a.stop()}},a)}))};return Object(u.useEffect)(function(){Object(l.a)(c.a.mark(function t(){var a,n;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("/api/rewards/1",{method:"GET",headers:{"content-type":"application/json",Authorization:JSON.parse(localStorage.getItem("auth")).userToken}});case 2:return 401==(a=t.sent).status&&e.history.push("/login"),t.next=6,a.json();case 6:return n=t.sent,t.next=9,T(n.rewards);case 9:return t.next=11,H(n.last_page);case 11:case"end":return t.stop()}},t)}))()},[]),i.a.createElement(o.a,{title:i.a.createElement(i.a.Fragment,null,i.a.createElement(N.a,{to:"/my"},i.a.createElement(S.a,{type:"h4",className:C.e("title")},i.a.createElement(x.a,null)," Admin Rewards")),i.a.createElement(m.a,{color:"link",onClick:function(){return z(!0)},style:{padding:"20px"}},i.a.createElement(x.d,null))),className:"MyPage"},i.a.createElement(p.a,null,i.a.createElement(h.a,{md:12},r&&r.length>0?r.map(function(e,t){return i.a.createElement("div",{className:"form-control",key:t,style:{marginBottom:"0rem",height:"100px"}},i.a.createElement("span",null,"https://www.luckyweb.shop/api/reward/",e._id),i.a.createElement("br",null),i.a.createElement("span",null,"\u0e3f ",e.money," "),i.a.createElement("br",null),i.a.createElement("span",null,"Phone : ",e.userphone)," ","\xa0",i.a.createElement("span",null,"rewared by : ",e.createdBy?e.createdBy.phone:"")," ","\xa0",0==e.status?i.a.createElement(m.a,{size:"sm",color:"danger",onClick:function(){return K(e._id)}},i.a.createElement(x.A,null)):"")}):""),i.a.createElement(h.a,null,i.a.createElement(d.a,{size:"sm","aria-label":"Page navigation example"},G>1?i.a.createElement(E.a,null,i.a.createElement(f.a,{previous:!0,onClick:Q(1)})):"",G>1?i.a.createElement(E.a,null,i.a.createElement(f.a,{onClick:Q(G-1)},G-1)):"",i.a.createElement(E.a,{active:!0},i.a.createElement(f.a,{onClick:""},G)),G<U?i.a.createElement(E.a,null,i.a.createElement(f.a,{onClick:Q(G+1)},G+1)):"",G<U?i.a.createElement(E.a,null,i.a.createElement(f.a,{next:!0,onClick:Q(U)})):""))),i.a.createElement(p.a,null,i.a.createElement("div",{style:{height:"100px"}})),i.a.createElement(y.a,{isOpen:P,toggle:function(){return z(!P)}},i.a.createElement(g.a,{toggle:function(){return z(!P)}},"Add new Reward"),i.a.createElement(b.a,null,i.a.createElement(p.a,null,i.a.createElement(h.a,{md:12},i.a.createElement(O.a,null,i.a.createElement(w.a,null,i.a.createElement(j.a,{for:"money"},"Amount of Money"),i.a.createElement(k.a,{type:"number",id:"money",onChange:function(e){return q(Object(n.a)({},_,{money:e.target.value}))},className:"form-control",value:_.money})),i.a.createElement(w.a,null,i.a.createElement(j.a,{for:"userphone"},"User Phone"),i.a.createElement(k.a,{type:"text",id:"userphone",onChange:function(e){return q(Object(n.a)({},_,{userphone:e.target.value}))},className:"form-control",value:_.userphone})))))),i.a.createElement(v.a,null,i.a.createElement(m.a,{color:"primary",onClick:function(){""!=_.userphone&&""!=_.money?Object(l.a)(c.a.mark(function t(){return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("/api/reward",{method:"POST",headers:{"content-type":"application/json",Authorization:JSON.parse(localStorage.getItem("auth")).userToken},body:JSON.stringify(Object(n.a)({},_))});case 2:return 401==t.sent.status&&e.history.push("/login"),t.next=6,z(!1);case 6:return t.next=8,q({money:0,userphone:""});case 8:console.log(G),Q(G)();case 10:case"end":return t.stop()}},t)}))():(z(!1),q({money:0,userphone:""}))}},"Ok"),i.a.createElement(m.a,{color:"secondary",onClick:function(){return z(!P)}},"Close"))))}}}]);
//# sourceMappingURL=36.a81db980.chunk.js.map