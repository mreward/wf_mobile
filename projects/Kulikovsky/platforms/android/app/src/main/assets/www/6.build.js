(window.webpackJsonpmWallet=window.webpackJsonpmWallet||[]).push([[6],{1100:function(t,e,n){"use strict";n.r(e);var a=n(1172),s=n(1124);for(var r in s)"default"!==r&&function(t){n.d(e,t,function(){return s[t]})}(r);var u=n(12),i=Object(u.a)(s.default,a.a,a.b,!1,null,"76c2ee10",null);e.default=i.exports},1124:function(t,e,n){"use strict";n.r(e);var a=n(1125),s=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);e.default=s.a},1125:function(t,e,n){"use strict";var a=n(10);n(1)(e,"__esModule",{value:!0}),e.default=void 0;var s={name:"screen-news-details",mixins:[a(n(1156)).default]};e.default=s},1156:function(t,e,n){"use strict";var a=n(10);n(1)(e,"__esModule",{value:!0}),e.default=void 0;var s=a(n(51)),r={props:{news:{type:Object,default:function(){return{}}}},methods:{createdDate:function(){return(0,s.default)(this.news.date,"X").format("DD MMMM, YYYY")}}};e.default=r},1172:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("layout",{attrs:{layout:"cover",cover:t.news.img_path}},[n("div",{staticClass:"cover__content"},[n("div",{staticClass:"news__title"},[t._v("\n            "+t._s(t.news.name)+"\n        ")]),t._v(" "),n("div",{staticClass:"news__content",domProps:{innerHTML:t._s(t.news.description)}}),t._v(" "),n("div",{staticClass:"news__created"},[t._v("\n            "+t._s(t.createdDate())+"\n        ")])])])},s=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return s})}}]);