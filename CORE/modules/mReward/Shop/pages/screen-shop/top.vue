<template>
    <v-ons-page>
        <div class="page__content">
            <template v-if="!loading && listData.length">
                <product-item
                        v-for="(item, index) in listData"
                        :key="index"
                        :item.sync="item"/>
            </template>

            <v-progress-circular
                    v-else-if="loading"
                    :width="7"
                    :size="70"
                    indeterminate
            />

            <not-found-items
                    v-else
                    :message="$t('m_shop_title_soon')"
            />
        </div>
    </v-ons-page>
</template>

<script>
    import ProductItem from '../../components/product-item'
    import { mapActions, mapGetters } from 'vuex'
    import constants from '_vuex_constants'
    import NotFoundItems from '_not_found_items'

    export default {
        name: 'screen-shop-top',
        components: {
            ProductItem,
            NotFoundItems,
        },
        data () {
            return {
                loading: true
            }
        },
        computed: {
            ...mapGetters({
                productsTop: constants.MrewardShop.Getters.productsTop,
                cart: constants.MrewardShop.Getters.cart,
            }),
            listData() {
                if (!this.productsTop.length) {
                    return []
                }

                return this.productsTop.map((item) => {
                    const productCart = this.cart.find(c => c.data.art_id === item.art_id)

                    return {
                        id: item.id,
                        name: item.product_name,
                        price: item.product_price,
                        wight: '',
                        img: item.images[0] ? item.images[0].mobile_420_420 : '',
                        top: item.top,
                        count: productCart ? productCart.count : 0,
                        data: item,
                    }
                });
            }
        },
        async created () {
            try {
                await this.getProductsTop()
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
                getProductsTop: constants.MrewardShop.Actions.getProductsTop,
            }),
        },
    }
</script>

<style lang="scss">
</style>
