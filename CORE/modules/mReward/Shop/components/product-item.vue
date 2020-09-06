<template>
    <div class="product-item__wrap">
        <div class="product-item__image"
             :style="`background-image: url('${item.img || ImgDefault}')`"
             @click="goToDetails"
        />

        <div v-if="item.top" class="marker__top">
                {{$t('m_shop_top')}}
        </div>

        <div class="marker__favorite"
             @click="() => {isFavorite ? removeFavorite(item) : addToFavorite(item)}"
             :style="`background-image: url('${isFavorite ? ImgFavoritesActive : ImgFavoritesDefault}')`" />


        <div class="product-item__content">
            <div class="product-item__info" @click="goToDetails">
                <span class="product-item__name">{{item.name}}</span>
                <span class="product-item__price">{{item.price}} c.</span>
            </div>
            <div class="product-item__bottom">
                <span class="product-item__wight"> </span>
                <div class="product-item__btn-block">
                    <v-btn
                            small
                            class="btn-count"
                            @click="removeFromCart(item)"
                    >
                        <i class="icon-minus"/>
                    </v-btn>
                    <span class="product-item__btn-block__count">{{item.count}}</span>
                    <v-btn
                            small
                            class="btn-count"
                            @click="addToCart(item)"
                    >
                        <i class="icon-plus"/>
                    </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import constants from '_vuex_constants'
    import ImgFavoritesActive from '../img/favorites-active.svg'
    import ImgFavoritesDefault from '../img/favorites-default.svg'
    import ImgDefault from '../img/empty.jpg'
    import ScreenProductDetails from '_screen_product_details'


    export default {
        name: 'product-item',
        props: {
            item: {
                type: Object,
                default: {
                    count: 0,
                }
            },
        },
        data () {
            return {
                ImgDefault,
                ImgFavoritesActive,
                ImgFavoritesDefault
            }
        },
        computed: {
            ...mapGetters({
                productsFavorite: constants.MrewardShop.Getters.productsFavorite,
            }),

            isFavorite() {
                if(this.productsFavorite) {
                    return !!this.productsFavorite.find(item => item.art_id === this.item.data.art_id)
                }

                return false;
            },
        },
        methods: {
            ...mapActions({
                pushPage: constants.App.Actions.pushPage,
                addToCart: constants.MrewardShop.Actions.addToCart,
                removeFromCart: constants.MrewardShop.Actions.removeFromCart,
                setFavorite: constants.MrewardShop.Actions.setFavorite,
                removeFavorite: constants.MrewardShop.Actions.removeFavorite,
            }),
            async addToFavorite(item) {
                await this.setFavorite(item)
                this.$bus.$emit('showPopoverFavorite')
            },

            goToDetails() {
                const $this = this

                this.pushPage({
                    extends: ScreenProductDetails,
                    // data: () => {
                    //     return {
                    //         // item: this.item,
                    //     }
                    // },
                    props: {
                        item: {
                            type: Object,
                            default: () => {
                                return $this.item
                            },
                        },
                    },
                })
            }
        },
    }
</script>

<style lang="scss">
    .btn-count {
        border-radius: 50%;
        height: 30px !important;
        width: 30px !important;
        min-height: 30px !important;
        min-width: 30px !important;
        background: #F5F7FA;
        box-shadow: unset !important;
        i {
            font-size: 8px;
        }
    }

    .product-item {
        &__wrap {
            width: 100%;
            height: calc((100vw - 32px) / 2.51);
            border-radius: 8px;
            background-color: #fff;
            margin: 8px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0px 8px 15px rgba(39, 45, 45, 0.06);
            position: relative;
        }

        &__content {
            display: flex;
            flex-direction: column;
            padding: 16px;
            height: 100%;
            width: 100%;
            justify-content: space-between;
        }

        &__info {
            display: flex;
            flex-direction: column;
        }

        &__name {
            font-family: SF Pro Text;
            font-style: normal;
            font-weight: 600;
            font-size: 15px;
            line-height: 20px;
            letter-spacing: -0.24px;
            color: #000000;
            margin-bottom: 2px;
            max-height: 42px;
            overflow: hidden;
        }

        &__price {
            font-family: SF Pro Display;
            font-style: normal;
            font-weight: 600;
            font-size: 17px;
            line-height: 24px;
            letter-spacing: 0.2px;
            color: #6D0978;
            margin-top: 2px;
            margin-bottom: 2px;
        }

        &__bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 2px;
        }

        &__wight {
            font-family: SF Pro Text;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 16px;
            color: rgba(60, 60, 67, 0.6);
        }

        &__btn-block{
            display: flex;
            justify-content: center;
            align-items: center;

            button {
                margin: unset;
            }

            &__count {
                font-weight: 600;
                font-size: 15px;
                line-height: 20px;
                text-align: center;
                letter-spacing: -0.24px;
                color: #000000;
                padding: 0 16px;
            }
        }

        &__image {
            height: calc((100vw - 32px) / 2.51);
            width: calc((100vw - 32px) / 2.51);
            min-width: calc((100vw - 32px) / 2.51);
            border-radius: 8px;
            overflow: hidden;
            background-size: cover;
            background-position: center;
        }
    }

    .marker {
        &__top {
            position: absolute;
            bottom: 0;
            left: 0;
            /*height: 26px;*/
            /*width: 40px;*/
            padding: 5px;
            background: #6D0978;
            border-top-right-radius: 8px;
            border-bottom-left-radius: 8px;

            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            line-height: 16px;
            color: #FFFFFF;

            display: flex;
            justify-content: center;
            align-items: center;
        }

        &__favorite {
            background-color: rgba(255, 255, 255, 0.5);
            box-shadow: 0px 8px 15px rgba(39, 45, 45, 0.06);
            position: absolute;
            top: 8px;
            left: 8px;
            height: 30px;
            width: 30px;
            border-radius: 50%;

            background-repeat: no-repeat;
            background-position: center;
            background-size: 16px;

            &--big {
                height: 46px;
                width: 46px;
            }
        }
    }
</style>
