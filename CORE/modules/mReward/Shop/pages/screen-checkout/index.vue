<template>
    <layout
            :layout="layout"
            :title="$t('Оформление заказа')"
            buttonLeft="back"
            page="checkout"
    >
        <div class="checkout-step">
            <div class="checkout-step__item checkout-step__item--active">
                <div class="checkout-step__item__number">1</div>
                <div class="checkout-step__item__title">Доставка</div>
            </div>
            <div class="checkout-step__item">
                <div class="checkout-step__item__number">2</div>
                <div class="checkout-step__item__title">Выбор оплаты</div>
            </div>
            <div class="checkout-step__item">
                <div class="checkout-step__item__number">3</div>
                <div class="checkout-step__item__title">Оплата</div>
            </div>
        </div>
        <div class="checkout-content">
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
    import PayIframe from './iframe'
    import { mapActions, mapGetters } from 'vuex'
    import constants from '_vuex_constants'
    import ValidationHelpers from '_plugins_validation_helpers'

    export default {
        name: 'screen-checkout',
        components: {
            Delivery,
            Pay,
            PayIframe
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
            this.$bus.$on('goToPay', this.goToPay.bind(this))

            try {
                await this.getDeliveryList()

                const result = await this.preCheck()

                await this.paymentUrl(result)

                this.goToPay()
            } catch (e) {
                this.$Alert.Error(e)
            }

            this.loading = false
        },
        beforeDestroy() {
            this.$bus.$off('goToPay', this.goToPay.bind(this))
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
            goToPay() {
                this.setActiveTab('PayIframe')
            }
        }
    }
</script>

<style lang="scss">
    .page[page="checkout"] {
        .toolbar,
        .page__background {
            background: #fff;
        }

        ons-tabbar,
        .page__content {
            display: flex;
            flex-direction: column;
            padding-bottom: 0;
            flex: 1;
        }

        .checkout-content {
            display: flex;
            flex: 1;
            position: relative;
        }

        .ons-tabbar__footer {
            display: none;
        }
        .tabbar__content {
            bottom: 0!important;
            overflow: scroll;
        }

        .tabbar__content.ons-tabbar__content.ons-swiper {
            position: inherit;
            padding-top: 10px;
        }


        .v-input--checkbox {
            margin-bottom: 16px;
            .primary--text {

            }
            .v-label {
                font-family: SF Pro Text;
                font-style: normal;
                font-weight: normal;
                font-size: 15px;
                line-height: 20px;
                letter-spacing: -0.24px;
                color: #000000;
            }
        }

        .checkout-step {
            display: flex;
            padding: 16px 0;
            justify-content: space-between;

            &__item {
                display: flex;
                align-items: center;

                &__number {
                    font-weight: 600;
                    font-size: 12px;
                    line-height: 16px;
                    text-align: center;
                    color: rgba(60, 60, 67, 0.6);
                    height: 20px;
                    width: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #F5F7FA;
                    border-radius: 50%;
                }
                &__title {
                    font-style: normal;
                    font-weight: 600;
                    font-size: 12px;
                    line-height: 16px;
                    text-align: center;
                    color: #000000;
                    padding-left: 8px;
                    display: none;
                }

                &--active {
                    .checkout-step__item__title {
                        display: block;
                    }
                    .checkout-step__item__number {
                        background: #6D0978;
                        color: #FFFFFF;
                    }
                }
            }
        }
    }
</style>
