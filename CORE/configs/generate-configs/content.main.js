module.exports = function(wallet) {
    const mainJsModules = wallet.application.mainJsModules
    let styleImport = ''
    let routerImport = ''
    let routerContent = ''

    let isVuetify = mainJsModules.plugins.Vuetify === 'vuetify'

    mainJsModules.css.forEach((item) => {
        styleImport += `import '${item}';\n`
    })

    if (wallet.application.router) {
        routerImport = 'import router from \'_router\';'
        routerContent = 'router,'
    }

    const content = `import Vue from 'vue';
import VueEventBus from 'vue-event-bus';
import mWalletNavigator from '_mwallet_navigator';
import { store } from '_CORE/store';
import { InitCoreMwallet, mWalletPlugin } from '_CORE/libs/mWallet-start-app/index';
import config from '_PROJECT_APP/config.app.js';
import configs from './configs';
import locales from './configs/locales';
import DeviceAspectRatio from '_CORE/plugins/common/DeviceAspectRatio';
${isVuetify ? 'import Vuetify from \'vuetify\'' : ''}

${routerImport}

${styleImport}

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
            ${routerContent}
            ${isVuetify ? 'vuetify: new Vuetify({\n' +
        '                icons: {\n' +
        '                    iconfont: \'mdiSvg\'\n' +
        '                }\n' +
        '            })' : ''}
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
`

    return content
}
