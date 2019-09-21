/* DO NOT CHANGE: Auto-generated file */

import Vue from 'vue';
import MixinCommon from '_CORE/mixins/common/MixinCommon';
import NavigatorGoTo from '_CORE/mixins/common/navigator-go-to';

export default {
    init() {
        const mixins = {
            MixinCommon,
            NavigatorGoTo,
        };

        Object.values(mixins).forEach(m => Vue.mixin(m));
    },
};
