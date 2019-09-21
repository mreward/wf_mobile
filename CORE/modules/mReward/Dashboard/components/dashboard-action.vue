<template>
    <div>
        <title-row
            :action="promoItems.length ? $t('m_dashboard_all') : ''"
            :title="$t('m_dashboard_actions')"
            @click="$bus.$emit('home:goToTab', 'screen-interesting-tab')"
        />

        <div class="card-container card-container--actions"
             v-if="promoItems.length && !loading"
        >
            <div class="card-container__wrapper"
            >
                <product-card
                    v-for="(item, index) in promoItems"
                    :key="index"
                    :item="item"
                    @click.native="goToPromotionsDetails(item)"
                />
            </div>
        </div>

        <v-progress-circular
            v-else-if="loading"
            :width="7"
            :size="70"
            indeterminate
        />

        <not-found-items
            v-else
            :message="$t('m_dashboard_all_actions')"
        />
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import constants from '_vuex_constants'
    import TitleRow from '_title_row'
    import NotFoundItems from '_not_found_items'
    const ScreenPromotionsDetails = () => import('_screen_promotions_details')

    export default {
        name: 'dashboard-action',
        components: {
            TitleRow,
            NotFoundItems
        },
        data: () => ({
            promoItems: [],
            loading: true
        }),
        computed: {
            ...mapGetters({
                partnerPromotions: constants.MrewardPromotions.Getters.partnerPromotions
            })
        },
        watch: {
            partnerPromotions(items) {
                this.promoItems = items.slice(0, 4)
            }
        },
        async created() {
            try {
                await this.getPromotions()
            } catch (e) {
                this.$Alert.Error(e)
            } finally {
                this.loading = false
            }
        },
        methods: {
            ...mapActions({
                getPromotions: constants.MrewardPromotions.Actions.getPromotions,
                pushPage: constants.App.Actions.pushPage
            }),
            goToPromotionsDetails(promotions) {
                this.pushPage({
                    extends: ScreenPromotionsDetails,
                    // options: {
                    //     animation: 'fade'
                    // },
                    props: {
                        promotions: {
                            type: Object,
                            default: () => {
                                return promotions
                            }
                        }
                    }
                })
            }
        }
    }
</script>
