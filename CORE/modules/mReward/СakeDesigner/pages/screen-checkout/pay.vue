<template>
    <v-ons-page shown>
        <div class="page__content">
            <div class="checkout-pay">
                <div class="will-change--helper">
                    <v-select
                        v-model="paymentMethod"
                        :items="methods"
                        class="tile-selected"
                        :label="$t('m_shop_payment_methods')"
                        item-text="name"
                        item-value="type"
                        :menu-props="{maxHeight: 400}"
                        @change="$emit('hideError')"
                    />

                    <div class="checkout-pay__pre-check">
                        <div class="checkout-pay__pre-check__title">
                            {{ $t('m_shop_payment_amount') }}
                        </div>
                        <div class="checkout-pay__pre-check__value">
                            {{ totalAmountCart }} {{ country.config.currency }}
                        </div>
                    </div>
                    <div class="checkout-pay__pre-check">
                        <div class="checkout-pay__pre-check__title">
                            {{ $t('m_shop_payment_delivery_amount') }}
                        </div>
                        <div class="checkout-pay__pre-check__value">
                            {{ delivery.price }} {{ country.config.currency }}
                        </div>
                    </div>

                    <div
                        v-if="paymentMethod !== 'cash'"
                        class="checkout-pay__pre-check"
                    >
                        <div class="checkout-pay__pre-check__title">
                            {{ $t('m_shop_payment_bonuses_to_pay') }}

                            <div class="checkout-pay__pre-check__hint">
                                {{ $t('m_shop_payment_available_amount', '', {
                                    balance: balanceBonuse.avialable || 0,
                                    currency: balanceBonuse.currency || `B${country.code.toUpperCase()}`,
                                    available: totalAvailableBonuses || 0,
                                }) }}
                            </div>
                        </div>
                        <div class="checkout-pay__pre-check__value">
                            <v-text-field
                                v-model="bonuses"
                                v-mask="maskNumeric"
                                outlined
                                autocapitalize="off"
                                autocomplete="off"
                                autocorrect="off"
                                placeholder="0"
                                type="number"
                                :max="totalAvailableBonuses"
                                @focus="$emit('hideError')"
                            />
                        </div>
                    </div>

                    <div class="product-details__devider" />

                    <div class="checkout-pay__pre-check checkout-pay__pre-check--total">
                        <div class="checkout-pay__pre-check__title">
                            {{ $t('m_shop_payment_amount_to_pay') }}
                        </div>
                        <div class="checkout-pay__pre-check__value">
                            {{ totalAmount }} {{ country.config.currency }}
                        </div>
                    </div>

                    <div
                        v-if="paymentMethod === 'cash'"
                        class="delivery__info"
                    >
                        <div class="delivery__info__icon">
                            <i class="icon-info" />
                        </div>
                        <div class="delivery__info__text">
                            Дорогой друг! Спешим сообщить, что при оплате заказа наличными бонусные баллы в мобильном
                            приложении не начисляются. Также, при оплате наличными, нельзя совершить частичную оплату
                            заказа бонусными баллами. Приносим извинения за доставленные неудобства!
                        </div>
                    </div>
                </div>

                <div class="checkout-pay__btn-pay">
                    <v-btn
                        block
                        depressed
                        color="primary"
                        type="main"
                        @click="nextPage"
                    >
                        {{ $t('m_next') }}
                    </v-btn>
                </div>
            </div>
        </div>
    </v-ons-page>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import constants from '_vuex_constants'
    import InputBase from '_CORE/components/common/inputs/input-base'
    import { maskNumeric } from '_masks'
    import { get, sumBy } from 'lodash'

    export default {
        name: 'checkout-pay',
        components: {InputBase},
        mixins: [],
        data () {
            return {
                errorMessages: {},
                bonuses: '',
                paymentMethod: 'card',
                methods: [
                    {
                        name: 'Банковская карта',
                        type: 'card'
                    }
                    // {
                    //     name: 'Наличные',
                    //     type: 'cash'
                    // }
                ],
                preCheckData: {},
                maskNumeric
            }
        },
        computed: {
            ...mapGetters({
                accounts: constants.MrewardAccount.Getters.accounts,
                deliveryList: constants.MrewardShop.Getters.deliveryList,
                profile: constants.MrewardProfile.Getters.userProfile,
                countries: constants.MrewardGeo.Getters.countries,
                // cart: constants.MrewardShop.Getters.cart,
                order: constants.MrewardСakeDesigner.Getters.order,
                country: constants.MrewardShop.Getters.country
            }),
            totalAmountCart () {
                return sumBy([
                    this.order.filling.item,
                    this.order.decor.item,
                    this.order.lettering.item
                ], item => {
                    return get(item, 'price', 0)
                })
            },
            delivery () {
                return this.deliveryList[0] || {}
            },
            totalAmount () {
                if (this.paymentMethod === 'cash') {
                    return this.totalAmountCart + (this.delivery.price || 0)
                } else {
                    return this.totalAmountCart + (this.delivery.price || 0) - this.bonuses
                }
            },
            balanceBonuse () {
                const balance = this.accounts.find(i => i.currency === `B${this.country.code}`)
                return balance || {}
            },
            totalAvailableBonuses () {
                if (this.preCheckData.receipt_details) {
                    let total = this.preCheckData.receipt_details.reduce((result, item) => {
                        let limit = get(item, 'discount_limit', 0)
                        return result + limit
                    }, 0)

                    const avialable = parseFloat(this.balanceBonuse.avialable.replace(',', '.'))
                    if (total > (avialable || 0)) {
                        total = avialable || 0
                    }

                    return total
                }

                return 0
            }
        },
        watch: {
            paymentMethod: {
                handler (val) {
                    this.updatePreCheck()
                },
                immediate: true
            },
            bonuses (value) {
                const b = parseInt(value)
                if (b > this.totalAvailableBonuses) {
                    this.bonuses = this.totalAvailableBonuses
                } else if (b <= 0) {
                    this.bonuses = 0
                }
            }
        },
        methods: {
            ...mapActions({
                getCountries: constants.MrewardGeo.Actions.getCountries,
                getCityById: constants.MrewardGeo.Actions.getCityById,
                pushPage: constants.App.Actions.pushPage,
                // preCheck: constants.MrewardShop.Actions.preCheck,
                preCheck: constants.MrewardСakeDesigner.Actions.preCheck
            }),

            async updatePreCheck () {
                this.preCheckData = await this.preCheck({
                    type: this.paymentMethod
                })
            },
            async nextPage () {
                this.$bus.$emit('goToPay', this.paymentMethod, this.bonuses, this.totalAmount)
            }
        }
    }
</script>

<style lang="scss">
    .checkout-pay {
        .product-details__devider {
            margin: 12px 0 !important;
        }

        &__pre-check {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 4px 0;

            &__title {
                font-style: normal;
                font-weight: normal;
                font-size: 13px;
                line-height: 18px;
                letter-spacing: -0.078px;
                color: #000000;
                padding-right: 8px;
            }

            &__value {
                font-style: normal;
                font-weight: 600;
                font-size: 15px;
                line-height: 20px;
                letter-spacing: -0.24px;
                color: #000000;
            }

            &--total {
                .checkout-pay__pre-check {
                    &__title {
                        font-style: normal;
                        font-weight: 600;
                        font-size: 17px;
                        line-height: 24px;
                        letter-spacing: 0.2px;
                        color: #000000;
                    }

                    &__value {
                        font-style: normal;
                        font-weight: 600;
                        font-size: 17px;
                        line-height: 24px;
                        letter-spacing: 0.2px;
                        color: #6D0978;
                    }
                }
            }

            &__hint {
                font-style: normal;
                font-weight: normal;
                font-size: 12px;
                line-height: 16px;
                color: rgba(60, 60, 67, 0.6);
            }

            .v-text-field--outlined fieldset {
                border: 1px solid #000000;
                box-sizing: border-box;
                border-radius: 8px;
            }

            .v-text-field__slot input {
                font-style: normal;
                font-weight: normal;
                font-size: 15px;
                line-height: 20px;
                text-align: center;
                letter-spacing: -0.24px;
                color: #000000;
            }

            .v-input {
                height: 54px;
                width: 94px;
            }

            .v-text-field--outlined > .v-input__control > .v-input__slot {
                min-height: 49px;
            }
        }

        &__btn-pay {
            margin-top: 16px;
        }
    }
</style>
