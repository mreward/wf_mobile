(window.webpackJsonpmWallet=window.webpackJsonpmWallet||[]).push([[9],{1361:function(t,e,a){"use strict";a.r(e);var n=a(1362),o=a.n(n);for(var r in n)"default"!==r&&function(t){a.d(e,t,(function(){return n[t]}))}(r);e.default=o.a},1362:function(t,e,a){"use strict";var n=a(9);a(1)(e,"__esModule",{value:!0}),e.default=void 0;var o=n(a(1465)),r=n(a(384)),i={name:"screen-profile-tab",mixins:[o.default,r.default]};e.default=i},1363:function(t,e,a){var n=a(1469);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,a(61).default)("f6e8b118",n,!0,{})},1464:function(t,e,a){"use strict";a.r(e);var n=a(1504),o=a(1361);for(var r in o)"default"!==r&&function(t){a.d(e,t,(function(){return o[t]}))}(r);a(1468);var i=a(13),s=Object(i.a)(o.default,n.a,n.b,!1,null,"7871d55f",null);e.default=s.exports},1465:function(t,e,a){"use strict";var n=a(9);a(1)(e,"__esModule",{value:!0}),e.default=void 0;var o=n(a(1)),r=n(a(23)),i=n(a(24)),s=n(a(21)),l=n(a(22)),c=n(a(20)),u=n(a(28)),f=n(a(29)),d=n(a(18)),p=n(a(27)),v=a(37),m=n(a(387)),_=n(a(1466)),h=n(a(1467)),g=n(a(277));function b(t,e){var a=(0,c.default)(t);if(l.default){var n=(0,l.default)(t);e&&(n=n.filter((function(e){return(0,s.default)(t,e).enumerable}))),a.push.apply(a,n)}return a}function y(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?b(Object(a),!0).forEach((function(e){(0,d.default)(t,e,a[e])})):i.default?(0,r.default)(t,(0,i.default)(a)):b(Object(a)).forEach((function(e){(0,o.default)(t,e,(0,s.default)(a,e))}))}return t}var k=function(){return a.e(0).then(a.bind(null,535))},w={data:function(){return{ImgDownloadPhoto:_.default,layout:"default",cityName:"",countryPhoneMask:"+000 000 000 000",profileDataLength:800}},computed:y({},(0,v.mapGetters)({settings:p.default.App.Getters.settings,profile:p.default.MrewardProfile.Getters.userProfile,loaderVisible:p.default.App.Getters.loaderVisible,maskFromIso:p.default.PhoneMasks.Getters.maskFromIso,countries:p.default.MrewardGeo.Getters.countries,userName:p.default.MrewardProfile.Getters.userName}),{formattedMobile:function(){return new m.default(this.countryPhoneMask,{reverse:!0}).apply(this.profile.mobile)},profileData:function(){var t=[];return this.profile.email&&t.push({title:this.$t("m_profile_email"),subtitle:this.profile.email}),this.profile.birth_day&&t.push({title:this.$t("m_profile_birthday"),subtitle:this.$options.filters.date(this.profile.birth_day,{formatTo:"DD MMMM, YYYY"})}),this.cityName&&t.push({title:this.$t("m_profile_city"),subtitle:this.cityName,type:"city"}),t},country:function(){var t=this,e=this.countries.find((function(e){return e.country_id===t.profile.country}));return e||{}}}),watch:{"profile.id_city":function(){this.setCityName()},"profileData.length":function(t){var e=this;this.$nextTick((function(){e.profileDataLength=t}))}},created:function(){var t=this;return(0,f.default)(u.default.mark((function e(){return u.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t.countries.length){e.next=4;break}return e.next=4,t.getCountries();case 4:t.profile.id_city&&t.setCityName(),t.setCountryPhoneMask(),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),t.$Alert.Error(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()},mounted:function(){window.StatusBar&&window.StatusBar.styleDefault(),this.$refs.content.parentElement.addEventListener("scroll",this.onScroll)},beforeDestroy:function(){window.StatusBar&&window.StatusBar.styleLightContent(),this.$refs.content.parentElement.removeEventListener("scroll",this.onScroll)},methods:y({},(0,v.mapActions)({uploadAvatarAction:p.default.MrewardProfile.Actions.uploadAvatar,getCityById:p.default.MrewardGeo.Actions.getCityById,logoutUserAction:p.default.MrewardUser.Actions.logoutUser,popPage:p.default.App.Actions.popPage,pushPage:p.default.App.Actions.pushPage,popToPage:p.default.App.Actions.popToPage,getCountries:p.default.MrewardGeo.Actions.getCountries}),{onScroll:function(t){var e=.3*t.target.scrollTop,a=.3*e/100+1;a<1&&(a=-e/100+1,this.$refs.pageBackground.style.transform="scale(".concat(a,")"))},setCityName:function(){var t=this;return(0,f.default)(u.default.mark((function e(){var a,n;return u.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.getCityById({id:t.profile.id_city});case 3:a=e.sent,n=a.target.city_name,t.cityName=n,e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),t.$Alert.Error(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()},setCountryPhoneMask:function(){var t="+".concat(this.profile.mobile),e=g.default.GetCountryByPhoneNumber(t),a=this.countries.find((function(t){return t.code===e})),n=a.phone_code,o={code:n,id:a.country_id,name:a.country_name,iso:a.code},r=this.maskFromIso(o).mask;this.countryPhoneMask="".concat(n," ").concat(r).replace(/[0-9x]/g,"0")},selectAvatar:function(){var t=this,e=[this.$t("m_profile_from_gallery"),this.$t("m_profile_take_picture"),this.$t("m_profile_cancel")];this.$ons.openActionSheet({buttons:e,title:this.$t("m_profile_change_profile_picture"),cancelable:!0,destructive:2,class:"alert--avatar",callback:function(e){if(-1!==e&&2!==e){var a=1;0===e&&(a=0),t.uploadAvatar(a)}}})},uploadAvatar:function(t){var e=this;return(0,f.default)(u.default.mark((function a(){var n,o;return u.default.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,h.default.GetPicture({imageSource:t});case 3:return n=a.sent,a.next=6,h.default.PreparePicture({picture:n,isHashFileName:!1,fileKey:"profile_image"});case 6:return o=a.sent,a.next=9,e.uploadAvatarAction(y({},o));case 9:a.next=15;break;case 11:a.prev=11,a.t0=a.catch(0),console.log(a.t0),e.$Alert.Error(a.t0);case 15:case"end":return a.stop()}}),a,null,[[0,11]])})))()},goToEditProfile:function(){this.$bus.$emit("goToPage",{page:"edit-profile"})},goToRecoveryPassword:function(){var t=this,e="+".concat(this.profile.mobile),a=g.default.GetClearPhoneNumber(e),n=e.replace(a,"");this.pushPage({extends:k,data:function(){return{mobile:a,code:n,showMobileNumberInput:!1,titleTranslationKey:"m_auth_change_password_title"}},methods:{callbackPageOpen:function(){t.$bus.$emit("showStatusPopover",{status:1,title:t.$t("m_auth_password_changed_done"),nextEvent:function(){t.popToPage("screen-home")}})}}})}})};e.default=w},1466:function(t,e,a){t.exports=a.p+"download-photo.png?88bde9e22acfbf3519ef88661daeefa5"},1467:function(t,e,a){"use strict";var n=a(9);a(1)(e,"__esModule",{value:!0}),e.default=void 0;var o=n(a(105)),r=n(a(57)),i=n(a(1247)),s={GetPicture:function(t){var e=t.imageSource,a=t.targetWidth,n=void 0===a?600:a,o=t.targetHeight,i=void 0===o?600:o,s=t.quality,l=void 0===s?100:s;return new r.default((function(t,a){if(window.cordova){var o=!0;"Meizu"===device.manufacturer&&(o=!1),navigator.camera.getPicture(t,(function(t){switch(t){case"Selection cancelled.":case"Camera cancelled.":a();break;default:a(t)}}),{destinationType:navigator.camera.DestinationType.FILE_URI,sourceType:e,correctOrientation:!0,quality:l,allowEdit:o,targetWidth:n,targetHeight:i})}else a()}))},PreparePicture:function(t){var e=t.picture,a=t.accountId,n=t.type,s=t.w,l=void 0===s?400:s,c=t.h,u=void 0===c?400:c,f=t.isHashFileName,d=void 0===f||f,p=t.fileKey,v=void 0===p?"file":p;return new r.default((function(t,r){resolveLocalFileSystemURL(e,(function(e){e.file((function(s){e.getMetadata((function(e){var r=s.localURL,c=new FileUploadOptions;c.fileKey=v;var f=r.substr(r.lastIndexOf("/")+1);c.fileName=d?(0,i.default)(f):f,c.mimeType="image/png",c.httpMethod="POST",c.headers={};var p={};p.par=(0,o.default)({type:n||"avatar_orig",account_id:a,w:l,h:u,center:1}),p.size=e.size,p.load_photo="1.0.0.1",c.params=p,c.chunkedMode=!1,t({options:c,imageURI:r})}),(function(t){r(t)}))}),(function(t){t.indexOf("Camera cancelled")>-1?r():r(t)}))}))}))}};e.default=s},1468:function(t,e,a){"use strict";var n=a(1363);a.n(n).a},1469:function(t,e,a){(t.exports=a(52)(!1)).push([t.i,".flag[data-v-7871d55f]{position:absolute;right:16px;height:20px}\n",""])},1504:function(t,e,a){"use strict";a.d(e,"a",(function(){return n})),a.d(e,"b",(function(){return o}));var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-ons-page",{directives:[{name:"status-bar-fill",rawName:"v-status-bar-fill"}],staticClass:"layout-tab",attrs:{shown:"",page:"profile"}},[a("div",{staticClass:"page__background"},[a("div",{ref:"pageBackground",staticClass:"page-background"},[a("div",{staticClass:"page__background--cover",style:{backgroundImage:"url("+(t.profile.is_avatar_uploaded?t.profile.avatar:t.ImgDownloadPhoto)+")"},on:{click:t.selectAvatar}})])]),t._v(" "),a("div",{staticClass:"page__content page__layout"},[a("div",{staticClass:"page-background",on:{click:t.selectAvatar}}),t._v(" "),a("v-btn",{staticClass:"v-btn--edit toolbar__back-button",attrs:{fab:""},on:{click:t.popPage}},[a("i",{staticClass:"icon-back"})]),t._v(" "),a("div",{ref:"content",staticClass:"content-profile"},[t.profileData.length?a("v-list",{staticClass:"profile-list",attrs:{"two-line":!0,disabled:!0}},[a("v-list-item-group",{model:{value:t.profileData.length,callback:function(e){t.$set(t.profileData,"length",e)},expression:"profileData.length"}},[a("v-list-item",{staticClass:"profile-name"},[a("v-list-item-content",[a("v-list-item-title",{domProps:{innerHTML:t._s(t.userName)}}),t._v(" "),a("v-list-item-subtitle",{domProps:{innerHTML:t._s(t.formattedMobile)}})],1)],1),t._v(" "),t._l(t.profileData,(function(e,n){return a("v-list-item",{key:n},[a("v-list-item-content",[a("v-list-item-title",{domProps:{innerHTML:t._s(e.title)}}),t._v(" "),a("v-list-item-subtitle",[a("span",["city"===e.type?a("span",[t._v("\n                                    "+t._s(t.$t("country_"+(t.country.code||"").toLowerCase()))+",\n                                ")]):t._e(),t._v("\n                                "+t._s(e.subtitle)+"\n                            ")]),t._v(" "),"city"===e.type?a("img",{staticClass:"flag",attrs:{src:t.country.flag,alt:""}}):t._e()])],1)],1)}))],2),t._v(" "),a("v-btn",{staticClass:"v-btn--edit",attrs:{fab:""},on:{click:function(e){return t.goToEditProfile()}}},[a("i",{staticClass:"icon-edit"})])],1):a("v-btn",{staticClass:"v-btn--third v-btn--secondary",attrs:{color:"secondary",block:"",disabled:!t.profile.mobile},on:{click:function(e){return t.goToEditProfile()}}},[t._v("\n                "+t._s(t.$t("m_profile_edit_profile"))+"\n                "),a("i",{staticClass:"icon-next-page"})]),t._v(" "),a("v-btn",{staticClass:"margin-top--small-base v-btn--third v-btn--secondary",attrs:{color:"secondary",block:""},on:{click:function(e){return t.goToPage("history")}}},[t._v("\n                "+t._s(t.$t("m_dashboard_latest_charges"))+"\n                "),a("i",{staticClass:"icon-next-page"})]),t._v(" "),a("v-btn",{staticClass:"margin-top--small-base v-btn--third v-btn--secondary",attrs:{color:"secondary",block:""},on:{click:function(e){return t.goToPage("contacts")}}},[t._v("\n                "+t._s(t.$t("m_profile_contacts"))+"\n                "),a("i",{staticClass:"icon-next-page"})]),t._v(" "),a("v-btn",{staticClass:"margin-top--small-base v-btn--third v-btn--secondary",attrs:{color:"secondary",block:""},on:{click:function(e){return t.goToPage("settings")}}},[t._v("\n                "+t._s(t.$t("m_profile_settings"))+"\n                "),a("i",{staticClass:"icon-next-page"})]),t._v(" "),a("v-btn",{staticClass:"margin-top--small-base v-btn--third v-btn--secondary",attrs:{color:"secondary",block:""},on:{click:function(e){return t.goToPage("orders")}}},[t._v("\n                "+t._s(t.$t("m_profile_orders"))+"\n                "),a("i",{staticClass:"icon-next-page"})]),t._v(" "),a("v-btn",{staticClass:"margin-top--small-base v-btn--third v-btn--secondary",attrs:{color:"secondary",block:""},on:{click:function(e){return t.goToRecoveryPassword()}}},[t._v("\n                "+t._s(t.$t("m_profile_change_password"))+"\n            ")]),t._v(" "),a("v-btn",{staticClass:"margin-top--small-base v-btn--third v-btn--secondary",attrs:{color:"secondary",block:""},on:{click:function(e){return t.openProtocol(t.settings.termsUrl)}}},[t._v("\n                "+t._s(t.$t("m_profile_terms_loyalty"))+"\n            ")]),t._v(" "),a("v-btn",{staticClass:"margin-top--small-base v-btn--third v-btn--secondary",attrs:{color:"secondary",block:""},on:{click:t.logoutUserAction}},[t._v("\n                "+t._s(t.$t("m_profile_logout"))+"\n            ")]),t._v(" "),a("div",{staticClass:"profile--min-text"},[t._v("\n                "+t._s(t.$t("m_profile_version"))+" "+t._s(t.settings.version+"."+t.settings.versionCode)+"\n            ")])],1)],1)])},o=[]}}]);