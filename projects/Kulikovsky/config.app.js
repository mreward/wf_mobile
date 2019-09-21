const defaultsDeep = require('lodash/defaultsDeep')
const configDefault = require('../../CORE/.config.mwallet') // TODO check default fields
const buildNotesHockeyapp = require('../../CORE/buildNotesHockeyapp')
const CHANGELOG = require('./CHANGELOG')
const mainJsModules = require('./src/.config.main')

// TODO rename (TEST/PROD)?
const UrlMReward = {
    SIT: 'https://api-dev.m-loyalty.com/', // required
    UAT: 'https://api-dev.kulikov.com/',
    PROD: '' // required
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
                    url: UrlMReward.UAT
                }
            }
        }
    ],
    // idChanel: 'CM5JRHF6V', // required
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
    languages: ['ru', 'en', 'kk', 'ky'],
    passwordMinimumLength: 6,
    minimumAge: 14, // required

    termsUrl: 'https://my.kulikov.com/', // required
    nameApp: 'Kulikovsky', // required
    bundleID: 'pro.mwallet.kulikovsky', // required
    version: '0.0.3', // required
    options: {
        modules: {
            mReward: {
                Auth: {
                    showMobileHint: true
                }
            },
            OnBoarding: {
                closeTitle: true
            }
        }
    },
    mainJsModules,
    appleTeamId: 'N9UTTLR2F7',
    contacts: {
        country_1: {
            phone: '+996 312 54 5555',
            instagram: 'kulikov_kg',
            email: 'service@kulikov.com'
        },
        country_2: {
            phone: '+7 727 364 77 77',
            instagram: 'kulikov_kz'
        },
        telegram: 'Kulikovskiybot',
        whatsapp: '+996 550 909 209',
        onlinechat: 'https://kulikovskiy.bitrix24.ru/online/contactcentr'
    },
    googleApiKey: 'AIzaSyDRsmHsv0HZPGB0GXLL95TxldOf_YejUFU'
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
        nameApp: 'Kulikovsky SIT', // required
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
        nameApp: 'Kulikovsky UAT', // required
        bundleID: 'pro.mwallet.kulikovskyuat',
        hockeyAppID: 'dbf74cfbfcf642c481d683b7e3e46a79', // TODO change
        GoogleServiceInfoIOS: '/certificates/GoogleService-Info-SIT.plist', // required
        logRocketId: LogRocketId.UAT,
        defaultPhoneCode: '+996'
    }, PROD)
}

module.exports = defaultsDeep({
    name: 'Kulikovsky', // required
    application: Environment.UAT,
    notesHockeyapp: buildNotesHockeyapp(CHANGELOG)
}, configDefault.app_config)

module.exports.Environment = Environment
