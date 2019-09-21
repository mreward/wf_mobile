/* DO NOT CHANGE: Auto-generated file */

import Vue from 'vue';
import VueEventBus from 'vue-event-bus';
import mWalletNavigator from '_mwallet_navigator';
import { store } from '_CORE/store';
import { InitCoreMwallet, mWalletPlugin } from '_CORE/libs/mWallet-start-app/index';
import config from '_PROJECT_APP/config.app.js';
import configs from './configs';
import locales from './configs/locales';
import DeviceAspectRatio from '_CORE/plugins/common/DeviceAspectRatio';
import Vuetify from 'vuetify'



import 'vuetify/dist/vuetify.min.css';
import '_PROJECT_APP/src/css/Kulikovsky.scss';
import 'material-design-icons-iconfont/dist/material-design-icons.css';


Vue.use(VueEventBus);

async function ready() {
    console.log('StartApp');
    try {
        await configs({ config });
        await InitCoreMwallet(config);
        await locales.init({ config });

        Vue.use(mWalletPlugin);

        // start navigation
        new Vue({
            el: '#app',
            beforeCreate() {
                const html = document.documentElement;
                // Set only style for platrform
                if (this.$ons.platform.isIPhoneX()) {
                    html.setAttribute('onsflag-iphonex-portrait', '');
                }
                
                if (this.$ons.platform.isAndroidPhone() && window.AndroidNotch) {
                    window.AndroidNotch.hasCutout(success => (cutout) => {
                        if (cutout) {
                            html.setAttribute('unsafe-area', '');
                        }
                    });
                }

                this.$ons.disableAutoStyling();
                this.$ons.platform.select('ios');
            },
            render: h => h(mWalletNavigator),
            store,
            
            vuetify: new Vuetify({
                icons: {
                    iconfont: 'mdiSvg'
                }
            })
        });
    } catch (error) {
        console.log(error);
    }
}

if (window.cordova) {
    document.addEventListener('deviceready', ready, false);
} else {
    ready();
}
