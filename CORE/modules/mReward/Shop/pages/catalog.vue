<template>
    <v-ons-page>
       KATALOG


        <v-ons-list
                v-for="(item, index) in contacts"
                :key="index"
                class="dropdown-list"
        >
            <v-ons-list-item
                    ref="dropdownList"
                    class="dropdown-list__item"
                    expandable
            >
                <div class="center">
                    <img class="flag" v-show="item.flag" :src="item.flag" alt="">
                    {{ item.name }}
                </div>
                <div class="dropdown-list__content expandable-content">
                    <div
                            v-for="(listItem, indexItem) in item.list"
                            :key="indexItem"
                            class="contacts-info"
                            @click="listItem.click"
                    >
                        <div class="contacts-info-sub">
                            <span class="contacts-subtitle">{{ listItem.name }}</span>
                            <div>
                                <span class="contacts-lined-info">{{ listItem.value }}</span>
                                <span v-if="listItem.subtitle"
                                      class="contacts-work-ours"> {{ listItem.subtitle }}</span>
                            </div>
                        </div>
                        <div class="contacts-icon">
                            <v-btn
                                    fab
                            >
                                <i v-if="listItem.icon" :class="listItem.icon" />
                                <img
                                        v-if="listItem.img"
                                        :src="listItem.img"
                                        alt=""
                                >
                            </v-btn>
                        </div>
                    </div>
                </div>
            </v-ons-list-item>
        </v-ons-list>

    </v-ons-page>
</template>

<script>
    import ProductItem from '../components/product-item'
    import { mapActions } from 'vuex'
    import constants from '_CORE/__configs.generate__/store/constants'

    export default {
        name: 'screen-shop-catalog',
        components: {
            ProductItem
        },
        data () {
            return {
                listData: [
                    {
                        name: 'Торты',
                        childs: [{
                            name
                        }]
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
                await this.getProducts()
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
                getProducts: constants.MrewardShop.Actions.getProducts
            }),
        }
    }
</script>

<style lang="scss">
</style>
