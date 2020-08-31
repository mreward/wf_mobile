<template>
    <layout
            :layout="layout"
            :title="$t('Оформление заказа')"
            buttonLeft="back"
            page="checkout"
    >
        <div class="shop-content">
            <v-ons-tabbar swipeable>
                <template slot="pages">
                    <transition>
                        <keep-alive>
                            <component :is="tab"></component>
                        </keep-alive>
                    </transition>
                </template>
            </v-ons-tabbar>
        </div>
    </layout>
</template>

<script>
    import Delivery from './delivery'
    import Pay from './pay'
    import Iframe from './iframe'
    import { mapActions, mapGetters } from 'vuex'
    import constants from '_vuex_constants'
    import ValidationHelpers from '_plugins_validation_helpers'

    export default {
        name: 'screen-checkout',
        components: {
            Delivery,
            Pay,
            Iframe
        },
        mixins: [
            ValidationHelpers
        ],
        data () {
            return {
                tab: 'delivery',
            }
        },
        computed: {
            ...mapGetters({
                deliveryList: constants.MrewardShop.Getters.deliveryList,
                profile: constants.MrewardProfile.Getters.userProfile,
                countries: constants.MrewardGeo.Getters.countries,
            }),
        },
        async created () {
            try {
                await this.getDeliveryList()
                //
                // const result = await this.preCheck()
                //
                // await this.paymentUrl(result)
            } catch (e) {
                this.$Alert.Error(e)
            }

            this.loading = false
        },
        methods: {
            ...mapActions({
                popPage: constants.App.Actions.popPage,
                pushPage: constants.App.Actions.pushPage,
                popToPage: constants.App.Actions.popToPage,
                getCountries: constants.MrewardGeo.Actions.getCountries,
                getDeliveryList: constants.MrewardShop.Actions.getDeliveryList,
                preCheck: constants.MrewardShop.Actions.preCheck,
                paymentUrl: constants.MrewardShop.Actions.paymentUrl,
                getCityById: constants.MrewardGeo.Actions.getCityById
            }),
            setActiveTab(name) {
                this.tab = name;
            },
        }
    }
</script>

<style lang="scss">
    .page[page="checkout"] {

    }
</style>
