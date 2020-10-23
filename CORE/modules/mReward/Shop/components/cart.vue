<template>
    <v-ons-action-sheet
            :visible.sync="isVisibleCart"
            cancelable
            modifier="material"
            class="action-sheet__shop-cart"
    >
        <div class="shop-cart__wrap">
            <div class="shop-cart__header">
                <div class="shop-cart__title">
                    {{$t('m_shop_cart')}}
                </div>
                <div class="shop-cart__btn-close">
                    <v-btn
                            type="fab"

                            class="mt-12 toolbar-btn--close"
                            color="primary"
                            @click="isVisibleCart = false"
                    >
                        <i class="icon icon-close"/>
                    </v-btn>
                </div>
            </div>

            <div class="shop-cart__content-header"
                 v-show="cart.length">
                <div class="shop-cart__count-title">
                    {{totalCartProduct}} {{$t('m_shop_products')}}
                </div>
                <div class="shop-cart__clear-cart">
                    <v-btn
                            text
                            depressed
                            block
                            class="margin-top--small-base v-btn--text"
                            @click="clearCart"
                    >
                        {{ $t('m_shop_clear_cart') }}
                    </v-btn>
                </div>
            </div>
            <div v-show="cart.length"
                 class="shop-cart__content">
                <div class="shop-cart__list-products">
                    <product-cart-item v-for="(item, index) in cart"
                                  :key="index"
                                       :item="item"/>
                </div>
            </div>
            <div v-show="cart.length"
                 class="shop-cart__total-wrap">
                <span class="shop-cart__total-title">{{$t('m_shop_total_amount')}}</span>
                <span class="shop-cart__total-amount">{{totalAmount}} {{country.config.currency}}</span>
            </div>


            <not-found-items
                    v-show="!cart.length"
                    :message="$t('m_shop_cart_empty')"
            />

            <div v-show="cart.length"
                 class="shop-cart__btn-pay">
                <v-btn
                        block
                        depressed
                        color="primary"
                        type="main"
                        @click="goToCheckout"
                >
                    {{ $t('m_shop_go_to_checkout') }}
                </v-btn>
            </div>
            <div v-show="!cart.length"
                 class="shop-cart__btn-pay">
                <v-btn
                        block
                        depressed
                        color="primary"
                        type="main"
                        @click="isVisibleCart = false"
                >
                    {{ $t('m_shop_go_to_catalog') }}
                </v-btn>
            </div>
        </div>
    </v-ons-action-sheet>
</template>

<script>
    import ProductCartItem from './product-cart-item'
    import { mapActions, mapGetters } from 'vuex'
    import constants from '_vuex_constants'
    import ScreenCheckout from '_screen_checkout'
    import NotFoundItems from '_not_found_items'

    export default {
        name: 'cart',
        components: {
            ProductCartItem,
            NotFoundItems
        },
        props: {
            isVisible: {
                type: Boolean,
                default: false
            },
        },
        data () {
            return {
                isVisibleCart: false,
                // listData: [
                //     {
                //         name: 'Aссорти макаронс из девяти видов',
                //         price: 180,
                //         weight: '110 г',
                //         top: true,
                //         img: 'https://www.alizy.club/wp-content/uploads/2018/03/Retsept-pechenya-makarons.jpeg',
                //     },
                //     {
                //         name: 'Aссорти макаронс из девяти видов',
                //         price: 180,
                //         weight: '110 г',
                //         top: true,
                //         img: 'https://smachno.ua/wp-content/uploads/2013/09/23/eaters-collective-219711.jpg',
                //
                //     },
                //     {
                //         name: 'Aссорти макаронс из девяти видов',
                //         price: 180,
                //         weight: '110 г',
                //         top: true,
                //         img: 'https://smachno.ua/wp-content/uploads/2013/09/23/eaters-collective-219711.jpg',
                //     },
                //     {
                //         name: 'Aссорти макаронс из девяти видов',
                //         price: 180,
                //         weight: '110 г',
                //         top: true,
                //         img: 'https://www.alizy.club/wp-content/uploads/2018/03/Retsept-pechenya-makarons.jpeg',
                //     },
                //     {
                //         name: 'Aссорти макаронс из девяти видов',
                //         price: 180,
                //         weight: '110 г',
                //         top: true,
                //         img: 'https://smachno.ua/wp-content/uploads/2013/09/23/eaters-collective-219711.jpg',
                //
                //     },
                //     {
                //         name: 'Aссорти макаронс из девяти видов',
                //         price: 180,
                //         weight: '110 г',
                //         top: true,
                //         img: 'https://smachno.ua/wp-content/uploads/2013/09/23/eaters-collective-219711.jpg',
                //     }
                // ]
            }
        },
        computed: {
            ...mapGetters({
                productsTop: constants.MrewardShop.Getters.productsTop,
                cart: constants.MrewardShop.Getters.cart,
                country: constants.MrewardShop.Getters.country,
                totalCartProduct: constants.MrewardShop.Getters.totalCartProduct,
            }),
            totalAmount() {
                return this.cart.reduce((accumulator, item) => {
                    const total = item.price * item.count
                    return accumulator + total
                }, 0)
            }
        },
        watch: {
            isVisible(value) {
                if (this.isVisibleCart !== value) {
                    this.isVisibleCart = value
                }
            },
            isVisibleCart(value) {
                this.$emit('update:isVisible', value)
            },
        },
        methods: {
            ...mapActions({
                popPage: constants.App.Actions.popPage,
                pushPage: constants.App.Actions.pushPage,
                popToPage: constants.App.Actions.popToPage,
                clearCart: constants.MrewardShop.Actions.clearCart,
            }),

            goToCheckout() {
                this.isVisibleCart = false
                this.pushPage(ScreenCheckout)
            },
        }
    }
</script>

<style lang="scss">
    .action-sheet {
        &__shop-cart {
            .action-sheet-title {
                display: none;
            }

            .action-sheet {
                bottom: 0 !important;
                background: #FFFFFF !important;
                box-shadow: 0px 8px 15px rgba(39, 45, 45, 0.06) !important;
                border-radius: 8px 8px 0px 0px !important;
                overflow: hidden;
                padding: 16px;
            }

            .shop-cart__btn-pay {
                margin-bottom: 10px;
            }
        }

        .shop-cart {
            &__wrap {
                .not-found-items {
                    padding: 42px 0 48px 0;
                }
            }

            &__header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 6px 0;
            }

            &__title {
                font-style: normal;
                font-weight: 600;
                font-size: 22px;
                line-height: 24px;
                letter-spacing: 0.4px;
                color: #000000;
            }

            &__count-title {
                font-style: normal;
                font-weight: 600;
                font-size: 17px;
                line-height: 24px;
                letter-spacing: 0.2px;
                color: #000000;
            }

            &__total-title {
                font-weight: 600;
                font-size: 17px;
                line-height: 24px;
                letter-spacing: 0.2px;
                color: #000000;
            }

            &__total-amount {
                font-weight: 600;
                font-size: 17px;
                line-height: 24px;
                letter-spacing: 0.2px;
                color: #6D0978;
            }

            &__btn-close {
                .v-btn {
                    width: 36px;
                    height: 36px;
                    min-width: 36px;
                    min-height: 36px;
                    border-radius: 50%;
                    background: #F5F7FA !important;

                    box-shadow: unset !important;

                    i {
                        color: #000;
                    }
                }
            }

            &__content-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            &__clear-cart {
                .margin-top--small-base {
                    margin: 0 !important;
                    padding: 0 !important;
                }
            }

            &__list-products {
                max-height: 60vh;
                overflow: scroll;
            }

            &__total-wrap {
                padding: 28px 0 15px 0;
                display: flex;
                justify-content: space-between;
            }
        }
    }

    html[onsflag-iphonex-portrait] {
        .action-sheet {
            &__shop-cart {
                .shop-cart__btn-pay {
                    margin-bottom: 24px;
                }
            }
        }
    }
</style>
