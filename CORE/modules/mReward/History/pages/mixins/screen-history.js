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
            },
            branch: '',
        }
    },
    computed: {
        ...mapGetters({
            history: constants.MrewardHistory.Getters.history,
            adresses: constants.MrewardAdresses.Getters.adresses
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
    created() {
        if(!this.adresses.length) {
            this.getAdresses();
        }
    },
    mounted() {
        window.StatusBar && window.StatusBar.styleDefault();
    },
    beforeDestroy() {
        // window.StatusBar && window.StatusBar.styleLightContent();
    },
    methods: {
        ...mapActions({
            pushPage: constants.App.Actions.pushPage,
            getHistory: constants.MrewardHistory.Actions.getHistory,
            getAdresses: constants.MrewardAdresses.Actions.getAdresses
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
                    networkFirst: true,
                    branch: this.branch,
                })
            } catch (e) {
                this.$Alert.Error(e)
            } finally {
                if(loaded) {
                    setTimeout(() => {
                        loaded('done')
                    }, 300)
                }
            }
        },
        onSelectDate(date) {
            this.selectedDate = _cloneDeep(date)
        },
        onSelectShop(data) {
            if(data.branch !== 'all') {
                this.branch = data.branch;
            } else {
                this.branch = '';
            }

            this.updateHistory();
        }
    }
}
