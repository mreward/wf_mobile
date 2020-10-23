<template>
    <v-ons-page>
        <div class="page__content" @scroll="scrollContent">
            <template v-if="!mode">
                <v-ons-list
                        v-for="(item, index) in productsGroups"
                        :key="index"
                        class="dropdown-list catalog-list"
                >
                    <v-ons-list-item
                            ref="dropdownList"
                            class="dropdown-list__item catalog-item"
                            :expandable="!!item.child.length"
                            @click="() => !!item.child.length ? () => {} :  goToProducts(item)"
                    >
                        <div class="center catalog-item__name">
<!--                            <div class="catalog-item__image"-->
<!--                                 :style="`background-image: url('${item.icon}')`">-->
<!--                            </div>-->
                            <div style="flex: 1;">{{ item.name }}</div>
                        </div>
                        <div class="dropdown-list__content expandable-content">
                            <div
                                    v-for="(listItem, indexItem) in item.child"
                                    :key="indexItem"
                                    class="catalog-item__info-wrap"
                                    @click="goToProducts(listItem)"
                            >
                                <div class="catalog-item__info-sub__name">
                                    <span class="contacts-subtitle">{{ listItem.name }}</span>
                                </div>
                            </div>
                        </div>
                    </v-ons-list-item>
                </v-ons-list>
            </template>

            <template v-else-if="!productSearchLoader && listDataSearch.length">
                <product-item
                        v-for="(item, index) in listDataSearch"
                        :key="item.data.art_id"
                        :item.sync="item"/>
            </template>

            <v-progress-circular
                    v-else-if="productSearchLoader"
                    :width="7"
                    :size="70"
                    indeterminate
            />

            <not-found-items
                    v-else
                    :message="$t('m_adresses_not_found')"
            />
        </div>
    </v-ons-page>
</template>

<script>
    import ProductItem from '../../components/product-item'
    import { mapActions, mapGetters } from 'vuex'
    import constants from '_vuex_constants'
    // import ImgDesert from '../../img/dessert.svg'
    import ScreenProducts from '_screen_products'
    import NotFoundItems from '_not_found_items'
    import debounce from 'lodash/debounce'

    export default {
        name: 'screen-shop-catalog',
        components: {
            ProductItem,
            NotFoundItems,
        },
        props: {
            mode: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
            }
        },
        computed: {
            ...mapGetters({
                productsGroups: constants.MrewardShop.Getters.productsGroups,
                productSearch: constants.MrewardShop.Getters.productSearch,
                productSearchLoader: constants.MrewardShop.Getters.productSearchLoader,
                loaderVisible: constants.App.Getters.loaderVisible,
                cart: constants.MrewardShop.Getters.cart,
            }),
            listDataSearch() {
                if (!this.productSearch.length) {
                    return []
                }

                return this.productSearch.map((item) => {
                    const productCart = this.cart.find(c => c.data.art_id === item.art_id)

                    let img = ''
                    if(item.images[0]) {
                        img = item.images[0].mobile_420_420 || item.images[0].image_url_mobile
                    }

                    return {
                        id: item.id,
                        name: item.product_name,
                        price: item.product_price,
                        wight: '',
                        img,
                        top: item.top,
                        count: productCart ? productCart.count : 0,
                        data: item,
                    }
                });
            }
        },
        watch: {
            productSearch() {

            }
        },
        async created () {
            try {
                await this.getProductsGroups()
            } catch (e) {
                this.$Alert.Error(e)
            }
        },
        methods: {
            ...mapActions({
                popPage: constants.App.Actions.popPage,
                pushPage: constants.App.Actions.pushPage,
                popToPage: constants.App.Actions.popToPage,
                getCountries: constants.MrewardGeo.Actions.getCountries,
                getProductsGroups: constants.MrewardShop.Actions.getProductsGroups
            }),
            goToProducts(item) {
                this.pushPage({
                    extends: ScreenProducts,
                    data: () => {
                        return {
                            category: item,
                        }
                    },
                })
            },
            scrollContent() {
                if (document.documentElement.attributes.getNamedItem('onsflag-keyboard-show')) {
                    this.hideKeyboard()
                }
            }
        }
    }
</script>

<style lang="scss">
    .catalog-list {
        ons-list-item {
            .list-item__top {
                background: #FFFFFF;
                /* main */

                box-shadow: 0px 8px 15px rgba(39, 45, 45, 0.06);
                border-radius: 8px;
                height: 48px !important;
            }
        }
    }
    .catalog-item {
        .list-item__expandable-content {
            overflow: visible;
        }
        .dropdown-list__content {
            margin-top: 0px !important;
            background: transparent !important;
            box-shadow: unset !important;
            border-radius: unset !important;
            padding: 0 !important;
            text-shadow: 0 0 black;
        }
        &__image {
            background: #F5F7FA;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 16px;
        }

        &__name {
            font-style: normal;
            font-weight: 600;
            font-size: 15px;
            line-height: 20px;
            letter-spacing: -0.24px;
            color: #000000;
            flex: 1;
            order: 1;
            align-self: center;
            margin: 16px 0px;
        }

        &__info-wrap {
            background: #FFFFFF;
            box-shadow: 0px 8px 15px rgba(39, 45, 45, 0.06);
            border-radius: 8px;
            margin: 8px 0 8px 32px;
            padding: 0 16px;
            height: 38px;

            &:last-child {
                margin-bottom: 2px !important;
            }
        }

        &__info-sub {
            &__name {
                font-weight: 600;
                font-size: 13px;
                line-height: 38px;
                letter-spacing: -0.208px;
                color: rgba(60, 60, 67, 0.6);

            }
        }
    }
</style>
