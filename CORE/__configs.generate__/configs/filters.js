/* DO NOT CHANGE: Auto-generated file */

import Vue from 'vue';

import capitalize from '_CORE/filters/capitalize';
import searchText from '_CORE/filters/searchText';
import toCoins from '_CORE/filters/toCoins';
import toMoney from '_CORE/filters/toMoney';
import numberFormat from '_CORE/filters/numberFormat';
import maskCard from '_CORE/filters/maskCard';
import currencyMX from '_CORE/filters/currencyMX';
import currencyToSymbol from '_CORE/filters/currencyToSymbol';
import currency from '_CORE/filters/currency';
import date from '_CORE/filters/date';

export default {
    init() {
        Vue.filter('capitalize', capitalize);
        Vue.filter('searchText', searchText);
        Vue.filter('toCoins', toCoins);
        Vue.filter('toMoney', toMoney);
        Vue.filter('numberFormat', numberFormat);
        Vue.filter('maskCard', maskCard);
        Vue.filter('currencyMX', currencyMX);
        Vue.filter('currencyToSymbol', currencyToSymbol);
        Vue.filter('currency', currency);
        Vue.filter('date', date);
    },
};
