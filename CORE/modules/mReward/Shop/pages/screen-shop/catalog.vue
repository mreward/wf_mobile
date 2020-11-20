<template>
    <v-ons-page>
        <div class="page__content" @scroll="scrollContent">
            <template v-if="!mode && !loader">
                <v-ons-list
                        v-for="(item, index) in listGroup"
                        :key="item.created_at"
                        class="dropdown-list catalog-list"
                >
                    <v-ons-list-item
                            ref="dropdownList"
                            class="dropdown-list__item catalog-item"
                            :expandable="!!item.child.length"
                            @click="() => !!item.child.length ? () => {} :  goToProducts(item)"
                    >
                        <div class="center catalog-item__name">
                            <div class="catalog-item__image"
                                 :style="`background-image: url('${getImg(item)}')`">
                            </div>
                            <div style="flex: 1;">{{ item.name }}</div>
                        </div>
                        <div class="dropdown-list__content expandable-content">
                            <div
                                    v-for="(listItem, indexItem) in item.child"
                                    :key="listItem.created_at"
                                    class="catalog-item__info-wrap"
                                    @click="goToProducts(listItem)"
                            >
                                <div class="catalog-item__info-point-wrap">
                                    <div class="catalog-item__info-point" />
                                </div>
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
                    v-else-if="productSearchLoader || loader"
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
    import sortBy from 'lodash/sortBy'

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
                loader: true,
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
            listGroup() {
                const activeItems = this.productsGroups.filter(item => item.view_is_online)
                const items = sortBy(activeItems, 'parent_id')
                const list = []

                items.forEach((item) => {
                    if (item.parent_id === 0) {
                        list.push({
                            ...item,
                            child: [],
                        })
                    } else {
                        const parent = list.find(el => el.group_id === item.parent_id)
                        if(parent) {
                            parent.child.push(item);
                        } else {
                            list.push({
                                ...item,
                                child: [],
                            })
                        }
                    }
                })

                return list;
            },
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

            this.loader = false;
        },
        methods: {
            ...mapActions({
                popPage: constants.App.Actions.popPage,
                pushPage: constants.App.Actions.pushPage,
                popToPage: constants.App.Actions.popToPage,
                getCountries: constants.MrewardGeo.Actions.getCountries,
                getProductsGroups: constants.MrewardShop.Actions.getProductsGroups
            }),
            getImg(item) {
                if(item && item.images && item.images[0]) {
                    return item.images[0].mobile_420_420 || item.images[0].image_url_mobile
                }
                return '';
            },
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
                height: 56px !important;
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
            /*text-shadow: 0 0 black;*/
        }
        &__image {
            background: #F5F7FA;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 16px;
            background-size: 100%;
            background-repeat: no-repeat;
            background-position: center;
        }

        &__name {
            font-style: normal;
            font-weight: 600;
            font-size: 15px;
            line-height: 20px;
            letter-spacing: -0.24px;
            color: #6D0978;
            flex: 1;
            order: 1;
            align-self: center;
            margin: 16px 0px;
        }

        &__info-wrap {
            /*background: #FFFFFF;*/
            /*box-shadow: 0px 8px 15px rgba(39, 45, 45, 0.06);*/
            /*border-radius: 8px;*/
            /*margin: 8px 0 8px 0px;*/
            padding: 0 16px;
            height: 55px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #CECED2;

            &:last-child {
                margin-bottom: 2px !important;
                border-bottom: none;
            }
        }

        &__info-sub {
            &__name {
                font-weight: 600;
                font-size: 13px;
                line-height: 38px;
                letter-spacing: -0.08px;
                color: #000;
            }
        }

        &__info-point-wrap {
            width: 38px;
            height: 38px;
            margin-right: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        &__info-point {
            background: #6D0978;
            border-radius: 100px;
            width: 6px;
            height: 6px;
        }
    }
</style>
