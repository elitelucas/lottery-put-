(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{111:function(e,t,a){"use strict";var r=a(113),n=a(2),s=a.n(n);Object(r.a)({},s.a,{ID:s.a.oneOfType([s.a.string,s.a.number]).isRequired,component:s.a.oneOfType([s.a.string,s.a.func]),date:s.a.oneOfType([s.a.instanceOf(Date),s.a.string])})},112:function(e,t,a){"use strict";var r=a(40),n=a(16),s=a(4),l=a.n(s),c=a(1),o=a.n(c),i=(a(111),{h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6","display-1":"h1","display-2":"h1","display-3":"h1","display-4":"h1",p:"p",lead:"p",blockquote:"blockquote"}),m=function(e){var t,a=e.tag,s=e.className,c=e.type,m=Object(n.a)(e,["tag","className","type"]),d=l()(Object(r.a)({},c,!!c),s);return t=a||(!a&&i[c]?i[c]:"p"),o.a.createElement(t,Object.assign({},m,{className:d}))};m.defaultProps={type:"p"},t.a=m},114:function(e,t,a){"use strict";var r=a(16),n=a(1),s=a.n(n),l=(a(111),a(18)),c=a(112),o=l.a.create("page"),i=function(e){var t=e.title,a=e.breadcrumbs,n=e.tag,l=e.className,i=e.children,m=Object(r.a)(e,["title","breadcrumbs","tag","className","children"]),d=o.b("px-3",l);return s.a.createElement(n,Object.assign({className:d},m),s.a.createElement("div",{className:o.e("header")},t&&"string"===typeof t?s.a.createElement(c.a,{type:"h4",className:o.e("title")},t):t,a&&a),i)};i.defaultProps={tag:"div",title:""},t.a=i},140:function(e,t,a){"use strict";a.r(t);var r,n=a(40),s=a(9),l=a(10),c=a(12),o=a(11),i=a(13),m=a(26),d=a(1),p=a.n(d),u=a(25),g=a(108),h=a(38),E=a(41),y=a(92),_=a(124),b=a(121),f=a(122),k=a(105),C=a(123),v=a(106),N=a(107),I=a(127),S=a(125),w=a(141),T=a(142),x=a(128),j=a(129),O=a(130),R=a(114),M=a(27),P=a.n(M),J=a(28),L=a(20),B=a(6),A=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(o.a)(t).call(this,e))).state={log_time:"",time:"",bet:[0,[0,0,0,0,0,0,0,0,0,0,0,0,0]],number:"",price:"",contract:"",modal:!1,level:0,redirectToLogin:!1,records:"",my_records:"",contract_no:"",records_page:1,last_records_page:1,records_my_page:1,last_records_my_page:1,pre_contract:10,reload:!1,readModal:!1,status:!0},a.onTimeDecrease=function(){clearTimeout(r),r=setTimeout(a.onTimeDecrease,1e3),a.setter.setState({time:a.state.time-1e3}),a.state.time<2e3&&a.state.time>0?fetch("/api/enjoy/"+a.state.level,{method:"GET",headers:{"content-type":"application/json",Authorization:JSON.parse(localStorage.getItem("auth")).userToken}}).then(function(e){e.status<400?e.json().then(function(e){e.time>15e4?a.setter.setState({log_time:e.log_time,bet:e.bet,price:e.price,records:e.records,my_records:e.my_records,number:e.number,contract:e.contract,time:18e4-parseInt(e.time),records_my_page:parseInt(e.records_my_page),last_records_my_page:parseInt(e.last_records_my_page),records_page:parseInt(e.records_page),last_records_page:parseInt(e.last_records_page)}):a.setter.setState({log_time:e.log_time,bet:e.bet,records:e.records,my_records:e.my_records,time:18e4-parseInt(e.time),records_my_page:parseInt(e.records_my_page),last_records_my_page:parseInt(e.last_records_my_page),records_page:parseInt(e.records_page),last_records_page:parseInt(e.last_records_page)})}):a.setter.setState({redirectToLogin:!0})}):a.state.time<0&&a.state.status&&(a.setter.setState({status:!1}),fetch("/api/enjoy/"+a.state.level,{method:"GET",headers:{"content-type":"application/json",Authorization:JSON.parse(localStorage.getItem("auth")).userToken}}).then(function(e){e.status<400?e.json().then(function(e){e.time>15e4||a.setter.setState({log_time:e.log_time,bet:e.bet,records:e.records,my_records:e.my_records,time:18e4-parseInt(e.time),records_my_page:parseInt(e.records_my_page),last_records_my_page:parseInt(e.last_records_my_page),records_page:parseInt(e.records_page),last_records_page:parseInt(e.last_records_page),status:!0}),a.notificationSystem.addNotification({title:p.a.createElement(L.z,null),message:p.a.createElement("div",null,"Parity :",p.a.createElement("br",null),"\xa0"," ","Result ",a.state.number[0],p.a.createElement("br",null),"\xa0"," ","Price: ",a.state.price[0],p.a.createElement("br",null),"\xa0"," ","Contract Money: ",a.state.contract[0],p.a.createElement("br",null),"Sapre:",p.a.createElement("br",null),"\xa0"," ","Result ",a.state.number[1],p.a.createElement("br",null),"\xa0"," ","Price: ",a.state.price[1],p.a.createElement("br",null),"\xa0"," ","Contract Money: ",a.state.contract[1],p.a.createElement("br",null),"Bcone :",p.a.createElement("br",null),"\xa0"," ","Result ",a.state.number[2],p.a.createElement("br",null),"\xa0"," ","Price: ",a.state.price[2],p.a.createElement("br",null),"\xa0"," ","Contract Money: ",a.state.contract[2],p.a.createElement("br",null),"Emerd:",p.a.createElement("br",null),"\xa0"," ","Result ",a.state.number[3],p.a.createElement("br",null),"\xa0"," ","Price: ",a.state.price[3],p.a.createElement("br",null),"\xa0"," ","Contract Money: ",a.state.contract[3]),level:"info"})}):a.setter.setState({redirectToLogin:!0})}))},a.onButtonClick=function(e){return function(){return a.setter.setState({contract_no:e,pre_contract:10}),a.toggle()()}},a.toggle=function(e){return function(){if(!e)return a.setter.setState({modal:!a.state.modal})}},a.toggleRead=function(e){return function(){if(!e)return a.setter.setState({readModal:!a.state.readModal})}},a.onContractChange=function(e){return function(){if("+"===e){if("9"===a.refs.contract.innerHTML)return;a.refs.contract.innerHTML=parseInt(a.refs.contract.innerHTML)+1}else{if("-"!==e)return void a.setter.setState({pre_contract:parseInt(a.refs.contract.innerHTML)*parseInt(e)});if("1"===a.refs.contract.innerHTML)return;a.refs.contract.innerHTML=parseInt(a.refs.contract.innerHTML)-1}a.state.pre_contract>=1e4?a.setter.setState({pre_contract:1e4*parseInt(a.refs.contract.innerHTML)}):a.state.pre_contract>=1e3?a.setter.setState({pre_contract:1e3*parseInt(a.refs.contract.innerHTML)}):a.state.pre_contract>=100?a.setter.setState({pre_contract:100*parseInt(a.refs.contract.innerHTML)}):a.state.pre_contract>=10&&a.setter.setState({pre_contract:10*parseInt(a.refs.contract.innerHTML)})}},a.onPostState=function(){fetch("/api/enjoy",{method:"POST",headers:{"content-type":"application/json",Authorization:JSON.parse(localStorage.getItem("auth")).userToken},body:JSON.stringify({guess:a.state.contract_no,contract_money:a.state.pre_contract,level:a.state.level})}).then(function(e){e.status<400?e.json().then(function(e){e.error?a.notificationSystem.addNotification({title:p.a.createElement(B.A,null),message:e.error,level:"info"}):a.setter.setState({bet:e.bet}),a.setter.setState({modal:!1})}):a.setter.setState({redirectToLogin:!0})})},a.onCategoryClick=function(e){return function(){a.setter.setState({level:e}),fetch("/api/enjoy/"+e,{method:"GET",headers:{"content-type":"application/json",Authorization:JSON.parse(localStorage.getItem("auth")).userToken}}).then(function(e){e.status<400?e.json().then(function(e){e.time,a.setter.setState({log_time:e.log_time,bet:e.bet,records:e.records,my_records:e.my_records,time:18e4-parseInt(e.time),modal:!1,records_my_page:parseInt(e.records_my_page),last_records_my_page:parseInt(e.last_records_my_page),records_page:parseInt(e.records_page),last_records_page:parseInt(e.last_records_page)}),clearTimeout(r),r=setTimeout(a.onTimeDecrease,1e3)}):a.setter.setState({redirectToLogin:!0})})}},a.gotoRecordsPage=function(e){return function(){fetch("/api/enjoy-page/"+a.state.level+"/"+e,{method:"GET",headers:{"content-type":"application/json",Authorization:JSON.parse(localStorage.getItem("auth")).userToken}}).then(function(e){e.status<400?e.json().then(function(e){a.setter.setState({records:e.records,modal:!1,records_page:parseInt(e.records_page),last_records_page:parseInt(e.last_records_page)})}):a.setter.setState({redirectToLogin:!0})})}},a.gotoMyRecordsPage=function(e){return function(){fetch("/api/enjoy-my-page/"+a.state.level+"/"+e,{method:"GET",headers:{"content-type":"application/json",Authorization:JSON.parse(localStorage.getItem("auth")).userToken}}).then(function(e){e.status<400?e.json().then(function(e){a.setter.setState({my_records:e.my_records,modal:!1,records_my_page:parseInt(e.records_my_page),last_records_my_page:parseInt(e.last_records_my_page)})}):a.setter.setState({redirectToLogin:!0})})}},a.onReload=function(){a.setter.setState({reload:!0}),fetch("/api/enjoy/"+a.state.level,{method:"GET",headers:{"content-type":"application/json",Authorization:JSON.parse(localStorage.getItem("auth")).userToken}}).then(function(e){e.status<400?(a.setter.setState({reload:!1}),e.json().then(function(e){clearTimeout(r),r=setTimeout(a.onTimeDecrease,1e3),e.time,a.setter.setState({log_time:e.log_time,bet:e.bet,records:e.records,my_records:e.my_records,time:18e4-parseInt(e.time),records_my_page:parseInt(e.records_my_page),last_records_my_page:parseInt(e.last_records_my_page),records_page:parseInt(e.records_page),last_records_page:parseInt(e.last_records_page)})})):a.setter.setState({redirectToLogin:!0})})},a.onRecharge=function(){a.props.history.push("/my/recharge")},a.setter=Object(E.a)(Object(m.a)(Object(m.a)(a))),console.log(e.location.state),a}return Object(i.a)(t,e),Object(l.a)(t,[{key:"componentWillUnmount",value:function(){var e=JSON.parse(localStorage.getItem("auth"));e.user.budget=this.state.bet[0],localStorage.setItem("auth",JSON.stringify(e)),this.setter.cancel(),clearTimeout(r)}},{key:"componentDidMount",value:function(){var e=this;fetch("/api/enjoy/"+this.state.level,{method:"GET",headers:{"content-type":"application/json",Authorization:JSON.parse(localStorage.getItem("auth")).userToken}}).then(function(t){t.status<400?t.json().then(function(t){clearTimeout(r),r=setTimeout(e.onTimeDecrease,1e3),t.time,e.setter.setState({log_time:t.log_time,bet:t.bet,records:t.records,my_records:t.my_records,time:18e4-parseInt(t.time),records_my_page:parseInt(t.records_my_page),last_records_my_page:parseInt(t.last_records_my_page),records_page:parseInt(t.records_page),last_records_page:parseInt(t.last_records_page)})}):e.setter.setState({redirectToLogin:!0})})}},{key:"render",value:function(){var e,t=this;return this.state.redirectToLogin?p.a.createElement(g.a,{to:"/login"}):(e=this.state.time<=3e4?"red":"black",!0===this.state.reload?p.a.createElement(u.a,null):p.a.createElement(R.a,{className:"EnjoyPage",title:"Available Balance : \u20b9"+this.state.bet[0],breadcrumbs:!0===JSON.parse(localStorage.getItem("auth")).user.admin&&!0===JSON.parse(localStorage.getItem("auth")).user.superAdmin?p.a.createElement("div",{style:{width:"100%"}},p.a.createElement(h.a,{color:"danger",className:"btn btn-danger",to:"/enjoy-admin"},"Admin"),p.a.createElement(h.a,{color:"link",className:"btn btn-primary",to:"/my/recharge"},"Recharge"),p.a.createElement(y.a,{color:"success",onClick:this.toggleRead()},"Read Rule"),p.a.createElement(y.a,{color:"link",onClick:this.onReload,style:{float:"right"}},p.a.createElement(L.w,null))):p.a.createElement("div",{style:{width:"100%"}},p.a.createElement(h.a,{className:"btn btn-primary",color:"link",to:"/my/recharge"},"Recharge"),p.a.createElement(y.a,{color:"success",onClick:this.toggleRead()},"Read Rule"),p.a.createElement(y.a,{color:"link",onClick:this.onReload,style:{float:"right"}},p.a.createElement(L.w,null)))},p.a.createElement(_.a,{isOpen:this.state.readModal,toggle:this.toggleRead(),className:this.props.className},p.a.createElement(b.a,{toggle:this.toggleRead()},"Rule"),p.a.createElement(f.a,null,p.a.createElement(k.a,{className:"read-rule"},p.a.createElement("div",{"data-v-0e33b46a":"",style:{padding:"8px;"}},"3 minutes 1 issue, 2 minutes and 30 seconds to order, 30 seconds to show the lottery result. It opens all day. The total number of trade is 480 issues"),p.a.createElement("div",{"data-v-0e33b46a":"",style:{padding:"8px;"}},"If you spend 100 to trade, after deducting 2 service fee, your contract amount is 98:"),p.a.createElement("div",{"data-v-0e33b46a":"",style:{padding:"8px;"}},"1. JOIN GREEN: if the result shows 1,3,7,9, you will get (98*2) 196"),p.a.createElement("div",{"data-v-0e33b46a":"",style:{padding:"8px;"}},"If the result shows 5, you will get (98*1.5) 147"),p.a.createElement("div",{"data-v-0e33b46a":"",style:{padding:"8px;"}},"2. JOIN RED: if the result shows 2,4,6,8, you will get (98*2) 196; If the result shows 0, you will get (98*1.5) 147"),p.a.createElement("div",{"data-v-0e33b46a":"",style:{padding:"8px;"}},"3. JOIN VIOLET: if the result shows 0 or 5, you will get (98*4.5) 441"),p.a.createElement("div",{"data-v-0e33b46a":"",style:{padding:"8px;"}},"4. SELECT NUMBER: if the result is the same as the number you selected, you will get (98*9) 882"))),p.a.createElement(C.a,null,p.a.createElement(y.a,{color:"secondary",onClick:this.toggleRead()},"Ok"))),p.a.createElement(k.a,{style:{flexFlow:"row wrap",justifyContent:"space-between"},className:"category-bar"},p.a.createElement(y.a,{className:0===this.state.level?"btn-active":"",color:"link",onClick:this.onCategoryClick(0)},"Parity"),p.a.createElement(y.a,{className:1===this.state.level?"btn-active":"",color:"link",onClick:this.onCategoryClick(1)},"Sapre"),p.a.createElement(y.a,{className:2===this.state.level?"btn-active":"",color:"link",onClick:this.onCategoryClick(2)},"Bcone"),p.a.createElement(y.a,{className:3===this.state.level?"btn-active":"",color:"link",onClick:this.onCategoryClick(3)},"Emerd")),p.a.createElement(k.a,null,p.a.createElement(v.a,{md:"12",sm:"12",xs:"12"},p.a.createElement(N.a,{className:"mb-3"},p.a.createElement(I.a,null,p.a.createElement("div",{className:"card-period"},p.a.createElement("span",null,"Period"),p.a.createElement("span",{style:{fontWeight:"bolder"}},this.state.log_time)),p.a.createElement("div",{className:"card-count"},p.a.createElement("span",null,"Count Down"),p.a.createElement("span",{style:{fontWeight:"bolder",color:e}},parseInt(this.state.time/1e3/60)+" : "+parseInt(this.state.time/1e3%60)))),this.state.time>=3e4?p.a.createElement(S.a,null,p.a.createElement(k.a,{style:{flexFlow:"row wrap",justifyContent:"space-between"}},p.a.createElement(y.a,{color:"success",onClick:this.onButtonClick(10)},p.a.createElement("span",null,"Join Green"),p.a.createElement("br",null),p.a.createElement("span",{style:{color:"gold"}},this.state.bet[1][10],"\u20b9")),p.a.createElement(y.a,{color:"primary",className:"btn-violet",onClick:this.onButtonClick(12)},p.a.createElement("span",null,"Join Violet"),p.a.createElement("br",null),p.a.createElement("span",{style:{color:"gold"}},this.state.bet[1][12],"\u20b9")),p.a.createElement(y.a,{color:"secondary",onClick:this.onButtonClick(11)},p.a.createElement("span",null,"Join Red"),p.a.createElement("br",null),p.a.createElement("span",{style:{color:"gold"}},this.state.bet[1][11],"\u20b9"))),p.a.createElement(k.a,{style:{flexFlow:"row wrap",justifyContent:"space-between"}},p.a.createElement(y.a,{onClick:this.onButtonClick(0),color:"success",style:Object(n.a)({border:"0px",background:"-webkit-gradient(linear,left top,right bottom,from(#fc5c7d),color-stop(50%,#fc5c7d),color-stop(51%,#9c27b0),to(#9c27b0))"},"background","linear-gradient(to bottom right,#fc5c7d 0,#fc5c7d 50%,#9c27b0 51%,#9c27b0)")}," 0 : ",p.a.createElement("span",{style:{color:"gold"}},this.state.bet[1][0],"\u20b9 ")),p.a.createElement(y.a,{onClick:this.onButtonClick(1),color:"success",style:{border:"0px"}}," 1 : ",p.a.createElement("span",{style:{color:"gold"}},this.state.bet[1][1],"\u20b9 ")),p.a.createElement(y.a,{onClick:this.onButtonClick(2),color:"secondary",style:{border:"0px"}}," 2 : ",p.a.createElement("span",{style:{color:"gold"}},this.state.bet[1][2],"\u20b9 ")),p.a.createElement(y.a,{onClick:this.onButtonClick(3),color:"success",style:{border:"0px"}}," 3 : ",p.a.createElement("span",{style:{color:"gold"}},this.state.bet[1][3],"\u20b9 ")),p.a.createElement(y.a,{onClick:this.onButtonClick(4),color:"secondary",style:{border:"0px"}}," 4 : ",p.a.createElement("span",{style:{color:"gold"}},this.state.bet[1][4],"\u20b9 "))),p.a.createElement(k.a,{style:{flexFlow:"row wrap",justifyContent:"space-between"}},p.a.createElement(y.a,{onClick:this.onButtonClick(5),color:"success",style:Object(n.a)({border:"0px",background:"-webkit-gradient(linear,left top,right bottom,from(#45b649),color-stop(50%,#45b649),color-stop(51%,#9c27b0),to(#9c27b0))"},"background","linear-gradient(to bottom right,#45b649 0,#45b649 50%,#9c27b0 51%,#9c27b0)")}," 5 : ",p.a.createElement("span",{style:{color:"gold"}},this.state.bet[1][5],"\u20b9 ")),p.a.createElement(y.a,{onClick:this.onButtonClick(6),color:"secondary",style:{border:"0px"}}," 6 : ",p.a.createElement("span",{style:{color:"gold"}},this.state.bet[1][6],"\u20b9 ")),p.a.createElement(y.a,{onClick:this.onButtonClick(7),color:"success",style:{border:"0px"}}," 7 : ",p.a.createElement("span",{style:{color:"gold"}},this.state.bet[1][7],"\u20b9 ")),p.a.createElement(y.a,{onClick:this.onButtonClick(8),color:"secondary",style:{border:"0px"}}," 8 : ",p.a.createElement("span",{style:{color:"gold"}},this.state.bet[1][8],"\u20b9 ")),p.a.createElement(y.a,{onClick:this.onButtonClick(9),color:"success",style:{border:"0px"}}," 9 : ",p.a.createElement("span",{style:{color:"gold"}},this.state.bet[1][9],"\u20b9 "))),p.a.createElement(_.a,{isOpen:this.state.modal,toggle:this.toggle(),className:this.props.className},p.a.createElement(b.a,{toggle:this.toggle()},'Contract Money on "',this.state.contract_no<10?this.state.contract_no:10===this.state.contract_no?p.a.createElement("span",null,"green"," ",p.a.createElement("span",{className:"green-circle"})):11===this.state.contract_no?p.a.createElement("span",null,"red"," ",p.a.createElement("span",{className:"red-circle"})):p.a.createElement("span",null,"violet"," ",p.a.createElement("span",{className:"violet-circle"})),'"'),p.a.createElement(f.a,null,p.a.createElement(k.a,null,p.a.createElement("span",{style:{padding:"6px 12px"}},"Contract Money :"),p.a.createElement("br",null),p.a.createElement(w.a,{className:" mb-3 ml-auto mr-auto"},p.a.createElement(y.a,{style:{fontWeight:"600"},color:"link",onClick:this.onContractChange("10"),className:this.state.pre_contract>9&&this.state.pre_contract<100?"btn-active":""},"10"),p.a.createElement(y.a,{style:{fontWeight:"600"},color:"link",onClick:this.onContractChange("100"),className:this.state.pre_contract>99&&this.state.pre_contract<1e3?"btn-active":""},"100"),p.a.createElement(y.a,{style:{fontWeight:"600"},color:"link",onClick:this.onContractChange("1000"),className:this.state.pre_contract>999&&this.state.pre_contract<1e4?"btn-active":""},"1000"),p.a.createElement(y.a,{style:{fontWeight:"600"},color:"link",onClick:this.onContractChange("10000"),className:this.state.pre_contract>9999&&this.state.pre_contract<1e5?"btn-active":""},"10000"))),p.a.createElement(k.a,null,p.a.createElement("span",{style:{padding:"10px 12px"}},"Number :"),p.a.createElement("br",null),p.a.createElement("div",null,p.a.createElement(y.a,{color:"link",style:{fontSize:"1.5rem"},onClick:this.onContractChange("-")}," - "),p.a.createElement("span",{style:{padding:"6px 12px"},ref:"contract"},"1"),p.a.createElement(y.a,{color:"link",style:{fontSize:"1.5rem"},onClick:this.onContractChange("+")}," + "))),p.a.createElement(k.a,null,p.a.createElement("span",{style:{padding:"0 12px"}},"Total contract money is \xa0"),p.a.createElement("span",{style:{fontWeight:"600"},className:"text-success"}," ",this.state.pre_contract)),p.a.createElement(k.a,null)),p.a.createElement(C.a,null,p.a.createElement(y.a,{color:"primary",onClick:this.onPostState},"OK")," ",p.a.createElement(y.a,{color:"secondary",onClick:this.toggle()},"Cancel")))):p.a.createElement(S.a,null,p.a.createElement(k.a,{style:{flexFlow:"row wrap",justifyContent:"space-between"}},p.a.createElement(y.a,{color:"error"},"Join Green"),p.a.createElement(y.a,{color:"error"},"Join Violet"),p.a.createElement(y.a,{color:"error"},"Join Red")),p.a.createElement(k.a,{style:{flexFlow:"row wrap",justifyContent:"space-between"}},p.a.createElement(y.a,{color:"error",style:{border:"0px"}}," 0 "),p.a.createElement(y.a,{color:"error",style:{border:"0px"}}," 1 "),p.a.createElement(y.a,{color:"error",style:{border:"0px"}}," 2 "),p.a.createElement(y.a,{color:"error",style:{border:"0px"}}," 3 "),p.a.createElement(y.a,{color:"error",style:{border:"0px"}}," 4 ")),p.a.createElement(k.a,{style:{flexFlow:"row wrap",justifyContent:"space-between"}},p.a.createElement(y.a,{color:"error",style:{border:"0px"}}," 5 "),p.a.createElement(y.a,{color:"error",style:{border:"0px"}}," 6 "),p.a.createElement(y.a,{color:"error",style:{border:"0px"}}," 7 "),p.a.createElement(y.a,{color:"error",style:{border:"0px"}}," 8 "),p.a.createElement(y.a,{color:"error",style:{border:"0px"}}," 9 ")),p.a.createElement(k.a,null,this.state.bet[1].map(function(e,a){return 10===a?p.a.createElement("div",{className:"contract-line",key:a},p.a.createElement("span",{className:"green-circle"}),"\xa0 :\xa0\xa0",t.state.bet[1][10]):12===a?p.a.createElement("div",{className:"contract-line",key:a},p.a.createElement("span",{className:"violet-circle"}),"\xa0:\xa0\xa0",t.state.bet[1][12]):11===a?p.a.createElement("div",{className:"contract-line",key:a},p.a.createElement("span",{className:"red-circle"}),"\xa0:\xa0\xa0",t.state.bet[1][11]):p.a.createElement("div",{className:"contract-line",key:a},p.a.createElement("span",null,a),"\xa0:\xa0\xa0",t.state.bet[1][a])}))))),p.a.createElement(v.a,{md:"6",sm:"12",xs:"12"},p.a.createElement(N.a,{className:"mb-3"},p.a.createElement(I.a,null,"Game Record"),p.a.createElement(S.a,{style:{padding:"0 15px"}},p.a.createElement(k.a,{style:{flexFlow:"row wrap",justifyContent:"space-between",overflow:"scroll"}},p.a.createElement(T.a,Object.assign({default:!0},{style:{width:"100%"}}),p.a.createElement("thead",null,p.a.createElement("tr",null,p.a.createElement("th",null,"Period"),p.a.createElement("th",null,"Price"),p.a.createElement("th",null,"Number"),p.a.createElement("th",null,"Result"))),p.a.createElement("tbody",null,this.state.records?this.state.records.map(function(e,t){return p.a.createElement("tr",{key:t},p.a.createElement("td",null,e.createdAt),p.a.createElement("td",null,e.price),p.a.createElement("td",null,e.recommend),p.a.createElement("td",null,parseInt(e.recommend)%2===1?p.a.createElement("span",{className:"green-circle"}):p.a.createElement("span",{className:"red-circle"})," ",parseInt(e.recommend)%5===0?p.a.createElement("span",{className:"violet-circle"}):""))}):""))),p.a.createElement(k.a,null,p.a.createElement(x.a,{size:"sm","aria-label":"Page navigation example"},this.state.records_page>1?p.a.createElement(j.a,null,p.a.createElement(O.a,{previous:!0,onClick:this.gotoRecordsPage(1)})):"",this.state.records_page>1?p.a.createElement(j.a,null,p.a.createElement(O.a,{onClick:this.gotoRecordsPage(this.state.records_page-1)},parseInt(this.state.records_page)-1)):"",p.a.createElement(j.a,{active:!0},p.a.createElement(O.a,null,this.state.records_page)),this.state.records_page<this.state.last_records_page?p.a.createElement(j.a,null,p.a.createElement(O.a,{onClick:this.gotoRecordsPage(this.state.records_page+1)},this.state.records_page+1)):"",this.state.records_page<this.state.last_records_page?p.a.createElement(j.a,null,p.a.createElement(O.a,{next:!0,onClick:this.gotoRecordsPage(this.state.last_records_page)})):""))))),p.a.createElement(v.a,{md:"6",sm:"12",xs:"12"},p.a.createElement(N.a,{className:"mb-3"},p.a.createElement(I.a,null,"My Record"),p.a.createElement(S.a,{style:{padding:"0 15px"}},p.a.createElement(k.a,{style:{flexFlow:"row wrap",justifyContent:"space-between",overflow:"scroll"}},p.a.createElement(T.a,{default:!0},p.a.createElement("thead",null,p.a.createElement("tr",null,p.a.createElement("th",null,"Period"),p.a.createElement("th",null,"Contract money"),p.a.createElement("th",null,"Select"),p.a.createElement("th",null,"Result"),p.a.createElement("th",null,"Amount"))),p.a.createElement("tbody",null,this.state.my_records?this.state.my_records.map(function(e,t){return p.a.createElement("tr",{key:t},p.a.createElement("td",null,e.period),p.a.createElement("td",null,e.contract),p.a.createElement("td",null,10===e.select?p.a.createElement("span",{className:"green-circle"}):11===e.select?p.a.createElement("span",{className:"red-circle"}):12===e.select?p.a.createElement("span",{className:"violet-circle"}):e.select),p.a.createElement("td",null,e.result," "," ",parseInt(e.result)%2===1?p.a.createElement("span",{className:"green-circle"}):p.a.createElement("span",{className:"red-circle"})," ",parseInt(e.result)%5===0?p.a.createElement("span",{className:"violet-circle"}):""),p.a.createElement("td",null,e.amount))}):""))),p.a.createElement(k.a,null,p.a.createElement(x.a,{size:"sm","aria-label":"Page navigation example"},this.state.records_my_page>1?p.a.createElement(j.a,null,p.a.createElement(O.a,{previous:!0,onClick:this.gotoMyRecordsPage(1)})):"",this.state.records_my_page>1?p.a.createElement(j.a,null,p.a.createElement(O.a,{onClick:this.gotoMyRecordsPage(this.state.records_my_page-1)},this.state.records_my_page-1)):"",p.a.createElement(j.a,{active:!0},p.a.createElement(O.a,null,this.state.records_my_page)),this.state.records_my_page<this.state.last_records_my_page?p.a.createElement(j.a,null,p.a.createElement(O.a,{onClick:this.gotoMyRecordsPage(this.state.records_my_page+1)},this.state.records_my_page+1)):"",this.state.records_my_page<this.state.last_records_my_page?p.a.createElement(j.a,null,p.a.createElement(O.a,{next:!0,onClick:this.gotoMyRecordsPage(this.state.last_records_my_page)})):"")))))),p.a.createElement(k.a,null,p.a.createElement("div",{style:{height:"60px"}})),p.a.createElement(P.a,{dismissible:!1,ref:function(e){return t.notificationSystem=e},style:J.a})))}}]),t}(p.a.Component);t.default=A}}]);
//# sourceMappingURL=43.d5ef50e4.chunk.js.map