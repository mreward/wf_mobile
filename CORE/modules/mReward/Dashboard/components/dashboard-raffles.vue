<template>
    <div>
        <title-row
            :action="dashboardRaffles.length ? $t('m_dashboard_all') : ''"
            :title="$t('m_dashboard_raffles')"
            @click="$bus.$emit('home:goToTab', 'screen-interesting-tab')"
        />

        <div
            class="card-container--raffles"
            v-if="dashboardRaffles.length && !loading"
        >
            <div class="card-container__wrapper">
                <raffle-card
                    v-for="(item, index) in dashboardRaffles"
                    :key="index"
                    :item="item"
                    @click.native="goToRafflesDetails(item)"
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
            :message="$t('m_dashboard_all_raffles')"
        />
    </div>
</template>

<script>
    import TitleRow from '_title_row'
    import { mapActions, mapGetters } from 'vuex'
    import constants from '_vuex_constants'
    import NotFoundItems from '_not_found_items'
    import RaffleCard from '_raffle_card'

    export default {
        name: 'dashboard-raffles',
        components: {
            TitleRow,
            NotFoundItems,
            RaffleCard
        },
        data: () => ({
            loading: true
        }),
        computed: {
            ...mapGetters({
                dashboardRaffles: constants.MrewardRaffles.Getters.dashboardRaffles
            })
        },
        async created() {
            try {
                await this.getRaffles({ networkFirst: true })
            } catch (e) {
                this.$Alert.Error(e)
            } finally {
                this.loading = false
            }
        },
        methods: {
            ...mapActions({
                getRaffles: constants.MrewardRaffles.Actions.getRaffles,
                pushPage: constants.App.Actions.pushPage
            })
        },
        goToRafflesDetails(raffles) {
        }
    }
</script>

<style scoped>

</style>
