(window.webpackJsonpmWallet=window.webpackJsonpmWallet||[]).push([[1],{1318:function(t,o,n){"use strict";n.r(o);var e=n(1319),a=n.n(e);for(var i in e)"default"!==i&&function(t){n.d(o,t,(function(){return e[t]}))}(i);o.default=a.a},1319:function(t,o,n){"use strict";var e=n(6);n(1)(o,"__esModule",{value:!0}),o.default=void 0;var a={name:"screen-promotions-details",mixins:[e(n(1358)).default]};o.default=a},1358:function(t,o,n){"use strict";var e=n(6);n(1)(o,"__esModule",{value:!0}),o.default=void 0;var a=e(n(43)),i={mixins:[e(n(551)).default],props:{promotions:{type:Object,default:function(){return{}}}},mounted:function(){window.StatusBar&&window.StatusBar.styleDefault()},beforeDestroy:function(){window.StatusBar&&window.StatusBar.styleLightContent()},methods:{createdDate:function(){return(0,a.default)(this.promotions.item.created,"X").format("DD MMMM, YYYY")}}};o.default=i},1376:function(t,o,n){"use strict";n.d(o,"a",(function(){return e})),n.d(o,"b",(function(){return a}));var e=function(){var t=this,o=t.$createElement,n=t._self._c||o;return n("layout",{attrs:{layout:"cover",cover:t.promotions.img}},[n("div",{staticClass:"cover__content"},[n("div",{staticClass:"promotions__title"},[t._v("\n            "+t._s(t.promotions.title)+"\n        ")]),t._v(" "),n("div",{staticClass:"promotions__date"},[n("div",[t._v("\n                "+t._s(t.$t("m_promotions_offer_valid"))+":\n            ")]),t._v(" "),n("span",[t._v(t._s(t.promotions.data))])]),t._v(" "),n("div",{staticClass:"promotions__separator"}),t._v(" "),n("div",{ref:"htmlBlock",staticClass:"promotions__content",domProps:{innerHTML:t._s(t.promotions.item.content)}}),t._v(" "),n("div",{staticClass:"promotions__created"},[t._v("\n            "+t._s(t.createdDate())+"\n        ")])])])},a=[]},300:function(t,o,n){"use strict";n.r(o);var e=n(1376),a=n(1318);for(var i in a)"default"!==i&&function(t){n.d(o,t,(function(){return a[t]}))}(i);var r=n(12),s=Object(r.a)(a.default,e.a,e.b,!1,null,"040cb1e0",null);o.default=s.exports}}]);