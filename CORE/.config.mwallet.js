const isArray = require('lodash/isArray');
const defaultsDeep = require('lodash/defaultsDeep');
const dateBuild = require('../wallets.config').dateBuild;
const versionCode = require('../wallets.config').versionCode;
const mainJsModules = require('./.config.main');

let configModules = () => {};
try {
    configModules = require('./__configs.generate__/configs/config.modules');
} catch (e) {
    console.log('./__configs.generate__/configs/config.modules.js not found');
}

function _buildVersionCode(calibration) {
    return (parseInt(versionCode, 10) + calibration).toString();
}

// TODO: изменить конфиг
module.exports = {
    app_config: {
        name: '',
        WebPackConfig: {
            register_config: true,
        },
        application: {
            API: {
                hostname: '',
                url: '',
                version: '',
                name: '',
                key: '',
            },
            isLogger: true,
            versionCode: _buildVersionCode(14), // общая версия кода
            uuid: 'db560bd52bd7f896', // TEST
            os: 'android', // Default
            hockeyAppID: '',
            typeCards: null,
            autoLang: true,
            lang: 'ru', // Default Language
            languages: [],
            hockeyAppToken: '546faad226a04b5f99a7e1a26e9c39bb',
            dateBuild,
            messengerSettings: {
                // telegram: '',
                // viber: '',
                // messenger: '',
            },
            dateFormat: 'DD-MM-YYYY',
            colorTheme: 'dark', // set default color shem dark or light
            urlScheme: 'news', // default URL_SCHEME from cordova-plugin-customurlscheme
            alphaNameForSms: '', // the address from which to receive sms
            timeReload: 0, // the number of minutes in the background to reload the application
            logRocketId: '', // LogRocket ID
            mainJsModules,
            options: defaultsDeep({
                modules: {},
            }, configModules),

            appsFlyerToken: '',
            appStoreId: '',
            idChanel: '', // Slack chanel to notifications
            maxLengthAmount: false,
            socialSharingUrl: 'https://walletfactory.com/demo',
            termsUrl: '',
            linkTermsService: 'https://sit.api.paasnew.mobipay.ua/pdf/mWallet%20App%20T&C.pdf', // required

            contacts: {
                phones: [''],
                email: 'info@walletfactory.com',
                website: '/',
                latitude: 0,
                longitude: 0,
            },

            minSumLimit: 1, //  min sum for transaction

            supportPhone: '+1 (415) 830-3669',
            supportMail: 'info@walletfactory.com',
            emailsForOffer: ['yuriyaa@gmail.com', 'quote@walletfactory.com', 'quote@wallet-factory.com', 'mikhail@walletfactory.com'],
            supportWebsite: 'www.walletfactory.com',
            appleTeamId: 'U6HK3GZ99S',
            pushNotificationBackgroundColor: '#333333',
        },
        notesHockeyapp: '',
        autoGenerationConfig: true,
    },
};
