<template>
    <v-ons-page>
        <product-item v-for="(item, index) in listData"
                      :key="index"
                      :item="item"/>
    </v-ons-page>

</template>

<script>
    import ProductItem from '../components/product-item'

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
                    }
                ]
            }
        },
    }
</script>

<style lang="scss">
</style>
