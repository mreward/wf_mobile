<template>
    <v-ons-page>
        <v-ons-list
                v-for="(item, index) in listData"
                :key="index"
                class="dropdown-list catalog-list"
        >
            <v-ons-list-item
                    ref="dropdownList"
                    class="dropdown-list__item catalog-item"
                    expandable
            >
                <div class="center catalog-item__name">
                    <div class="catalog-item__image"
                         :style="`background-image: url('${item.icon}')`">
                    </div>
                    {{ item.name }}
                </div>
                <div class="dropdown-list__content expandable-content">
                    <div
                            v-for="(listItem, indexItem) in item.list"
                            :key="indexItem"
                            class="catalog-item__info-wrap"
                            @click="goToProducts"
                    >
                        <div class="catalog-item__info-sub__name">
                            <span class="contacts-subtitle">{{ listItem.name }}</span>
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
    import constants from '_vuex_constants'
    import ImgDesert from '../img/dessert.svg'
    import ScreenProducts from '_screen_products'

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
                        icon: ImgDesert,
                        list: [
                            {
                                name: 'Бисквитные торты',
                            },{
                                name: 'Торты и суфле',
                            },{
                                name: 'Торты слоенные',
                            }],
                    },{
                        name: 'Печенья',
                        icon: '',
                        list: [
                            {
                                name: 'Макаронс',
                            },{
                                name: 'Безе',
                            }],
                    }
                ],
            }
        },
        async created () {
            try {
                // await this.getProductsGroups()
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
            goToProducts() {
                this.pushPage(ScreenProducts)
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
                height: 80px !important;
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
            flex: none;
            order: 1;
            align-self: center;
            margin: 16px 0px;

        }

        &__info-wrap {
                background: #FFFFFF;
                box-shadow: 0px 8px 15px rgba(39, 45, 45, 0.06);
                border-radius: 8px;
                margin: 8px 0;
            padding: 0 16px;

            &:last-child {
                margin-bottom: 2px !important;
            }
        }

        &__info-sub {
            &__name {
                font-weight: 600;
                font-size: 15px;
                line-height: 48px;
                letter-spacing: -0.24px;
                color: #000000;
            }
        }
    }
</style>
