/* DO NOT CHANGE: Auto-generated file */

import Vue from 'vue';
import Account from '_account';
import AlertConfirm from '_alert_confirm';
import ButtonBase from '_button_base';
import DatepickerCustom from '_datepicker_custom';
import FormBase from '_form_base';
import FormItem from '_form_item';
import FormList from '_form_list';
import InputBase from '_input_base';
import InputPin from '_input_pin_sequence';
import LayoutAuth from '_layout_auth';
import LayoutCover from '_layout_cover';
import LayoutDefault from '_layout_default';
import LayoutHome from '_layout_home';
import LayoutTab from '_layout_tab';
import LayoutTabCover from '_layout_tab_cover';
import LayoutTabs from '_layout_tabs';
import LoaderOverlay from '_CORE/components/common/loader-overlay.vue';
import NotFoundItems from '_not_found_items';
import ProductCard from '_product_card';
import ProgressCircular from '_progress_circular';
import Tile from '_tile';
import ToolBar from '_toolbar';
import ValidationError from '_validation_error';
import VueInspector from '_vue_inspector';
import layout from '_CORE/components/common/layout';

export default {
    init() {
        const components = {
            Account,
            AlertConfirm,
            ButtonBase,
            DatepickerCustom,
            FormBase,
            FormItem,
            FormList,
            InputBase,
            InputPin,
            LayoutAuth,
            LayoutCover,
            LayoutDefault,
            LayoutHome,
            LayoutTab,
            LayoutTabCover,
            LayoutTabs,
            LoaderOverlay,
            NotFoundItems,
            ProductCard,
            ProgressCircular,
            Tile,
            ToolBar,
            ValidationError,
            VueInspector,
            layout,
        };

        Object.values(components).forEach(c => Vue.component(c.name, c));
    },
};
