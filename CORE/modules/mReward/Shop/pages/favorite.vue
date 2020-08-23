<template>
    <v-ons-page>
        <product-item v-for="(item, index) in listData"
                      :key="index"
                      :item="item"/>
    </v-ons-page>

</template>

<script>
    import ProductItem from '../components/product-item'
    import { mapActions } from 'vuex'
    import constants from '_vuex_constants'

    export default {
        name: 'screen-shop-favorite',
        components: {
            ProductItem
        },
        data () {
            return {
                listData: [
                    {
                        name: 'Aссорти макаронс из девяти видов',
                        price: 180,
                        weight: '110 г',
                        top: true,
                        img: 'https://www.alizy.club/wp-content/uploads/2018/03/Retsept-pechenya-makarons.jpeg',
                    },
                    {
                        name: 'Aссорти макаронс из девяти видов',
                        price: 180,
                        weight: '110 г',
                        top: true,
                        img: 'https://smachno.ua/wp-content/uploads/2013/09/23/eaters-collective-219711.jpg',

                    },
                    {
                        name: 'Aссорти макаронс из девяти видов',
                        price: 180,
                        weight: '110 г',
                        top: true,
                        img: 'https://smachno.ua/wp-content/uploads/2013/09/23/eaters-collective-219711.jpg',
                    },
                    {
                        name: 'Aссорти макаронс из девяти видов',
                        price: 180,
                        weight: '110 г',
                        top: true,
                        img: 'https://www.alizy.club/wp-content/uploads/2018/03/Retsept-pechenya-makarons.jpeg',
                    },
                    {
                        name: 'Aссорти макаронс из девяти видов',
                        price: 180,
                        weight: '110 г',
                        top: true,
                        img: 'https://smachno.ua/wp-content/uploads/2013/09/23/eaters-collective-219711.jpg',

                    },
                    {
                        name: 'Aссорти макаронс из девяти видов',
                        price: 180,
                        weight: '110 г',
                        top: true,
                        img: 'https://smachno.ua/wp-content/uploads/2013/09/23/eaters-collective-219711.jpg',
                    }
                ]
            }
        },
        async created () {
            try {
                await this.getProductsTop()
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
                getProductsTop: constants.MrewardShop.Actions.getProductsTop
            }),
        }
    }
</script>

<style lang="scss">
</style>
