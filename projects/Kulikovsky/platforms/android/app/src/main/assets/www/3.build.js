(window["webpackJsonpmWallet"] = window["webpackJsonpmWallet"] || []).push([[3],{

/***/ "./CORE/modules/mReward/News/pages/mixins/screen-news-details.js":
/*!***********************************************************************!*\
  !*** ./CORE/modules/mReward/News/pages/mixins/screen-news-details.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js\");\n\nvar _Object$defineProperty = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/define-property */ \"./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js\");\n\n_Object$defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = void 0;\n\nvar _moment = _interopRequireDefault(__webpack_require__(/*! moment */ \"./node_modules/moment/moment.js\"));\n\nvar _mixin_handle_html_links = _interopRequireDefault(__webpack_require__(/*! _mixin_handle_html_links */ \"./CORE/modules/mReward/Helpers/mixins/handleHtmlLinks.js\"));\n\nvar _default2 = {\n  mixins: [_mixin_handle_html_links.default],\n  props: {\n    news: {\n      type: Object,\n      default: function _default() {\n        return {};\n      }\n    }\n  },\n  methods: {\n    createdDate: function createdDate() {\n      return (0, _moment.default)(this.news.date, 'X').format('DD MMMM, YYYY');\n    }\n  }\n};\nexports.default = _default2;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tV2FsbGV0Ly4vQ09SRS9tb2R1bGVzL21SZXdhcmQvTmV3cy9wYWdlcy9taXhpbnMvc2NyZWVuLW5ld3MtZGV0YWlscy5qcz9kNjA3Il0sIm5hbWVzIjpbIm1peGlucyIsIk1peGluSGFuZGxlSHRtbExpbmtzIiwicHJvcHMiLCJuZXdzIiwidHlwZSIsIk9iamVjdCIsImRlZmF1bHQiLCJtZXRob2RzIiwiY3JlYXRlZERhdGUiLCJkYXRlIiwiZm9ybWF0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7Z0JBRWU7QUFDWEEsUUFBTSxFQUFFLENBQUNDLGdDQUFELENBREc7QUFFWEMsT0FBSyxFQUFFO0FBQ0hDLFFBQUksRUFBRTtBQUNGQyxVQUFJLEVBQUVDLE1BREo7QUFFRkMsYUFBTyxFQUFFO0FBQUEsZUFBTyxFQUFQO0FBQUE7QUFGUDtBQURILEdBRkk7QUFRWEMsU0FBTyxFQUFFO0FBQ0xDLGVBREsseUJBQ1M7QUFDVixhQUFPLHFCQUFPLEtBQUtMLElBQUwsQ0FBVU0sSUFBakIsRUFBdUIsR0FBdkIsRUFBNEJDLE1BQTVCLENBQW1DLGVBQW5DLENBQVA7QUFDSDtBQUhJO0FBUkUsQyIsImZpbGUiOiIuL0NPUkUvbW9kdWxlcy9tUmV3YXJkL05ld3MvcGFnZXMvbWl4aW5zL3NjcmVlbi1uZXdzLWRldGFpbHMuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCdcbmltcG9ydCBNaXhpbkhhbmRsZUh0bWxMaW5rcyBmcm9tICdfbWl4aW5faGFuZGxlX2h0bWxfbGlua3MnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBtaXhpbnM6IFtNaXhpbkhhbmRsZUh0bWxMaW5rc10sXG4gICAgcHJvcHM6IHtcbiAgICAgICAgbmV3czoge1xuICAgICAgICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgICAgICAgZGVmYXVsdDogKCkgPT4gKHt9KVxuICAgICAgICB9XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGNyZWF0ZWREYXRlKCkge1xuICAgICAgICAgICAgcmV0dXJuIG1vbWVudCh0aGlzLm5ld3MuZGF0ZSwgJ1gnKS5mb3JtYXQoJ0REIE1NTU0sIFlZWVknKVxuICAgICAgICB9XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./CORE/modules/mReward/News/pages/mixins/screen-news-details.js\n");

/***/ }),

/***/ "./CORE/modules/mReward/News/pages/screen-news-details.vue":
/*!*****************************************************************!*\
  !*** ./CORE/modules/mReward/News/pages/screen-news-details.vue ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _screen_news_details_vue_vue_type_template_id_52230fef_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./screen-news-details.vue?vue&type=template&id=52230fef&scoped=true& */ \"./CORE/modules/mReward/News/pages/screen-news-details.vue?vue&type=template&id=52230fef&scoped=true&\");\n/* harmony import */ var _screen_news_details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./screen-news-details.vue?vue&type=script&lang=js& */ \"./CORE/modules/mReward/News/pages/screen-news-details.vue?vue&type=script&lang=js&\");\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _screen_news_details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _screen_news_details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _screen_news_details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _screen_news_details_vue_vue_type_template_id_52230fef_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _screen_news_details_vue_vue_type_template_id_52230fef_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"52230fef\",\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"CORE/modules/mReward/News/pages/screen-news-details.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tV2FsbGV0Ly4vQ09SRS9tb2R1bGVzL21SZXdhcmQvTmV3cy9wYWdlcy9zY3JlZW4tbmV3cy1kZXRhaWxzLnZ1ZT8zMWIzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBOEc7QUFDdkM7QUFDTDs7O0FBR2xFO0FBQ21HO0FBQ25HLGdCQUFnQiwyR0FBVTtBQUMxQixFQUFFLHlGQUFNO0FBQ1IsRUFBRSwwR0FBTTtBQUNSLEVBQUUsbUhBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxJQUFJLEtBQVUsRUFBRSxZQWlCZjtBQUNEO0FBQ2UsZ0YiLCJmaWxlIjoiLi9DT1JFL21vZHVsZXMvbVJld2FyZC9OZXdzL3BhZ2VzL3NjcmVlbi1uZXdzLWRldGFpbHMudnVlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9zY3JlZW4tbmV3cy1kZXRhaWxzLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD01MjIzMGZlZiZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9zY3JlZW4tbmV3cy1kZXRhaWxzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vc2NyZWVuLW5ld3MtZGV0YWlscy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjUyMjMwZmVmXCIsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL1VzZXJzL2FsZWtzYW5kcmFyc2hpbnNreS9Eb2N1bWVudHMvQ29yZG92YS9LdWxpa292c2t5LW1vYmlsZS9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCc1MjIzMGZlZicpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCc1MjIzMGZlZicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCc1MjIzMGZlZicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vc2NyZWVuLW5ld3MtZGV0YWlscy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NTIyMzBmZWYmc2NvcGVkPXRydWUmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignNTIyMzBmZWYnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIkNPUkUvbW9kdWxlcy9tUmV3YXJkL05ld3MvcGFnZXMvc2NyZWVuLW5ld3MtZGV0YWlscy52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./CORE/modules/mReward/News/pages/screen-news-details.vue\n");

/***/ }),

/***/ "./CORE/modules/mReward/News/pages/screen-news-details.vue?vue&type=script&lang=js&":
/*!******************************************************************************************!*\
  !*** ./CORE/modules/mReward/News/pages/screen-news-details.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_screen_news_details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib!../../../../../node_modules/vue-loader/lib??vue-loader-options!./screen-news-details.vue?vue&type=script&lang=js& */ \"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./CORE/modules/mReward/News/pages/screen-news-details.vue?vue&type=script&lang=js&\");\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_screen_news_details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_screen_news_details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_screen_news_details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_screen_news_details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_screen_news_details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tV2FsbGV0Ly4vQ09SRS9tb2R1bGVzL21SZXdhcmQvTmV3cy9wYWdlcy9zY3JlZW4tbmV3cy1kZXRhaWxzLnZ1ZT8yYmVkIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXFNLENBQWdCLHNQQUFHLEVBQUMiLCJmaWxlIjoiLi9DT1JFL21vZHVsZXMvbVJld2FyZC9OZXdzL3BhZ2VzL3NjcmVlbi1uZXdzLWRldGFpbHMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9zY3JlZW4tbmV3cy1kZXRhaWxzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL3NjcmVlbi1uZXdzLWRldGFpbHMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./CORE/modules/mReward/News/pages/screen-news-details.vue?vue&type=script&lang=js&\n");

/***/ }),

/***/ "./CORE/modules/mReward/News/pages/screen-news-details.vue?vue&type=template&id=52230fef&scoped=true&":
/*!************************************************************************************************************!*\
  !*** ./CORE/modules/mReward/News/pages/screen-news-details.vue?vue&type=template&id=52230fef&scoped=true& ***!
  \************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_screen_news_details_vue_vue_type_template_id_52230fef_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./screen-news-details.vue?vue&type=template&id=52230fef&scoped=true& */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./CORE/modules/mReward/News/pages/screen-news-details.vue?vue&type=template&id=52230fef&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_screen_news_details_vue_vue_type_template_id_52230fef_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_screen_news_details_vue_vue_type_template_id_52230fef_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tV2FsbGV0Ly4vQ09SRS9tb2R1bGVzL21SZXdhcmQvTmV3cy9wYWdlcy9zY3JlZW4tbmV3cy1kZXRhaWxzLnZ1ZT82ZTBkIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiIuL0NPUkUvbW9kdWxlcy9tUmV3YXJkL05ld3MvcGFnZXMvc2NyZWVuLW5ld3MtZGV0YWlscy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NTIyMzBmZWYmc2NvcGVkPXRydWUmLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL3NjcmVlbi1uZXdzLWRldGFpbHMudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTUyMjMwZmVmJnNjb3BlZD10cnVlJlwiIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./CORE/modules/mReward/News/pages/screen-news-details.vue?vue&type=template&id=52230fef&scoped=true&\n");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./CORE/modules/mReward/News/pages/screen-news-details.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./CORE/modules/mReward/News/pages/screen-news-details.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js\");\n\nvar _Object$defineProperty = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/define-property */ \"./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js\");\n\n_Object$defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = void 0;\n\nvar _screen_news_details_mixin = _interopRequireDefault(__webpack_require__(/*! _screen_news_details_mixin */ \"./CORE/modules/mReward/News/pages/mixins/screen-news-details.js\"));\n\nvar _default = {\n  name: 'screen-news-details',\n  mixins: [_screen_news_details_mixin.default]\n};\nexports.default = _default;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tV2FsbGV0L0NPUkUvbW9kdWxlcy9tUmV3YXJkL05ld3MvcGFnZXMvc2NyZWVuLW5ld3MtZGV0YWlscy52dWU/NmFkOCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUF3QkE7O2VBRUE7QUFDQSw2QkFEQTtBQUVBLFdBQ0Esa0NBREE7QUFGQSxDIiwiZmlsZSI6Ii4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/IS4vQ09SRS9tb2R1bGVzL21SZXdhcmQvTmV3cy9wYWdlcy9zY3JlZW4tbmV3cy1kZXRhaWxzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyYuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgPGxheW91dFxuICAgICAgICBsYXlvdXQ9XCJjb3ZlclwiXG4gICAgICAgIDpjb3Zlcj1cIm5ld3MuaW1nX3BhdGhcIlxuICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvdmVyX19jb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmV3c19fdGl0bGVcIj5cbiAgICAgICAgICAgICAgICB7eyBuZXdzLm5hbWUgfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPCEtLSByZWY9XCJodG1sQmxvY2tcIiBuZWVkZWQgZm9yIGhhbmRsaW5nIGxpbmtzIC0tPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHJlZj1cImh0bWxCbG9ja1wiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJuZXdzX19jb250ZW50XCJcbiAgICAgICAgICAgICAgICB2LWh0bWw9XCJuZXdzLmRlc2NyaXB0aW9uXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5ld3NfX2NyZWF0ZWRcIj5cbiAgICAgICAgICAgICAgICB7eyBjcmVhdGVkRGF0ZSgpIH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9sYXlvdXQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGltcG9ydCBTY3JlZW5OZXdzRGV0YWlsc01peGluIGZyb20gJ19zY3JlZW5fbmV3c19kZXRhaWxzX21peGluJ1xuXG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBuYW1lOiAnc2NyZWVuLW5ld3MtZGV0YWlscycsXG4gICAgICAgIG1peGluczogW1xuICAgICAgICAgICAgU2NyZWVuTmV3c0RldGFpbHNNaXhpblxuICAgICAgICBdXG4gICAgfVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./CORE/modules/mReward/News/pages/screen-news-details.vue?vue&type=script&lang=js&\n");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./CORE/modules/mReward/News/pages/screen-news-details.vue?vue&type=template&id=52230fef&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./CORE/modules/mReward/News/pages/screen-news-details.vue?vue&type=template&id=52230fef&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"layout\",\n    { attrs: { layout: \"cover\", cover: _vm.news.img_path } },\n    [\n      _c(\"div\", { staticClass: \"cover__content\" }, [\n        _c(\"div\", { staticClass: \"news__title\" }, [\n          _vm._v(\"\\n            \" + _vm._s(_vm.news.name) + \"\\n        \")\n        ]),\n        _vm._v(\" \"),\n        _c(\"div\", {\n          ref: \"htmlBlock\",\n          staticClass: \"news__content\",\n          domProps: { innerHTML: _vm._s(_vm.news.description) }\n        }),\n        _vm._v(\" \"),\n        _c(\"div\", { staticClass: \"news__created\" }, [\n          _vm._v(\"\\n            \" + _vm._s(_vm.createdDate()) + \"\\n        \")\n        ])\n      ])\n    ]\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tV2FsbGV0Ly4vQ09SRS9tb2R1bGVzL21SZXdhcmQvTmV3cy9wYWdlcy9zY3JlZW4tbmV3cy1kZXRhaWxzLnZ1ZT9lNjNkIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssU0FBUyw0Q0FBNEMsRUFBRTtBQUM1RDtBQUNBLGlCQUFpQixnQ0FBZ0M7QUFDakQsbUJBQW1CLDZCQUE2QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsU0FBUztBQUNUO0FBQ0EsbUJBQW1CLCtCQUErQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Ii4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPyEuL0NPUkUvbW9kdWxlcy9tUmV3YXJkL05ld3MvcGFnZXMvc2NyZWVuLW5ld3MtZGV0YWlscy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NTIyMzBmZWYmc2NvcGVkPXRydWUmLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImxheW91dFwiLFxuICAgIHsgYXR0cnM6IHsgbGF5b3V0OiBcImNvdmVyXCIsIGNvdmVyOiBfdm0ubmV3cy5pbWdfcGF0aCB9IH0sXG4gICAgW1xuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb3Zlcl9fY29udGVudFwiIH0sIFtcbiAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJuZXdzX190aXRsZVwiIH0sIFtcbiAgICAgICAgICBfdm0uX3YoXCJcXG4gICAgICAgICAgICBcIiArIF92bS5fcyhfdm0ubmV3cy5uYW1lKSArIFwiXFxuICAgICAgICBcIilcbiAgICAgICAgXSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICByZWY6IFwiaHRtbEJsb2NrXCIsXG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwibmV3c19fY29udGVudFwiLFxuICAgICAgICAgIGRvbVByb3BzOiB7IGlubmVySFRNTDogX3ZtLl9zKF92bS5uZXdzLmRlc2NyaXB0aW9uKSB9XG4gICAgICAgIH0pLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcIm5ld3NfX2NyZWF0ZWRcIiB9LCBbXG4gICAgICAgICAgX3ZtLl92KFwiXFxuICAgICAgICAgICAgXCIgKyBfdm0uX3MoX3ZtLmNyZWF0ZWREYXRlKCkpICsgXCJcXG4gICAgICAgIFwiKVxuICAgICAgICBdKVxuICAgICAgXSlcbiAgICBdXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./CORE/modules/mReward/News/pages/screen-news-details.vue?vue&type=template&id=52230fef&scoped=true&\n");

/***/ })

}]);