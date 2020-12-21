<template>
    <layout
            :title="category.name"
            page="products"
    >
        <div class="toolbar--search">
            <div class="toolbar__wrapper">
                <v-text-field
                        ref="inputSearch"
                        slot="title"
                        v-model="search"
                        solo
                        :label="$t('m_adresses_search')"
                        class="input--search"
                        prepend-inner-icon="icon-search"
                        hide-details
                />

                <transition name="slide-fade">
                    <v-btn
                            v-show="showCancelButton"
                            text
                            depressed
                            @click="cleareSearchField"
                    >
                        {{ $t('m_adresses_cancel') }}
                    </v-btn>
                </transition>

<!--                <v-btn-->
<!--                        small-->
<!--                        class="btn-filters"-->
<!--                        @click="$bus.$emit('showFilter')"-->

<!--                >-->
<!--                    <i class="icon-filters"/>-->
<!--                </v-btn>-->
            </div>
        </div>

        <div class="content-wrap">
            <template v-if="!loading && listData.length">
                <product-item v-for="(item, index) in listData"
                              :key="index"
                              :item="item"/>
            </template>
            <v-progress-circular
                    v-else-if="loading"
                    :width="7"
                    :size="70"
                    indeterminate
            />

            <div style="height: 80px"></div>

            <div class="button-cart"
                 ref="btnCall"
                 @click="$bus.$emit('showCart')"
            >
                <i class="icon-cart"/>
                <div v-if="cart.length"
                     class="button-cart__badge">
                    {{totalCartProduct}}
                </div>
            </div>
        </div>
    </layout>

</template>

<script>
    import ProductItem from '../components/product-item'
    import { mapActions, mapGetters } from 'vuex'
    import constants from '_vuex_constants'

    export default {
        name: 'screen-shop-top',
        components: {
            ProductItem,
        },
        data () {
            return {
                search: '',
                loading: true,
                products: []
            }
        },
        computed: {
            ...mapGetters({
                cart: constants.MrewardShop.Getters.cart,
                totalCartProduct: constants.MrewardShop.Getters.totalCartProduct,
                productsCategory: constants.MrewardShop.Getters.productsCategory,
            }),

            showCancelButton () {
                return this.search.length > 0
            },

            listData() {
                if (!this.productsCategory.length) {
                    return []
                }

                let list = this.productsCategory
                if (this.search) {
                    list = list.filter(item => item.product_name.toLowerCase().includes(this.search.toLowerCase()))

                    if (!list.length) {
                        return []
                    }
                }

                return list.map((item) => {
                    const productCart = this.cart.find(c => c.data.art_id === item.art_id)

                    return {
                        id: item.id,
                        name: item.product_name,
                        price: item.product_price,
                        wight: '',
                        img: item.images[0] ? (item.images[0].mobile_420_420 || item.images[0].image_url_mobile) : '',
                        top: item.top,
                        count: productCart ? productCart.count : 0,
                        data: item,
                    }
                });
            }
        },

        async created () {
            try {
                await this.clearProductsCategory();
                await this.getProductsCategory({
                    group_id: this.category.group_id,
                })
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
                getProductsCategory: constants.MrewardShop.Actions.getProductsCategory,
                clearProductsCategory: constants.MrewardShop.Actions.clearProductsCategory,
            }),

            cleareSearchField () {
                this.search = ''
            },
        },
    }
</script>

<style lang="scss">
    .page[page="products"] {
        ons-toolbar {
            background: #fff !important;
        }

        .page__content {
            padding: 0 !important;
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .content-wrap {
            padding: 8px 16px !important;
            //flex: 1;
            height: 100%;
            overflow: scroll;
        }

        .toolbar__wrapper {
            /*padding-right: 0 !important;*/
            padding-bottom: 12px;
        }

        .toolbar--search {

        }
    }
</style>
