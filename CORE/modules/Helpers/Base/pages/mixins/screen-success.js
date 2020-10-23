import { mapActions, mapGetters } from 'vuex'
import constants from '_vuex_constants'
import MixinShowAddTOFavorite from '_CORE/modules/History/Base/mixins/show-add-to-favorite'
import get from 'lodash/get'

export default {
    mixins: [
        MixinShowAddTOFavorite
    ],
    data() {
        return {
            buttonTitle: 'm_helpers_success_ok',
            showGoDashboardButton: true,
            showAddToFavorite: false,
            icon: 'success'
        }
    },
    computed: {
        ...mapGetters({
            module: constants.App.Getters.module
        }),
        lastTransaction() {
            const getter = get(constants, 'PaymentTemplates.Getters.lastTransaction', '')
            if (getter) {
                return this.$store.getters[getter]
            }
            return false
        },
        showAddContactButton() {
            if (!this.moduleOptions('ContactBook.addContact', false) ||
                (!this.lastTransaction && this.lastTransaction.type !== 'P2P') ||
                !this.phone) {
                return false
            }

            const getter = get(constants, 'ContactBook.Getters.findByPhone', '')
            if (getter) {
                return !this.$store.getters[getter](this.phone)
            }
        },
        _showAddToFavoriteButton () {
            if (this.module('PaymentTemplates', false)) {
                return this.showAddToFavorite && !!this.lastTransaction ? this.showAddToFavoriteButton(this.lastTransaction) : this.showAddToFavorite
            }
            return false
        }
    },
    async created() {
        if (this.moduleOptions('ContactBook.addContact', false) && get(constants, 'ContactBook.Actions.loadContactBookList')) {
            await this.$store.dispatch(constants.ContactBook.Actions.loadContactBookList)
        }
    },
    mounted() {
        this.hideKeyboard()
    },
    methods: {
        ...mapActions({
            popToPage: constants.App.Actions.popToPage,
            pushPage: constants.App.Actions.pushPage
        }),
        goToDashboard() {
            this.popToPage('screen-dashboard')
        },
        addToFavorites() {
            this.goToPage('add-template')
        },
        callback() {

        }
    }
}
