(window.webpackJsonpmWallet=window.webpackJsonpmWallet||[]).push([[14],{1274:function(e,t,a){"use strict";a.r(t);var n=a(1367),r=a(1294);for(var s in r)"default"!==s&&function(e){a.d(t,e,(function(){return r[e]}))}(s);var i=a(12),l=Object(i.a)(r.default,n.a,n.b,!1,null,null,null);t.default=l.exports},1294:function(e,t,a){"use strict";a.r(t);var n=a(1295),r=a.n(n);for(var s in n)"default"!==s&&function(e){a.d(t,e,(function(){return n[e]}))}(s);t.default=r.a},1295:function(e,t,a){"use strict";var n=a(6);a(1)(t,"__esModule",{value:!0}),t.default=void 0;var r={name:"screen-settings",mixins:[n(a(1334)).default]};t.default=r},1334:function(e,t,a){"use strict";var n=a(6);a(1)(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(1)),s=n(a(23)),i=n(a(24)),l=n(a(21)),u=n(a(22)),o=n(a(19)),c=n(a(28)),f=n(a(29)),d=n(a(17)),g=n(a(26)),p=a(34);function v(e,t){var a=(0,o.default)(e);if(u.default){var n=(0,u.default)(e);t&&(n=n.filter((function(t){return(0,l.default)(e,t).enumerable}))),a.push.apply(a,n)}return a}function m(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?v(Object(a),!0).forEach((function(t){(0,d.default)(e,t,a[t])})):i.default?(0,s.default)(e,(0,i.default)(a)):v(Object(a)).forEach((function(t){(0,r.default)(e,t,(0,l.default)(a,t))}))}return e}var _={data:function(){return{listBackgroundAnimationColor:"#dcdee1"}},computed:m({},(0,p.mapGetters)({loaderVisible:g.default.App.Getters.loaderVisible,profile:g.default.MrewardProfile.Getters.userProfile,selectedLanguage:g.default.App.Getters.language,settings:g.default.App.Getters.settings,profileFields:g.default.MrewardProfile.Getters.profileFields}),{languagesList:function(){var e=this;return this.settings.languages.map((function(t){return{lang:t,label:e.$t("m_languages_".concat(t))}}))},addressYou:function(){return this.profileFields.find((function(e){return"address_you"===e.key}))}}),created:function(){var e=this;return(0,f.default)(c.default.mark((function t(){return c.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,e.profileFields.length){t.next=4;break}return t.next=4,e.getProfileParams();case 4:t.next=9;break;case 6:t.prev=6,t.t0=t.catch(0),e.$Alert.Error(t.t0);case 9:case"end":return t.stop()}}),t,null,[[0,6]])})))()},methods:m({},(0,p.mapActions)({getProfileParams:g.default.MrewardProfile.Actions.getProfileParams,pushPage:g.default.App.Actions.pushPage,popToPage:g.default.App.Actions.popToPage,setLang:g.default.App.Actions.setLang,editProfileAction:g.default.MrewardProfile.Actions.editProfile}),{selectLanguage:function(e){var t=this;return(0,f.default)(c.default.mark((function a(){return c.default.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,t.setLang({lang:e});case 3:return a.next=5,t.getProfileParams();case 5:t.$bus.$emit("switch-language"),a.next=11;break;case 8:a.prev=8,a.t0=a.catch(0),t.$Alert.Error(a.t0);case 11:case"end":return a.stop()}}),a,null,[[0,8]])})))()},saveAddressYou:function(e){this.editProfileAction({address_you:e})}})};t.default=_},1367:function(e,t,a){"use strict";a.d(t,"a",(function(){return n})),a.d(t,"b",(function(){return r}));var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("layout",{attrs:{title:e.$t("m_profile_settings"),page:"settings"}},[a("v-list",{staticClass:"muted-list",attrs:{flat:""}},[a("v-subheader",[e._v(e._s(e.$t("m_profile_language")))]),e._v(" "),a("v-list-item-group",{attrs:{color:e.listBackgroundAnimationColor},model:{value:e.languagesList.length,callback:function(t){e.$set(e.languagesList,"length",t)},expression:"languagesList.length"}},e._l(e.languagesList,(function(t,n){return a("v-list-item",{key:n,on:{click:function(a){return e.selectLanguage(t.lang)}}},[a("v-list-item-content",[a("v-list-item-title",{domProps:{innerHTML:e._s(t.label)}})],1),e._v(" "),t.lang===e.selectedLanguage?a("v-list-item-icon",[a("i",{staticClass:"icon-checkmark"})]):e._e()],1)})),1),e._v(" "),e.addressYou?[a("v-subheader",[e._v(e._s(e.addressYou.name))]),e._v(" "),a("v-list-item-group",{attrs:{color:e.listBackgroundAnimationColor},model:{value:e.profile.address_you,callback:function(t){e.$set(e.profile,"address_you",t)},expression:"profile.address_you"}},e._l(e.addressYou.items,(function(t,n){return a("v-list-item",{key:n,on:{click:function(a){return e.saveAddressYou(t.id)}}},[a("v-list-item-content",[a("v-list-item-title",{domProps:{innerHTML:e._s(t.value)}})],1),e._v(" "),t.id==e.profile.address_you?a("v-list-item-icon",[a("i",{staticClass:"icon-checkmark"})]):e._e()],1)})),1)]:e._e()],2)],1)},r=[]}}]);