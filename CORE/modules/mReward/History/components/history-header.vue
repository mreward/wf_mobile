<template>
        <div class="history__filter-date grid grid--small child-width--1-2 margin-bottom--small-base">
            <div
                    class="card card--header"
                    @click="chooseDateFrom"
            >
                <div class="card--content-filter">
                    <span>{{ $t('m_history_from') }}</span>

                    {{ formatTime(dateFrom) }}
                </div>
                <div>
                    <i class="icon-arrow-drop-down"></i>
                </div>
            </div>

            <div
                    class="card card--header"
                    @click="chooseDateTo"
            >
                <div class="card--content-filter">
                    <span>{{ $t('m_history_to') }}</span>

                    {{ formatTime(dateTo) }}
                </div>
                <div>
                    <i class="icon-arrow-drop-down"></i>
                </div>
            </div>

            <div
                    class="card card--header card--selected"
                    @click="chooseShop"
            >
                <div class="card--content-filter">
                    <span>{{ $t('m_history_filter_shop') }}</span>

                    {{ shop.name }}
                </div>
                <div>
                    <i class="icon-arrow-drop-down"></i>
                </div>
            </div>
    </div>
</template>

<script>
    import DatePicker from '_PLUGINS/common/DatePicker'
    import moment from 'moment'
    import { mapActions } from 'vuex'
    import constants from '_vuex_constants'
    const ScreenHistorySearchShop = () => import('_screen_history_search_shop')

    export default {
        name: 'history-header',
        data() {
            return {
                dateFrom: moment().subtract(1, 'month'),
                dateTo: moment(),
                shop: {
                    name: this.$t('m_history_all_shop'),
                    address: '',
                    branch: 'all',
                },
            }
        },
        computed: {
            selectedDate() {
                return {
                    dateFrom: this.dateFrom,
                    dateTo: this.dateTo
                }
            }
        },
        watch: {
            selectedDate(newVal) {
                this.$emit('select-date', newVal)
            }
        },
        created() {
            this.$emit('select-date', this.selectedDate)
        },
        methods: {
            ...mapActions({
                getHistory: constants.MrewardHistory.Actions.getHistory,
                pushPage: constants.App.Actions.pushPage
            }),
            async chooseDateFrom() {
                this.dateFrom = await this.pickDate({
                    maxDate: moment(),
                    date: this.dateFrom
                })
                this.updateHistory()
            },
            async chooseDateTo() {
                this.dateTo = await this.pickDate({
                    maxDate: moment()
                })
                this.updateHistory()
            },
            async updateHistory() {
                try {
                    await this.getHistory({
                        dateFrom: moment(this.dateFrom).format('YYYY-MM-DD'),
                        dateTo: moment(this.dateTo).format('YYYY-MM-DD')
                    })
                } catch (e) {
                    console.error(e)
                }
            },
            async pickDate(options) {
                const date = await DatePicker.Pick(options)
                return date
            },
            formatTime(date) {
                return moment(date).format('DD MMMM')
            },
            chooseShop() {
                this.pushPage({
                    extends: ScreenHistorySearchShop,
                    data: () => {
                        return {
                            select: this.shop,
                        }
                    },
                    methods: {
                        onSelected: (value) => {
                            this.shop = value;
                            this.$emit('select-shop', value)
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .card.card--header.card--selected {
        width: 100% !important;
    }

    .card.card--header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .card--content-filter {
        display: flex;
        flex-direction: column;
    }

    i {
        font-size: 20px;
        width: 16px;
        display: block;
    }
</style>
