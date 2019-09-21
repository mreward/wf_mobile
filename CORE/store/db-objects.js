import moment from 'moment'

const DEF_TIME = 48
const DEF_TIME_HOUR = 1

export class DbObject {
    constructor() {
        // версия БД для контролирования данных
        this.version = 1 // options.version;
    }

    static get keys() {
        return {
            user: {
                name: 'user',
                time: 0 // hour
            },
            session: {
                name: 'session',
                time: 0
            },
            settings: {
                name: 'settings',
                time: 0
            },
            contacts: {
                name: 'contacts',
                time: DEF_TIME
            },
            phoneMask: {
                name: 'phone_mask',
                time: DEF_TIME
            },
            favorite: {
                name: 'favorite',
                time: DEF_TIME
            },
            imageCache: {
                name: 'imageCache',
                time: DEF_TIME
            },
            logs: {
                name: 'logs',
                time: 1
            },
            pushKey: {
                name: 'pushKey',
                time: DEF_TIME
            },
            language: {
                name: 'language',
                time: 0
            },
            wallet: {
                balance: {
                    name: 'wallet.balance',
                    time: DEF_TIME
                },
                history: {
                    name: 'wallet.history',
                    time: DEF_TIME
                },
                prices: {
                    name: 'wallet.prices',
                    time: DEF_TIME
                }
            },
            payments: {
                invoices: {
                    name: 'payments.invoices',
                    time: DEF_TIME
                },
                allInvoices: {
                    name: 'payments.allInvoices',
                    time: DEF_TIME
                }
            },
            invoices: {
                invoices: {
                    name: 'invoices.invoices',
                    time: DEF_TIME
                },
                allInvoices: {
                    name: 'invoices.allInvoices',
                    time: DEF_TIME
                }
            },
            p2p: {
                history: {
                    name: 'p2p.history',
                    time: DEF_TIME
                },
                p2plist: {
                    name: 'p2p.list',
                    time: DEF_TIME
                },
                invoices: {
                    name: 'p2p.invoices',
                    time: DEF_TIME
                }
            },
            history: {
                all: {
                    name: 'history.all',
                    time: DEF_TIME
                }
            },
            paymentCards: {
                listCards: {
                    name: 'paymentCards.listCards',
                    time: DEF_TIME
                },
                mpAccount: {
                    name: 'paymentCards.mpAccount',
                    time: DEF_TIME
                },
                paymentItems: {
                    name: 'paymentCards.paymentItems',
                    time: DEF_TIME
                }
            },
            mobigift: {
                partners: {
                    name: 'mobigift.partners',
                    time: DEF_TIME_HOUR
                },
                categories: {
                    name: 'mobigift.categories',
                    time: DEF_TIME_HOUR
                },
                cities: {
                    name: 'mobigift.cities',
                    time: DEF_TIME
                },
                receivedGifts: {
                    name: 'mobigift.receivedGifts',
                    time: DEF_TIME_HOUR
                },
                sentGifts: {
                    name: 'mobigift.sentGifts',
                    time: DEF_TIME_HOUR
                }
            },
            banners: {
                banners: {
                    name: 'banners.list',
                    time: DEF_TIME_HOUR
                }
            },
            catalog: {
                catalogList: {
                    name: 'catalog.catalogList',
                    time: DEF_TIME_HOUR
                }
            },
            bankAccounts: {
                list: {
                    name: 'bank.accounts.list',
                    time: DEF_TIME
                }
            },
            policy: {
                points: {
                    name: 'policy',
                    time: DEF_TIME
                }
            },
            promotions: {
                points: {
                    name: 'promotions',
                    time: DEF_TIME
                }
            },
            exchange: {
                rates: {
                    name: 'exchange.rates',
                    time: DEF_TIME
                }
            },
            deposits: {
                depositPrograms: {
                    name: 'deposits.programs',
                    time: DEF_TIME
                }
            },
            contactBookList: {
                contactBook: {
                    name: 'contact.book',
                    time: DEF_TIME
                }
            },
            VodafoneCards: {
                vodafoneCardBalance: {
                    name: 'vodafone.card.balance',
                    time: DEF_TIME
                },
                vodafoneCardHistory: {
                    name: 'vodafone.card.history',
                    time: DEF_TIME
                }
            },
            moneyveoAuth: {
                userToken: {
                    name: 'moneyveo.userToken',
                    time: DEF_TIME
                },
                deviceToken: {
                    name: 'moneyveo.deviceToken',
                    time: 0
                },
                reservedLogin: {
                    name: 'moneyveo.reservedLogin',
                    time: 0
                }
            },
            MoneyveoClient: {
                captcha: {
                    name: 'moneyveo.captcha',
                    time: DEF_TIME
                },
                clientAddress: {
                    name: 'moneyveo.clientAddress',
                    time: DEF_TIME
                },
                clientEmploymentData: {
                    name: 'moneyveo.clientEmploymentData',
                    time: DEF_TIME
                },
                clientPersonalData: {
                    name: 'moneyveo.clientPersonalData',
                    time: DEF_TIME
                },
                pinVerificationInfo: {
                    name: 'moneyveo.pinVerificationInfo',
                    time: DEF_TIME
                },
                pinVerificationEmailInfo: {
                    name: 'moneyveo.pinVerificationEmailInfo',
                    time: DEF_TIME
                },
                clientSecretQuestion: {
                    name: 'moneyveo.clientSecretQuestion',
                    time: DEF_TIME
                },
                additionalAction: {
                    name: 'moneyveo.additionalAction',
                    time: DEF_TIME
                },
                creditHistory: {
                    name: 'moneyveo.creditHistory',
                    time: DEF_TIME
                }
            },
            moneyveoCredits: {
                creditsSettings: {
                    name: 'moneyveo.creditsSettings',
                    time: DEF_TIME
                },
                creditsParam: {
                    name: 'moneyveo.creditsParam',
                    time: DEF_TIME
                },
                creditsInfo: {
                    name: 'moneyveo.creditsInfo',
                    time: DEF_TIME
                },
                repaymentInfo: {
                    name: 'moneyveo.repaymentInfo',
                    time: DEF_TIME
                }
            },
            moneyveoCreditCards: {
                cards: {
                    name: 'moneyveo.creditCards',
                    time: DEF_TIME
                },
                allCards: {
                    name: 'moneyveo.allCards',
                    time: DEF_TIME
                },
                addedCard: {
                    name: 'moneyveo.addedCard',
                    time: DEF_TIME
                }
            },
            LoanApplications: {
                info: {
                    name: 'LoanApplications.info',
                    time: DEF_TIME
                },
                creditsParam: {
                    name: 'LoanApplications.creditsParam',
                    time: DEF_TIME
                }
            },
            Miscellaneous: {
                info: {
                    name: 'Miscellaneous.info',
                    time: DEF_TIME
                },
                fieldsForForm: {
                    name: 'Miscellaneous.fieldsForForm',
                    time: DEF_TIME
                },
                resource: {
                    name: 'Miscellaneous.resource',
                    time: DEF_TIME
                },
                contactChangeState: {
                    name: 'Miscellaneous.contactChangeState',
                    time: DEF_TIME
                },
                contactChangeNextState: {
                    name: 'Miscellaneous.contactChangeNextState',
                    time: DEF_TIME
                },
                restructuringStage: {
                    name: 'Miscellaneous.restructuringStage',
                    time: DEF_TIME
                }
            },
            Restructuring: {
                restructuringInfo: {
                    name: 'Miscellaneous.restructuringInfo',
                    time: DEF_TIME
                }
            },
            Prolongation: {
                prolongationInfo: {
                    name: 'Prolongation.prolongationInfo',
                    time: DEF_TIME
                }
            },

            LoyaltyPrograms: {
                myBonuses: {
                    name: 'LoyaltyPrograms.myBonuses',
                    time: DEF_TIME
                },
                affiliateProgramInfo: {
                    name: 'LoyaltyPrograms.affiliateProgramInfo',
                    time: DEF_TIME
                }
            },
            AppState: {
                name: 'AppState',
                time: 0
            },
            Core: {
                pushHistoty: {
                    name: 'Core.pushHistoty',
                    time: 0
                }
            },
            DeviceInfo: {
                name: 'DeviceInfo',
                time: 0
            },
            userSettings: {
                name: 'userSettings',
                time: 0
            },
            pushNotifications: {
                name: 'pushNotifications',
                time: 0
            },
            mReward: {
                user: {
                    name: 'user',
                    time: 0 // hour
                },
                authToken: {
                    name: 'authToken',
                    time: 0 // hour
                },
                selectedAccount: {
                    name: 'selectedAccount',
                    time: 0
                }
            },
            notificationsList: {
                name: 'notificationsList',
                time: 0
            }
        }
    }

    /**
     * Проверка срока годности данных
     * @param data
     * @param key
     * @returns {*|boolean}
     * @constructor
     */
    static ValidateTimeCreate(data, key) {
        if (!data) {
            return false
        }
        const dateTo = moment(data.date_create, 'x').add(key.time, 'h')
        return key.time === 0 || dateTo > moment()
    }

    GetDefaultObject(data) {
        return {
            date_create: Date.now(),
            version: this.version,
            data: JSON.parse(JSON.stringify(data))
        }
    }
}
