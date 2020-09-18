<template>
    <v-ons-page>
        <div class="page__content">
            <template v-if="!loaderVisible && listData.length">
                <product-item
                        v-for="(item, index) in listData"
                        :key="index"
                        :item.sync="item"/>
            </template>

            <v-progress-circular
                    v-else-if="loaderVisible"
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
    import NotFoundItems from '_not_found_items'

    export default {
        name: 'screen-shop-search',
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
                productSearch: constants.MrewardShop.Getters.productSearch,
                loaderVisible: constants.App.Getters.loaderVisible,
                cart: constants.MrewardShop.Getters.cart,
            }),
            listData() {
                if (!this.productSearch.length) {
                    return []
                }

                return this.productSearch.map((item) => {
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
        methods: {
            ...mapActions({
            }),
        },
    }
</script>

<style lang="scss">
</style>
