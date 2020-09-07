<template>
    <layout
            :title="$t('m_shop_orders')"
            page="orders"
    >

        <div   v-for="(item, i) in orders"
               :key="i"
               class="order-item"
               @click="goToHistoryDetails(item)"
        >
            <div class="order-item__name">{{`${$t('m_shop_order')} №${item.precheck_id}`}}</div>

            <template v-if="item.application_details.application_delivery_address">
                <div class="order-item__title">{{$t('m_shop_address_delivery')}}</div>
                <div class="order-item__value">{{item.application_details.application_delivery_address}}</div>

                <div class="order-item__title">{{$t('m_shop_date_delivery')}}</div>
                <div class="order-item__value">{{getDate(item.application_details)}}</div>
            </template>

            <div class="order-item__timeline">
                <div class="order-item__timeline__item timeline__item--active"
                :class="{'timeline__item--current': item.check_status === 0}">
                    <span class="order-item__timeline__name-status" >
                        {{$t('m_shop_status_new')}}
                    </span>
                </div>
                <div class="order-item__timeline__item"
                     :class="{
                    'timeline__item--active': item.check_status >= 1,
                    'timeline__item--current': item.check_status === 1,
                    }">
                    <span class="order-item__timeline__name-status" >
                        {{$t('m_shop_status_inprogress')}}
                    </span>
                </div>
                <div class="order-item__timeline__item"
                     :class="{
                    'timeline__item--active': item.check_status >= 2,
                      'timeline__item--current': item.check_status >=2}">
                    <span v-if="item.check_status === 2"
                          class="order-item__timeline__name-status" >
                        {{$t('m_shop_status_success')}}
                    </span>
                    <span v-if="item.check_status === 3"
                          class="order-item__timeline__name-status" >
                        {{$t('m_shop_status_cancel')}}
                    </span>
                </div>
<!--                <div class="order-item__timeline__item"-->
<!--                     :class="{'timeline__item&#45;&#45;active': item.check_status === 3}">-->
<!--                    <span class="order-item__timeline__name-status" >-->
<!--                        {{item.check_status_name}}-->
<!--                    </span>-->
<!--                </div>-->

                <div class="order-item__timeline__line"></div>
            </div>
        </div>

    </layout>
</template>

<script>
    import ProductItem from '../components/product-item'
    import { mapActions, mapGetters } from 'vuex'
    import constants from '_vuex_constants'
    import moment from 'moment'
    const ScreenOrderDetails = () => import('_screen_order_details')

    export default {
        name: 'screen-shop-orders',
        components: {
            ProductItem,
        },
        data () {
            return {
                loading: true,
            }
        },
        computed: {
            ...mapGetters({
                orders: constants.MrewardShop.Getters.orders,
            }),

            listData() {
                if (!this.orders.length) {
                    return []
                }

                let list = this.orders
                // if (this.search) {
                //     list = list.filter(item => item.product_name.toLowerCase().includes(this.search.toLowerCase()))
                //
                //     if (!list.length) {
                //         return []
                //     }
                // }
                //
                // return list.map((item) => {
                //     const productCart = this.cart.find(c => c.data.art_id === item.art_id)
                //
                //     return {
                //         id: item.id,
                //         name: item.product_name,
                //         price: item.product_price,
                //         wight: '',
                //         img: item.images[0] ? item.images[0].mobile_420_420 : '',
                //         top: item.top,
                //         count: productCart ? productCart.count : 0,
                //         data: item,
                //     }
                // });
            }
        },

        async created () {
            try {
                await this.getOrders()
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
                getOrders: constants.MrewardShop.Actions.getOrders,
            }),

            getDate(data) {
               if(data) {
                   return moment(`${data.application_delivery_date} ${data.application_delivery_time_to}`, 'DD-MM-YYYY HH:mm').format('DD MMMM, HH:mm')
               }

               return ''
            },
            goToHistoryDetails(item) {
                const $this = this

                this.pushPage({
                    extends: ScreenOrderDetails,
                    props: {
                        history: {
                            type: Object,
                            default: () => {
                                return {
                                    ...item,
                                    name: `${$this.$t('m_shop_order')} №${item.precheck_id}`,
                                    products: item.check_details,
                                    sumTotal: item.pay_sum,
                                    accruedBonuses: item.bonus_accrued,

                                }
                            }
                        }
                    }
                })
            },

        },
    }
</script>

<style lang="scss">
    .page[page="orders"] {

        .order-item {
            background: #FFFFFF;
            box-shadow: 0px 8px 15px rgba(39, 45, 45, 0.06);
            border-radius: 8px;
            padding: 16px 16px 40px;
            position: relative;
            margin: 8px 0;

            &__name {
                font-style: normal;
                font-weight: 600;
                font-size: 15px;
                line-height: 20px;
                letter-spacing: -0.24px;
                color: #000000;
            }
            &__title {
                font-style: normal;
                font-weight: normal;
                font-size: 12px;
                line-height: 16px;
                color: rgba(60, 60, 67, 0.6);
                padding: 8px 0 4px 0;
            }

            &__value {
                font-style: normal;
                font-weight: normal;
                font-size: 15px;
                line-height: 20px;
                letter-spacing: -0.24px;
                color: #000000;
            }

            &__timeline {
                display: flex;
                justify-content: space-between;
                align-items: center;

                &__name-status {
                    display: none;
                }
                &__item {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #CECED2;
                    position: relative;
                    box-shadow: 0 0 0 5pt #fff;
                    z-index: 10;

                }

                &__line {
                    position: absolute;
                    height: 1px;
                    background: #6D0978;
                    left: 16px;
                    right: 16px;

                    &:before {
                        content: '';
                        position: absolute;
                        height: 1px;
                        background: #6D0978;
                        left: 10px;
                        right: 10px;
                    }
                }
            }

            .timeline__item--active {
                background: #6D0978;
            }

            .timeline__item--current {
                width: 18px;
                height: 18px;

                z-index: 10;
                border: 3px solid #fff;
                border-radius: 50%;
                box-shadow: 0 0 0 1pt rgba(109, 9, 120, 0.5);

                &:before {
                    content: '';
                    /*background: #fff;*/
                    width: 28px;
                    height: 20px;
                    position: absolute;
                    z-index: 4;
                    left: -8px;
                    top: -4px;
                }

                .order-item__timeline__name-status {
                    display: block;

                    position: absolute;
                    font-weight: 600;
                    font-size: 12px;
                    line-height: 16px;
                    text-align: center;
                    color: #000000;

                    transform: translateX(-47%);
                    width: max-content;
                    top: 20px;
                }
            }


        }
        /*ons-toolbar {*/
        /*    background: #fff !important;*/
        /*}*/

        /*.page__content {*/
        /*    padding: 0 !important;*/
        /*    flex: 1;*/
        /*    display: flex;*/
        /*    flex-direction: column;*/
        /*}*/

        /*.content-wrap {*/
        /*    padding: 8px 16px;*/
        /*    flex: 1;*/
        /*    overflow: scroll;*/
        /*}*/

        /*.toolbar__wrapper {*/
        /*    !*padding-right: 0 !important;*!*/
        /*    padding-bottom: 12px;*/
        /*}*/

        /*.toolbar--search {*/

        /*}*/
    }
</style>
