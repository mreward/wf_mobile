const defaultsDeep = require('lodash/defaultsDeep')
const configDefault = require('../../CORE/.config.mwallet') // TODO check default fields
const buildNotesHockeyapp = require('../../CORE/buildNotesHockeyapp')
const CHANGELOG = require('./CHANGELOG')
const mainJsModules = require('./src/.config.main')

// TODO rename (TEST/PROD)?
const UrlMReward = {
    SIT: 'https://api-dev.m-loyalty.com/', // required
    UAT: 'https://api-devkdk.kulikov.com/',
    // UAT: 'https://api-dev.kulikov.com/',
    PROD: 'https://api.kulikov.com/' // required
}

// TODO register logrocket acc
const LogRocketId = {
    SIT: 'kulikovsky/kulikovsky-sit', // required
    UAT: 'kulikovsky/kulikovsky-uat', // required
    PROD: 'kulikovsky/kulikovsky' // required
}

const PROD = {
    meta: [
        {
            mReward: {
                API: {
                    url: UrlMReward.PROD
                }
            }
        }
    ],
    idChanel: 'CM5JRHF6V', // required
    logRocketId: LogRocketId.PROD,
    hockeyAppID: '', // required
    googleAnalyticsTrackId: '',
    nameCompany: `Copyright ${(new Date()).getFullYear()} . All rights reserved.`, // required
    GoogleServiceInfoIOS: '/certificates/GoogleService-Info.plist', // required

    keyboard: true,
    timeReload: 10,

    defaultPhoneCode: '+996',
    defaultCountryId: 99,
    lang: 'ru', // Default Language
    languages: ['en', 'ru', 'kk', 'ky'],
    passwordMinimumLength: 6,
    minimumAge: 14, // required

    termsUrl: 'https://kulikov.com/license.pdf', // required
    nameApp: 'Куликовский', // required
    bundleID: 'pro.mwallet.kulikovsky', // required
    version: '1.1.1', // required
    options: {
        modules: {
            mReward: {
                Auth: {
                    showMobileHint: true
                }
            },
            OnBoarding: {
                closeTitle: true,
                nextAction: true,
            }
        }
    },
    mainJsModules,
    appleTeamId: 'N9UTTLR2F7',
    contacts: {
        country_1: {
            phone: '+996 556 583 858',
            instagram: 'kulikov_kg',
            email: 'service@kulikov.com'
        },
        country_2: {
            phone: '+7 727 364 77 77',
            instagram: 'kulikov_kz'
        },
        country_3: {
            phone: '+7 383 202 10 29',
            instagram: 'kulikov_novosibirsk'
        },
        telegram: 'Kulikovskiybot',
        whatsapp: '+996 550 909 209',
        onlinechat: 'https://kulikovskiy.bitrix24.ru/online/contactcentr',
        site: 'https://kulikov.com/'
    },
    googleApiKey: 'AIzaSyDRsmHsv0HZPGB0GXLL95TxldOf_YejUFU',
    supportMail: 'kdkulikovskiy@gmail.com',
    appCenterIos: 'sokolenkoigor32-gmail.com/Kulikovsky-3',
    appCenterAndroid: 'sokolenkoigor32-gmail.com/Kulikovsky-2',
    partnerKeys: [{
        id: 1,
        key: '1e417e47-2bb6-440d-8168-c6a56abcb5a0',
        code: '0050',
        country: 'KG',
    },{
        id: 2,
        key: 'c37fdc5d-f41b-412f-b256-fb71e9d8eb0c',
        code: '1050',
        country: 'KZ',
    },{
        id: 3,
        key: 'b1d36558-3f12-41d8-ba21-4e7ecebdce10',
        code: '2050',
        country: 'RU',
    }]
}

const Environment = {
    PROD,
    SIT: defaultsDeep({
        meta: [
            {
                mReward: {
                    API: {
                        url: UrlMReward.SIT
                    }
                }
            }
        ],
        nameApp: 'Куликовский SIT', // required
        bundleID: 'pro.mwallet.kulikovskysit',
        hockeyAppID: '368d93b7987e45bca63d55f8c153f7e7',
        GoogleServiceInfoIOS: '/certificates/GoogleService-Info-SIT.plist', // required
        logRocketId: LogRocketId.SIT
    }, PROD),
    UAT: defaultsDeep({
        meta: [
            {
                mReward: {
                    API: {
                        url: UrlMReward.UAT
                    }
                }
            }
        ],
        nameApp: 'Куликовский UAT', // required
        bundleID: 'pro.mwallet.kulikovskyuat',
        hockeyAppID: 'dbf74cfbfcf642c481d683b7e3e46a79', // TODO change
        GoogleServiceInfoIOS: '/certificates/GoogleService-Info-SIT.plist', // required
        logRocketId: LogRocketId.UAT,
        defaultPhoneCode: '+996',
        appCenterIos: 'sokolenkoigor32-gmail.com/Kulikovsky',
        appCenterAndroid: 'sokolenkoigor32-gmail.com/Kulikovsky-1',
        partnerKeys: [{
            id: 1,
            key: '1e417e47-2bb6-440d-8168-c6a56abcb5a0',
            code: '0050',
            country: 'KG',
        },{
            id: 2,
            key: 'c37fdc5d-f41b-412f-b256-fb71e9d8eb0c',
            code: '1050',
            country: 'KZ',
        },{
            id: 3,
            key: 'b1d36558-3f12-41d8-ba21-4e7ecebdce10',
            code: '2050',
            country: 'RU',
        }]
    }, PROD)
}

module.exports = defaultsDeep({
    name: 'Kulikovsky', // required
    application: Environment.UAT,
    notesHockeyapp: buildNotesHockeyapp(CHANGELOG)
}, configDefault.app_config)

module.exports.Environment = Environment
