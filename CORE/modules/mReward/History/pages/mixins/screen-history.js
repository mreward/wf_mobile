import { mapActions, mapGetters } from 'vuex'
import constants from '_vuex_constants'
const ScreenHistoryDetails = () => import('_screen_history_details')
import moment from 'moment'
import _cloneDeep from 'lodash/cloneDeep'

export default {
    data() {
        return {
            selectedDate: {
                dateFrom: '',
                dateTo: ''
            }
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
            pushPage: constants.App.Actions.pushPage,
            getHistory: constants.MrewardHistory.Actions.getHistory
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
        },
        async updateHistory(loaded) {
            try {
                await this.getHistory({
                    dateFrom: moment(this.selectedDate.dateFrom).format('YYYY-MM-DD'),
                    dateTo: moment(this.selectedDate.dateTo).format('YYYY-MM-DD'),
                    networkFirst: true
                })
            } catch (e) {
                this.$Alert.Error(e)
            } finally {
                setTimeout(() => {
                    loaded('done')
                }, 300)
            }
        },
        onSelectDate(date) {
            this.selectedDate = _cloneDeep(date)
        }
    }
}
