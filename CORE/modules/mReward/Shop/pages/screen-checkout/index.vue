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
                 'checkout-step__item--active': tab === 'delivery',
                 'checkout-step__item--success': tab === 'Pay'
            }">
                <div class="checkout-step__item__number">
                    <span v-if="tab === 'delivery'">1</span>
                    <i v-if="tab === 'Pay'" class="icon-checkmark"/>
                </div>
                <div class="checkout-step__item__title">{{$t('m_shop_delivery')}}</div>
            </div>
            <div class="checkout-step__item"
                 :class="{'checkout-step__item--active': tab === 'Pay'}">
                <div class="checkout-step__item__number">2</div>
                <div class="checkout-step__item__title">{{$t('m_shop_select_pay')}}</div>
            </div>
            <div class="checkout-step__item"
                 :class="{'checkout-step__item--active': tab === 'delivary'}">
            <div class="checkout-step__item__number">3</div>
                <div class="checkout-step__item__title">{{$t('m_shop_pay')}}</div>
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
                tab: 'delivery',
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

            try {
                await this.getDeliveryList()

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
                checkConfirm: constants.MrewardShop.Actions.checkConfirm,
                onlineStoreApplication: constants.MrewardShop.Actions.onlineStoreApplication,
                getCityById: constants.MrewardGeo.Actions.getCityById
            }),
            setActiveTab(name) {
                this.tab = name;
            },
            goToTab(name) {

            },
            goToTabCheckout(name, data) {
              debugger
                this.tab = name
                this.delivery = data
            },
            async sendToPay(method, bonuses) {
                debugger

                const preCheckData = await this.preCheck({type: method})
                debugger
                const checkConfirmData = await this.checkConfirm({
                    check_number: `offline_${moment().format('X')}_`,
                    pre_check_id: preCheckData.pre_check_id,
                    money: preCheckData.payment.money,
                });
                debugger
                const onlineStoreApplicationData = await this.onlineStoreApplication({
                    address: this.delivery.address,
                    pre_check_id: preCheckData.pre_check_id,
                    date: '09-09-2020',
                    info: this.delivery.comment,
                })
                debugger

                this.pushPage(ScreenStatusPay)
            },
            goToPay() {
                this.setActiveTab('PayIframe')
            },
            onBack() {
                if (this.tab === 'delivery') {
                    this.popPage()
                } else if(this.tab === 'Pay') {
                    this.tab === 'delivery'
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
                padding: 16px;
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
            justify-content: space-between;
            border-bottom: solid 1px #F5F7FA;
            padding: 16px;
            margin-bottom: 16px;

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
    }
</style>
