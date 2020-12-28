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
    import Illustration from '_screen_shop_img/cancel-order-illustration.svg'

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
                isSendToPay: false,
            }
        },
        computed: {
            ...mapGetters({
                profile: constants.MrewardProfile.Getters.userProfile,
                countries: constants.MrewardGeo.Getters.countries,
                country: constants.MrewardShop.Getters.country,
                profileFields: constants.MrewardProfile.Getters.profileFields
            }),
        },
        async created () {
            this.$bus.$on('goToPay', this.sendToPay)
            this.$bus.$on('goToTabCheckout', this.goToTabCheckout)
            this.$bus.$on('goToPayStatus', this.goToPayStatus)

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
        beforeDestroy () {
          this.$bus.$off('goToPay', this.sendToPay)
          this.$bus.$off('goToTabCheckout', this.goToTabCheckout)
          this.$bus.$off('goToPayStatus', this.goToPayStatus)

          this.hideKeyboard()
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
                const isEmptyProfileData = this.profileFields.find((item) => {
                    return item.required && !this.profile[item.key]
                })
                if (isEmptyProfileData && bonuses) {
                    this.$Alert.Confirm({
                        img: Illustration,
                        title: this.$t('m_shop_profile_check'),
                        nextName: this.$t('m_profile'),
                        cancelName: this.$t('m_close'),
                        nextEvent: async () => {
                            this.$bus.$emit('goToPage', { page: 'edit-profile' })
                        }
                    })
                    return false;
                }

                try {
                    if (!this.isSendToPay) {
                        this.isSendToPay = true
                        const preCheckData = await this.preCheck({
                            type: 'card',
                            bonuses: bonuses,
                        })

                        await this.paymentUrl(preCheckData)

                        this.setActiveTab('PayIframe')

                        if (!this.profile.mobile.startsWith('996')) {
                            await this.onlineStoreApplication({
                                address: this.delivery.address,
                                pre_check_id: preCheckData.pre_check_id,
                                date: this.delivery.date
                                    ? moment(this.delivery.date, 'YYYY-MM-DD').format('DD-MM-YYYY')
                                    : '',
                                info: this.delivery.comment,
                                time_from: this.delivery.time,
                            })
                        }

                        setTimeout(() => {
                            this.isSendToPay = false
                        }, 1000)
                    }
                } catch (e) {
                    this.$Alert.Error(e)
                    this.isSendToPay = false
                }
            },
            async goToPayStatus(data) {
                if (data.status === 'success') {
                    await this.clearCart()

                    this.pushPage({
                        extends: ScreenStatusPay,
                        options: {
                            animation: 'lift'
                        }
                    })
                } else if (data.status === 'error' || data.status === 'fail') {
                    if (data.message) {
                        this.$bus.$emit('showStatusPopover', { status: 2, title: data.message })
                    }
                    this.popPage()
                    this.$bus.$emit('showCart')
                }

                this.hideKeyboard()
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
