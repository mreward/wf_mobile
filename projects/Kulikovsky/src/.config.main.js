module.exports = {
    css: [
        'vuetify/dist/vuetify.min.css',
        '_PROJECT_APP/src/css/Kulikovsky.scss', // required
        'material-design-icons-iconfont/dist/material-design-icons.css'
    ],
    modules: {
        OnBoarding: true,
        mReward: {
            Auth: true,
            Dashboard: true,
            Profile: true,
            History: true,
            Interesting: true,
            Poll: true,
            News: true,
            Promotions: true,
            Map: true,
            Helpers: true,
            Notifications: true,
            Contacts: true,
            Raffles: true,
            Shop: true
        },
        Dashboard: {
            Base: true
        },
        Helpers: {
            Base: true
        }
    },
    directives: {
    },
    filters: {
        capitalize: true
    },
    store: {
        MobiGift: false,
        User: false,
        PayCards: false,
        Payments: false,
        Ewallet: false,
        P2P: false,
        Catalog: false,
        BankAccounts: false,
        PaymentTemplates: false,
        Core: false,
        History: false,
        Banners: false,
        AppState: false,
        Faq: false
    },
    plugins: {
        Toast: false,
        Alert: true,
        Quasar: false,
        Vuelidate: 'vuelidate',
        VeeValidate: false,
        Vuetify: 'vuetify'
    },
    mixins: {
        NavigatorGoTo: '_CORE/mixins/common/navigator-go-to'
    },
    mwalletClient: false,
    components: {
        LoaderOverlay: '_CORE/components/common/loader-overlay.vue'
    }
}
