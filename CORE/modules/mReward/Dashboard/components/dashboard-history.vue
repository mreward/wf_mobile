<template>
    <div>
        <title-row
            :action="history.length ? $t('m_dashboard_all') : ''"
            :title="$t('m_dashboard_latest_charges')"
            class="margin-top--base padding-horizontal--base"
            @click="$bus.$emit('goToPage', { page: 'history' })"
        />

        <div
            class="card card--default card--default-restrict"
            v-if="history.length && !loading"
        >
            <v-ons-list class="list--vertical list--indentation is-non-underline">
                <v-ons-list-item
                    v-for="(item, index) in pieceOfHistory"
                    :key="index"
                    @click.native="goToHistoryDetails(item)"
                >
                    <div class="left flex--justify-between">
                        {{ item.name }}
                        <span v-if="item.accruedBonuses">
                            +{{ item.accruedBonuses }}
                        </span>
                    </div>
                    <div class="center">
                        {{ item.address }}
                    </div>
                    <div class="right text--muted">
                        {{ item.date }}
                    </div>
                </v-ons-list-item>
            </v-ons-list>
        </div>

        <v-progress-circular
            v-else-if="loading"
            :width="7"
            :size="70"
            indeterminate
        />

        <not-found-items
            v-else
            :message="$t('m_dashboard_no_accrued_bonuses')"
        />
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import constants from '_vuex_constants'
    import TitleRow from '_title_row'
    import NotFoundItems from '_not_found_items'
    const ScreenHistoryDetails = () => import('_screen_history_details')

    export default {
        name: 'dashboard-history',
        components: {
            TitleRow,
            NotFoundItems
        },
        data() {
            return {
                loading: true
            }
        },
        computed: {
            ...mapGetters({
                history: constants.MrewardHistory.Getters.history
            }),
            pieceOfHistory() {
                return this.history.slice(0, 5)
            }
        },
        async created() {
            try {
                await this.getHistory()
            } catch (e) {
                console.error(e)
            } finally {
                this.loading = false
            }
        },
        methods: {
            ...mapActions({
                getHistory: constants.MrewardHistory.Actions.getHistory,
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
</script>
