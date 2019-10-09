<template>
    <div class="history__filter-date grid grid--small child-width--1-2 margin-bottom--small-base">
        <div
            class="card card--header"
            @click="chooseDateFrom"
        >
            <span>{{ $t('m_history_from') }}</span>

            {{ formatTime(dateFrom) }}
        </div>

        <div
            class="card card--header"
            @click="chooseDateTo"
        >
            <span>{{ $t('m_history_to') }}</span>

            {{ formatTime(dateTo) }}
        </div>
    </div>
</template>

<script>
    import DatePicker from '_PLUGINS/common/DatePicker'
    import moment from 'moment'
    import { mapActions } from 'vuex'
    import constants from '_vuex_constants'

    export default {
        name: 'history-header',
        data() {
            return {
                dateFrom: moment().subtract(1, 'month'),
                dateTo: moment()
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
                getHistory: constants.MrewardHistory.Actions.getHistory
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
            }
        }
    }
</script>
