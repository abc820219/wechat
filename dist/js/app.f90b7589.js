(function(e){function t(t){for(var o,a,i=t[0],u=t[1],c=t[2],l=0,p=[];l<i.length;l++)a=i[l],Object.prototype.hasOwnProperty.call(s,a)&&s[a]&&p.push(s[a][0]),s[a]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(e[o]=u[o]);m&&m(t);while(p.length)p.shift()();return r.push.apply(r,c||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],o=!0,a=1;a<n.length;a++){var u=n[a];0!==s[u]&&(o=!1)}o&&(r.splice(t--,1),e=i(i.s=n[0]))}return e}var o={},s={app:0},r=[];function a(e){return i.p+"js/"+({about:"about"}[e]||e)+"."+{about:"b5cf906c"}[e]+".js"}function i(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n=s[e];if(0!==n)if(n)t.push(n[2]);else{var o=new Promise((function(t,o){n=s[e]=[t,o]}));t.push(n[2]=o);var r,u=document.createElement("script");u.charset="utf-8",u.timeout=120,i.nc&&u.setAttribute("nonce",i.nc),u.src=a(e);var c=new Error;r=function(t){u.onerror=u.onload=null,clearTimeout(l);var n=s[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;c.message="Loading chunk "+e+" failed.\n("+o+": "+r+")",c.name="ChunkLoadError",c.type=o,c.request=r,n[1](c)}s[e]=void 0}};var l=setTimeout((function(){r({type:"timeout",target:u})}),12e4);u.onerror=u.onload=r,document.head.appendChild(u)}return Promise.all(t)},i.m=e,i.c=o,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],c=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var m=c;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"21bb":function(e,t,n){"use strict";n("2dad")},"2dad":function(e,t,n){},"52d6":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"black",attrs:{id:"app"}},[n("router-view")],1)},r=[],a=(n("5c0b"),n("2877")),i={},u=Object(a["a"])(i,s,r,!1,null,null,null),c=u.exports,l=(n("d3b7"),n("3ca3"),n("ddb0"),n("8c4f")),m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("b-navbar",{attrs:{toggleable:"lg",type:"light",variant:"primary"}},[n("b-navbar-brand",{attrs:{href:"#"}},[e._v("WeChat")]),n("b-navbar-toggle",{attrs:{target:"nav-collapse"}}),n("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[n("b-navbar-nav",[n("b-nav-item",[e._v("在線人數:"+e._s(e.users.length)+"人")]),n("b-nav-item",[e._v("位置:"+e._s(e.user.room?e.user.room:"大廳"))])],1),n("b-navbar-nav",{staticClass:"ml-auto"},[n("b-form-select",{attrs:{options:e.options,size:"sm"},model:{value:e.room,callback:function(t){e.room=t},expression:"room"}}),n("b-nav-item-dropdown",{attrs:{right:""},scopedSlots:e._u([{key:"button-content",fn:function(){return[n("em",[e._v("使用者:"+e._s(e.user.name))])]},proxy:!0}])},[n("b-dropdown-item",{on:{click:e.leaveHandler}},[e._v("Sign Out")])],1)],1)],1)],1),n("main",[n("div",{staticClass:"mr-1"},[n("b-list-group",{ref:"contentArea",staticClass:"contentArea"},e._l(e.listContent,(function(t,o){return n("b-list-group-item",{key:o},[e._v(e._s(t))])})),1),n("b-form-textarea",{staticClass:"txtarea",attrs:{id:"textarea",placeholder:"Enter something...",rows:"3"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.messageHandler(t)}},model:{value:e.message,callback:function(t){e.message="string"===typeof t?t.trim():t},expression:"message"}})],1),n("div",[n("b-list-group",{staticClass:"mb-3"},[n("b-list-group-item",[e._v("在此房間人員")]),e._l(e.usersname,(function(t,o){return n("b-list-group-item",{key:o},[e._v(e._s(t))])}))],2),n("b-list-group",e._l(e.playersComeLeaveMessage,(function(t,o){return n("b-list-group-item",{key:o},[e._v(e._s(t))])})),1)],1)])],1)},p=[],f=n("2909"),d=(n("b0c0"),n("99af"),n("d81d"),n("4de4"),{name:"Home",data:function(){return{message:"",room:"",leaveList:[],comeList:[],listContent:[],options:[{value:"",text:"大廳"},{value:"a",text:"a"},{value:"b",text:"b"}]}},watch:{listContent:function(){var e=this;this.$nextTick((function(){e.$refs.contentArea.scrollTop=e.$refs.contentArea.scrollHeight}))},room:function(e,t){var n=this,o=JSON.stringify({type:"changeOut",name:n.user.name,message:"".concat(n.user.name,"離開").concat(t?t+"房間":"大廳"),room:t});window.socket.send(o),o=JSON.stringify({type:"changeIn",name:n.user.name,message:n.user.name+"進入"+n.room+"房間 ",room:e}),window.socket.send(o),this.listContent=[],this.comeList=[],this.leaveList=[],this.$store.commit("M_USER",{room:e})}},computed:{playersComeLeaveMessage:function(){return[].concat(Object(f["a"])(this.comeList),Object(f["a"])(this.leaveList))},users:function(){return this.$store.state.users},usersname:function(){var e=this;return this.$store.state.users.filter((function(t){return t.room==e.user.room})).map((function(e){return e.name}))},user:function(){return this.$store.state.user}},mounted:function(){var e=this;this.user.name||this.$router.push("/"),window.socket=new WebSocket("ws://websockewechat.herokuapp.com/","protocol1"),window.socket.addEventListener("open",(function(){var t=JSON.stringify({type:"come",name:e.user.name,message:e.user.name+"進入大廳",room:""});window.socket.send(t)})),window.socket.addEventListener("message",(function(t){var n=JSON.parse(t.data);console.log(n),"message"==n.type&&e.listContent.push(n.message),"come"==n.type&&e.comeList.push(n.message),"changeIn"==n.type&&e.comeList.push(n.message),"changeOut"==n.type&&e.leaveList.push(n.message),"leave"==n.type&&e.leaveList.push(n.message),n.length&&e.$store.commit("M_USERS",n)}))},methods:{leaveHandler:function(){window.socket.close(),this.$router.push("/")},messageHandler:function(){if(this.message){var e=this,t={type:"message",name:e.user.name,message:e.user.name+":"+e.message,room:e.user.room};e.$store.commit("M_USER",t),e.listContent.push("我:"+e.message),window.socket.send(JSON.stringify(e.user)),this.message=""}else this.message=""}},destroyed:function(){window.socket.close()}}),v=d,h=(n("21bb"),Object(a["a"])(v,m,p,!1,null,null,null)),b=h.exports,g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"login"},[n("div",{staticClass:"login-box"},[n("b-form",{attrs:{inline:""}},[n("label",{staticClass:"mr-2",attrs:{for:"inline-form-input-name"}},[e._v(" 輸入暱稱: ")]),n("b-form-input",{staticClass:"mb-2 mr-sm-2 mt-xs-2",attrs:{id:"inline-form-input-name",placeholder:"Jane Doe"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),n("b-button",{attrs:{variant:"primary"},on:{click:e.loginHandler}},[e._v("登入")])],1)],1)])},y=[],w=n("bc3a"),_=n.n(w),k={name:"Login",data:function(){return{name:""}},methods:{loginHandler:function(e){var t=this;e.preventDefault(),this.name&&_.a.post("https://websockewechat.herokuapp.com/login",{name:this.name}).then((function(e){if(console.log(e.data),!0!==e.data){var n={name:t.name};t.$store.commit("M_USER",n),t.$router.push("/home")}else alert("名稱重複")})).catch((function(e){console.log(e)}))}}},O=k,x=(n("643a"),Object(a["a"])(O,g,y,!1,null,"3aa33a78",null)),C=x.exports;o["default"].use(l["a"]);var S=[{path:"/",name:"Login",component:C},{path:"/home",name:"Home",component:b},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))}}],L=new l["a"]({mode:"history",base:"/",routes:S}),$=L,j=n("2f62");o["default"].use(j["a"]);var E=new j["a"].Store({state:{user:{type:"",message:"",name:"",room:""},users:[]},mutations:{M_USER:function(e,t){var n=t.name,o=void 0===n?e.user.name:n,s=t.message,r=void 0===s?"":s,a=t.type,i=void 0===a?"":a,u=t.room,c=void 0===u?"":u;e.user.type=i,e.user.name=o,e.user.message=r,e.user.room=c},M_USERS:function(e,t){e.users=t}},actions:{},modules:{}}),M=n("5f5b"),H=n("b1e0");o["default"].use(M["a"]),o["default"].use(H["a"]),o["default"].config.productionTip=!1,new o["default"]({router:$,store:E,render:function(e){return e(c)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";n("9c0c")},"643a":function(e,t,n){"use strict";n("52d6")},"9c0c":function(e,t,n){}});
//# sourceMappingURL=app.f90b7589.js.map