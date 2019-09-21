import { mapActions, mapGetters } from 'vuex'
import constants from '_vuex_constants'
const ScreenHistoryDetails = () => import('_screen_history_details')
import moment from 'moment'

export default {
    data() {
        return {
            //
        }
    },
    computed: {
        ...mapGetters({
            history: constants.MrewardHistory.Getters.history
        }),
        historyList() {
            const newList = []
            let itemsList = []
            let dateGroup
            if (this.history.length) {
                this.history.forEach((a, index) => {
                    const month = moment(a.dateX, 'X').format('MMMM')
                    if (!dateGroup || dateGroup !== month) {
                        if (itemsList.length) {
                            newList.push(itemsList)
                        }
                        newList.push({ date: month, type: 'header' })
                        dateGroup = month
                        itemsList = []
                    }
                    itemsList.push(a)

                    if (this.history.length - 1 === index) {
                        newList.push(itemsList)
                    }
                })
            }
            return newList
        }
    },
    methods: {
        ...mapActions({
            pushPage: constants.App.Actions.pushPage
        }),
        goToHistoryDetails(history) {
            this.pushPage({
                extends: ScreenHistoryDetails,
                props: {
                    history: {
                        type: Object,
                        default: () => {
                            return history
                        }
                    }
                }
            })
        }
    }
}
