(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{139:function(e,a,t){"use strict";var n=t(141),s=t(2),r=t.n(s);Object(n.a)({},r.a,{ID:r.a.oneOfType([r.a.string,r.a.number]).isRequired,component:r.a.oneOfType([r.a.string,r.a.func]),date:r.a.oneOfType([r.a.instanceOf(Date),r.a.string])})},140:function(e,a,t){"use strict";var n=t(44),s=t(16),r=t(5),c=t.n(r),o=t(1),l=t.n(o),i=(t(139),{h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6","display-1":"h1","display-2":"h1","display-3":"h1","display-4":"h1",p:"p",lead:"p",blockquote:"blockquote"}),u=function(e){var a,t=e.tag,r=e.className,o=e.type,u=Object(s.a)(e,["tag","className","type"]),p=c()(Object(n.a)({},o,!!o),r);return a=t||(!t&&i[o]?i[o]:"p"),l.a.createElement(a,Object.assign({},u,{className:p}))};u.defaultProps={type:"p"},a.a=u},141:function(e,a,t){"use strict";t.d(a,"a",function(){return s});var n=t(44);function s(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{},s=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(s=s.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.forEach(function(a){Object(n.a)(e,a,t[a])})}return e}},142:function(e,a,t){"use strict";var n=t(16),s=t(1),r=t.n(s),c=(t(139),t(20)),o=t(140),l=c.a.create("page"),i=function(e){var a=e.title,t=e.breadcrumbs,s=e.tag,c=e.className,i=e.children,u=Object(n.a)(e,["title","breadcrumbs","tag","className","children"]),p=l.b("px-3",c);return r.a.createElement(s,Object.assign({className:p},u),r.a.createElement("div",{className:l.e("header")},a&&"string"===typeof a?r.a.createElement(o.a,{type:"h4",className:l.e("title")},a):a,t&&t),i)};i.defaultProps={tag:"div",title:""},a.a=i},143:function(e,a,t){"use strict";function n(e,a){return function(e){if(Array.isArray(e))return e}(e)||function(e,a){var t=[],n=!0,s=!1,r=void 0;try{for(var c,o=e[Symbol.iterator]();!(n=(c=o.next()).done)&&(t.push(c.value),!a||t.length!==a);n=!0);}catch(l){s=!0,r=l}finally{try{n||null==o.return||o.return()}finally{if(s)throw r}}return t}(e,a)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}t.d(a,"a",function(){return n})},148:function(e,a,t){"use strict";var n=t(6),s=t(7),r=t(31),c=t(1),o=t.n(c),l=t(2),i=t.n(l),u=t(5),p=t.n(u),f=t(32),m=t(3),d=Object(r.a)({},f.Transition.propTypes,{children:i.a.oneOfType([i.a.arrayOf(i.a.node),i.a.node]),tag:m.n,baseClass:i.a.string,baseClassActive:i.a.string,className:i.a.string,cssModule:i.a.object,innerRef:i.a.oneOfType([i.a.object,i.a.string,i.a.func])}),g=Object(r.a)({},f.Transition.defaultProps,{tag:"div",baseClass:"fade",baseClassActive:"show",timeout:m.c.Fade,appear:!0,enter:!0,exit:!0,in:!0});function b(e){var a=e.tag,t=e.baseClass,r=e.baseClassActive,c=e.className,l=e.cssModule,i=e.children,u=e.innerRef,d=Object(s.a)(e,["tag","baseClass","baseClassActive","className","cssModule","children","innerRef"]),g=Object(m.l)(d,m.a),b=Object(m.k)(d,m.a);return o.a.createElement(f.Transition,g,function(e){var s="entered"===e,f=Object(m.j)(p()(c,t,s&&r),l);return o.a.createElement(a,Object(n.a)({className:f},b,{ref:u}),i)})}b.propTypes=d,b.defaultProps=g,a.a=b},156:function(e,a,t){"use strict";var n=t(6),s=t(7),r=t(1),c=t.n(r),o=t(2),l=t.n(o),i=t(5),u=t.n(i),p=t(3),f={tag:p.n,className:l.a.string,cssModule:l.a.object,innerRef:l.a.oneOfType([l.a.object,l.a.string,l.a.func])},m=function(e){var a=e.className,t=e.cssModule,r=e.innerRef,o=e.tag,l=Object(s.a)(e,["className","cssModule","innerRef","tag"]),i=Object(p.j)(u()(a,"card-body"),t);return c.a.createElement(o,Object(n.a)({},l,{className:i,ref:r}))};m.propTypes=f,m.defaultProps={tag:"div"},a.a=m},158:function(e,a,t){"use strict";var n=t(6),s=t(7),r=t(1),c=t.n(r),o=t(2),l=t.n(o),i=t(5),u=t.n(i),p=t(3),f={tag:p.n,className:l.a.string,cssModule:l.a.object},m=function(e){var a=e.className,t=e.cssModule,r=e.tag,o=Object(s.a)(e,["className","cssModule","tag"]),l=Object(p.j)(u()(a,"card-header"),t);return c.a.createElement(r,Object(n.a)({},o,{className:l}))};m.propTypes=f,m.defaultProps={tag:"div"},a.a=m},205:function(e,a,t){"use strict";t.r(a);var n=t(143),s=t(142),r=t(1),c=t.n(r),o=t(133),l=t(134),i=t(135),u=t(158),p=t(156),f=t(6),m=t(18),d=t(8),g=t(7),b=t(31),h=t(2),O=t.n(h),y=t(5),j=t.n(y),v=t(3),E=t(148),N={children:O.a.node,className:O.a.string,closeClassName:O.a.string,closeAriaLabel:O.a.string,cssModule:O.a.object,color:O.a.string,fade:O.a.bool,isOpen:O.a.bool,toggle:O.a.func,tag:v.n,transition:O.a.shape(E.a.propTypes),innerRef:O.a.oneOfType([O.a.object,O.a.string,O.a.func])},C={color:"success",isOpen:!0,tag:"div",closeAriaLabel:"Close",fade:!0,transition:Object(b.a)({},E.a.defaultProps,{unmountOnExit:!0})};function w(e){var a=e.className,t=e.closeClassName,n=e.closeAriaLabel,s=e.cssModule,r=e.tag,o=e.color,l=e.isOpen,i=e.toggle,u=e.children,p=e.transition,m=e.fade,d=e.innerRef,h=Object(g.a)(e,["className","closeClassName","closeAriaLabel","cssModule","tag","color","isOpen","toggle","children","transition","fade","innerRef"]),O=Object(v.j)(j()(a,"alert","alert-"+o,{"alert-dismissible":i}),s),y=Object(v.j)(j()("close",t),s),N=Object(b.a)({},E.a.defaultProps,p,{baseClass:m?p.baseClass:"",timeout:m?p.timeout:0});return c.a.createElement(E.a,Object(f.a)({},h,N,{tag:r,className:O,in:l,role:"alert",innerRef:d}),i?c.a.createElement("button",{type:"button",className:y,"aria-label":n,onClick:i},c.a.createElement("span",{"aria-hidden":"true"},"\xd7")):null,u)}w.propTypes=N,w.defaultProps=C;var T=w,P=function(e){function a(a){var t;return(t=e.call(this,a)||this).state={isOpen:!0},t.toggle=t.toggle.bind(Object(d.a)(Object(d.a)(t))),t}Object(m.a)(a,e);var t=a.prototype;return t.toggle=function(){this.setState({isOpen:!this.state.isOpen})},t.render=function(){return c.a.createElement(T,Object(f.a)({isOpen:this.state.isOpen,toggle:this.toggle},this.props))},a}(r.Component),S=t(122),k=t(123),A=t(124),M=t(120),R=t(125),x=t(17),J=t(42),I=t(140),L=t(20).a.create("page");a.default=function(e){var a=Object(r.useState)(""),t=Object(n.a)(a,2),f=t[0],m=t[1],d=Object(r.useState)(""),g=Object(n.a)(d,2),b=g[0],h=g[1],O=Object(r.useState)(""),y=Object(n.a)(O,2),j=y[0],v=y[1],E=Object(r.useState)({state:0,message:""}),N=Object(n.a)(E,2),C=N[0],w=N[1],T=Object(r.useState)({state:0,message:""}),q=Object(n.a)(T,1)[0];return c.a.createElement(s.a,{title:c.a.createElement(J.a,{to:"/my"},c.a.createElement(I.a,{type:"h4",className:L.e("title")},c.a.createElement(x.a,null)," Account")),className:"MyPage"},c.a.createElement(o.a,null,c.a.createElement(l.a,{xl:12,lg:12,md:12},c.a.createElement(i.a,null,c.a.createElement(u.a,null,"Change Password"),c.a.createElement(p.a,null,1==q.state?c.a.createElement(P,{color:"success"},q.message):2==q.state?c.a.createElement(P,{color:"danger"},q.message):"",c.a.createElement(S.a,null,c.a.createElement(k.a,null,c.a.createElement(A.a,{type:"text",name:"phone",value:b,onChange:function(e){h(e.target.value)},placeholder:"Phone Number",style:{display:"inline-block",width:"70%"}}),c.a.createElement(M.a,{color:"success",onClick:function(){fetch("/api/phoneChange",{method:"POST",headers:{"content-type":"application/json",Authorization:JSON.parse(localStorage.getItem("auth")).userToken},body:JSON.stringify({phone:b})}).then(function(a){a.status<400?a.json().then(function(){w({state:1,message:"Please type verification code"})}):401==a.status?e.history.push("/login"):a.json().then(function(e){w({state:2,message:e.error})})})}},"OTP"),1==C.state?c.a.createElement(P,{color:"success"},C.message):2==C.state?c.a.createElement(P,{color:"danger"},C.message):""),c.a.createElement(k.a,null,c.a.createElement(R.a,{for:"verify"}," Verification Code"),c.a.createElement(A.a,{type:"text",name:"verify",value:j,onChange:function(e){v(e.target.value)},placeholder:"Verification Code"})),c.a.createElement(k.a,null,c.a.createElement(R.a,{for:"examplePassword"},"Password"),c.a.createElement(A.a,{type:"password",name:"password",value:f,onChange:function(e){m(e.target.value)},placeholder:"password"})),c.a.createElement(M.a,{onClick:function(){1===C.state&&fetch("/api/change-password",{method:"POST",headers:{"content-type":"application/json",Authorization:JSON.parse(localStorage.getItem("auth")).userToken},body:JSON.stringify({password:f,phone:b,otp:j})}).then(function(a){a.status<400?a.json().then(function(a){localStorage.setItem("auth",JSON.stringify(a)),e.history.push("/")}):401==a.status?e.history.push("/login"):a.json().then(function(e){w({state:2,message:e.error})})})},color:"primary"}," ok")))))))}}}]);
//# sourceMappingURL=17.f84dd0db.chunk.js.map