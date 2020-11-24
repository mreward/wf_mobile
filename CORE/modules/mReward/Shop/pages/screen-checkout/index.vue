<template>
    <layout
            :layout="layout"
            :title="$t('Оформление заказа')"
            buttonLeft="back"
            page="checkout"
            :onBack="onBack"
    >
        <div class="checkout-step">
            <div class="checkout-step__item"
                 :class="{
                'checkout-step__item--active': tab === 'Pay',
                 'checkout-step__item--success': tab === 'PayIframe'
            }">
                <div class="checkout-step__item__number">
                    <span v-if="tab !== 'PayIframe'">1</span>
                    <i v-if="tab === 'PayIframe'" class="icon-checkmark"/>
                </div>
                <div class="checkout-step__item__title">{{$t('m_shop_select_pay')}}</div>
            </div>
            <div class="checkout-step__item"
                 :class="{'checkout-step__item--active': tab === 'PayIframe'}">
            <div class="checkout-step__item__number">2</div>
                <div class="checkout-step__item__title">{{$t('m_shop_pay')}}</div>
            </div>
        </div>
        <div class="checkout-content">
            <v-ons-tabbar swipeable>
                <template slot="pages">
                    <transition>
                        <keep-alive>
                            <component :is="tab" :class="{[tab.toLowerCase()]: true}"></component>
                        </keep-alive>
                    </transition>
                </template>
            </v-ons-tabbar>
        </div>
    </layout>
</template>

<script>
    import moment from 'moment'
    import Delivery from './delivery'
    import Pay from './pay'
    import PayIframe from './iframe'
    import { mapActions, mapGetters } from 'vuex'
    import constants from '_vuex_constants'
    import ValidationHelpers from '_plugins_validation_helpers'
    import ScreenStatusPay from '_screen_shop_pay_success'

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
                tab: 'Pay',
                delivery: {},
            }
        },
        computed: {
            ...mapGetters({
                profile: constants.MrewardProfile.Getters.userProfile,
                countries: constants.MrewardGeo.Getters.countries,
            }),
        },
        async created () {
            this.$bus.$on('goToPay', this.sendToPay.bind(this))
            this.$bus.$on('goToTabCheckout', this.goToTabCheckout.bind(this))
            this.$bus.$on('goToPayStatus', this.goToPayStatus.bind(this))

            try {
                // await this.getDeliveryList()

                // const result = await this.preCheck()
                //
                // await this.paymentUrl(result)

                // this.goToPay()
            } catch (e) {
                this.$Alert.Error(e)
            }

            this.loading = false
        },
        beforeDestroy() {
            this.$bus.$off('goToPay', this.sendToPay.bind(this))
            this.$bus.$off('goToTabCheckout', this.goToTabCheckout.bind(this))
            this.$bus.$off('goToPayStatus', this.goToPayStatus.bind(this))
        },
        methods: {
            ...mapActions({
                popPage: constants.App.Actions.popPage,
                pushPage: constants.App.Actions.pushPage,
                popToPage: constants.App.Actions.popToPage,
                getCountries: constants.MrewardGeo.Actions.getCountries,
                preCheck: constants.MrewardShop.Actions.preCheck,
                paymentUrl: constants.MrewardShop.Actions.paymentUrl,
                checkConfirm: constants.MrewardShop.Actions.checkConfirm,
                onlineStoreApplication: constants.MrewardShop.Actions.onlineStoreApplication,
                getCityById: constants.MrewardGeo.Actions.getCityById,
                clearCart: constants.MrewardShop.Actions.clearCart,
            }),
            setActiveTab(name) {
                this.tab = name;
            },
            goToTab(name) {

            },
            goToTabCheckout(name, data) {
                this.tab = name
                this.delivery = data
            },
            async sendToPay(method, bonuses, totalAmount) {
                try {
                    const preCheckData = await this.preCheck({
                        type: 'card',
                        bonuses: bonuses
                    })

                    await this.paymentUrl(preCheckData)
                    this.setActiveTab('PayIframe')

                    await this.onlineStoreApplication({
                        address: this.delivery.address,
                        pre_check_id: preCheckData.pre_check_id,
                        date: this.delivery.date ? moment(this.delivery.date, 'YYYY-MM-DD').format('DD-MM-YYYY') : '',
                        info: this.delivery.comment,
                        time_from: this.delivery.time,
                    })
                } catch (e) {
                    this.$Alert.Error(e)
                }
            },
            async goToPayStatus(data) {
                await this.clearCart()

                this.pushPage({
                    extends: ScreenStatusPay,
                    options: {
                        animation: 'lift'
                    },
                })
            },
            goToPay() {
                this.setActiveTab('PayIframe')
            },
            onBack() {
                if (this.tab === 'Pay') {
                    this.popPage()
                } else if (this.tab === 'PayIframe') {
                    this.tab = 'Pay'
                }
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
            padding: 0;
        }

        .checkout-content {
            display: flex;
            flex: 1;
            position: relative;

            .tabbar__content {
                .page__content {
                    padding: 16px;
                }
            }
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

            .page__content {
                padding-top: 10px;
            }
            /*padding-top: 10px;*/
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
            justify-content: space-between;
            border-bottom: solid 1px #F5F7FA;
            padding: 16px;

            &__item {
                display: flex;
                align-items: center;
                &:nth-child(2) {
                    padding: 0 16px;
                }

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

                    i {
                        font-size: 8px;
                    }
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
                    flex: 1;

                    .checkout-step__item__title {
                        display: block;
                    }
                    .checkout-step__item__number {
                        background: #6D0978;
                        color: #FFFFFF;
                    }
                }

                &--success {
                    .checkout-step__item__number {
                        background: #6D0978;
                        color: #FFFFFF;
                    }
                }
            }
        }

        .v-text-field {
            margin-top: 16px;
        }
    }
</style>
