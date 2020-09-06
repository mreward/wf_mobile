<template>
    <layout
            page="product-details"
    >

        <template v-if="!loader">
            <div class="product-details__carusel-wrap">
                <v-ons-carousel
                        fullscreen
                        swipeable
                        auto-scroll
                        overscrollable
                        centered
                        auto-scroll-ratio="0.1"
                        item-height="250"
                        :index.sync="carouselIndex"
                >
                    <v-ons-carousel-item
                            v-for="(item, index) of product.images"
                            :key="index"
                            class="product-details__image-wrap"
                    >
                        <div class="product-details__image">
                            <img :src="item.image_url_mobile">
                        </div>
                    </v-ons-carousel-item>
                </v-ons-carousel>

                <div v-if="product.images.length > 1"
                     class="product-details__dot-wrap">
                    <div v-for="(item, index) in imgs"
                         :key="'dot-' + index"
                         class="product-details__dot-item"
                         :class="{'product-details__dot-item--active': carouselIndex === index}"
                    ></div>
                </div>
            </div>
            <toolbar-left
                    class="product-details__back"
                    :icon="'arrow'"
                    :button="'back'"
            />

            <div class="marker__favorite marker__favorite--big"
                 @click="() => {isFavorite ? removeFavorite(item) : addToFavorite(item)}"
                 :style="`background-image: url('${isFavorite ? ImgFavoritesActive : ImgFavoritesDefault}')`"/>

            <div class="product-details__wrap">
                <div class="product-details__title">
                    {{product.name}}
                </div>

                <div class="product-details__bottom">
                    <span class="product-details__price">{{product.price}} c.</span>
                    <div class="product-details__btn-block">
                        <v-btn
                                small
                                class="btn-count"
                                @click="removeFromCart(item)"
                        >
                            <i class="icon-minus"/>
                        </v-btn>
                        <span class="product-details__btn-block__count">{{itemCount}}</span>
                        <v-btn
                                small
                                class="btn-count"
                                @click="addToCart(item)"
                        >
                            <i class="icon-plus"/>
                        </v-btn>
                    </div>
                </div>

                <div class="product-details__devider"/>

                <div class="product-details__intro">
                    {{product.description}}
                </div>

                <div class="product-details__devider"/>

                <!--        <div class="product-details__category">-->
                <!--            <div class="product-details__category__header">-->
                <!--                <div class="product-details__category__icon">-->
                <!--                    <i class="icon-certificate"/>-->
                <!--                </div>-->
                <!--                <div class="product-details__category__name">-->
                <!--                    Сертификаты-->
                <!--                </div>-->
                <!--            </div>-->
                <!--            <div class="product-details__category__cotent">-->
                <!--                <img :src="ImgHalal" />-->
                <!--                <img :src="ImgKuvshin" />-->
                <!--                <img :src="ImgRumka" />-->
                <!--            </div>-->
                <!--        </div>-->

                <div class="product-details__category" v-if="product.composition">
                    <div class="product-details__category__header">
                        <div class="product-details__category__icon">
                            <i class="icon-composition"/>
                        </div>
                        <div class="product-details__category__name">
                            {{$t('m_shop_composition')}}:
                        </div>
                    </div>
                    <div class="product-details__category__cotent">
                        {{product.composition}}
                    </div>
                </div>

                <div v-if="product.content"
                     class="product-details__category">
                    <div class="product-details__category__header">
                        <div class="product-details__category__icon">
                            <i class="icon-calories"/>
                        </div>
                        <div class="product-details__category__name">
                            {{$t('m_shop_content')}}:
                        </div>
                    </div>
                    <div class="product-details__category__cotent">
                        {{product.content}}
                    </div>
                </div>

                <!--        <div class="product-details__category">-->
                <!--            <div class="product-details__category__header">-->
                <!--                <div class="product-details__category__icon">-->
                <!--                    <i class="icon-energy"/>-->
                <!--                </div>-->
                <!--                <div class="product-details__category__name">-->
                <!--                    Энергетическая ценность:-->
                <!--                </div>-->
                <!--            </div>-->
                <!--            <div class="product-details__category__cotent">-->
                <!--                445,38 ккал-->
                <!--            </div>-->
                <!--        </div>-->

                <div v-if="product.shelf_life"
                     class="product-details__category">
                    <div class="product-details__category__header">
                        <div class="product-details__category__icon">
                            <i class="icon-time"/>
                        </div>
                        <div class="product-details__category__name">
                            {{$t('m_shop_shelf_life')}}:
                        </div>
                    </div>
                    <div class="product-details__category__cotent">
                        {{product.shelf_life}}
                    </div>
                </div>

                <div v-if="product.storage"
                     class="product-details__category">
                    <div class="product-details__category__header">
                        <div class="product-details__category__icon">
                            <i class="icon-storage-conditions"/>
                        </div>
                        <div class="product-details__category__name">
                            {{$t('m_shop_storage')}}:
                        </div>
                    </div>
                    <div class="product-details__category__cotent">
                        {{product.storage}}
                    </div>
                </div>

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
        </template>

        <v-progress-circular
                v-else
                :width="7"
                :size="70"
                indeterminate
        />

    </layout>
</template>

<script>
    import ProductItem from '../components/product-item'
    import { mapActions, mapGetters } from 'vuex'
    import constants from '_vuex_constants'
    import ImgHalal from '../img/halal.png'
    import ImgKuvshin from '../img/kuvshin.png'
    import ImgRumka from '../img/rumka.png'
    import ToolbarLeft from '_CORE/components/common/toolbar/left'
    import ImgFavoritesActive from '../img/favorites-active.svg'
    import ImgFavoritesDefault from '../img/favorites-default.svg'
    import ImgDefault from '../img/empty.jpg'

    export default {
        name: 'screen-product-details',
        components: {
            ProductItem,
            ToolbarLeft,
        },
        data () {
            return {
                carouselIndex: 0,
                ImgHalal,
                ImgRumka,
                ImgKuvshin,
                ImgFavoritesActive,
                ImgFavoritesDefault,
                imgs: [
                    'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
                    'https://static.toiimg.com/thumb/72975551.cms?width=680&height=512&imgsize=881753',
                ],
                loader: true,
                product: {},
            }
        },
        computed: {
            ...mapGetters({
                productsFavorite: constants.MrewardShop.Getters.productsFavorite,
                totalCartProduct: constants.MrewardShop.Getters.totalCartProduct,
                cart: constants.MrewardShop.Getters.cart,
            }),

            isFavorite () {
                if (this.productsFavorite) {
                    return !!this.productsFavorite.find(item => item.art_id === this.item.data.art_id)
                }

                return false
            },

            itemCount () {
                const productCart = this.cart.find(c => c.data.art_id === this.item.data.art_id)
                return productCart ? productCart.count : 0
            },
        },

        async created () {
            try {
                const result = await this.getProduct(this.item)
                this.product = result.product

                if(!this.product.images[0]) {
                    this.product.images.push({
                        image_url_mobile: ImgDefault
                    })
                }
            } catch (e) {
                this.$Alert.Error(e)
            }

            this.loader = false
        },
        methods: {
            ...mapActions({
                popPage: constants.App.Actions.popPage,
                pushPage: constants.App.Actions.pushPage,
                popToPage: constants.App.Actions.popToPage,
                getCountries: constants.MrewardGeo.Actions.getCountries,
                getProduct: constants.MrewardShop.Actions.getProduct,
                setFavorite: constants.MrewardShop.Actions.setFavorite,
                removeFavorite: constants.MrewardShop.Actions.removeFavorite,
                addToCart: constants.MrewardShop.Actions.addToCart,
                removeFromCart: constants.MrewardShop.Actions.removeFromCart,
            }),
            async addToFavorite (item) {
                await this.setFavorite(item)
                this.$bus.$emit('showPopoverFavorite')
            },
        },
    }
</script>

<style lang="scss">
    .page[page="product-details"] {
        ons-toolbar {
            background: #fff !important;
        }

        .page__background {
            background: #fff;
        }

        .page__content {
            padding: 0;

            /*flex: 1;*/
            /*display: flex;*/
            /*flex-direction: column;*/
        }

        .marker__favorite {
            position: fixed;
            right: 16px;
            top: 44px;
            left: unset;
            z-index: 20;
        }

        ons-carousel.ons-swiper {
            height: 100vw;
        }

        .content-wrap {
            padding: 8px 16px;
            flex: 1;
            overflow: scroll;
        }

        .toolbar__wrapper {
            padding-right: 0 !important;
            padding-bottom: 12px;
        }

        .toolbar--search {

        }
    }

    .product-details {
        &__wrap {
            padding: 16px;
            z-index: 10;
            margin-top: calc(100vw - 30px);
            min-height: 600px;
            background: #fff;
            border-radius: 8px 8px 0px 0px;

        }

        &__carusel-wrap {
            height: 100vw;
            z-index: -1;
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
        }

        &__title {
            font-style: normal;
            font-weight: 600;
            font-size: 20px;
            line-height: 24px;
            color: #000000;
        }

        &__bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 16px;
        }

        &__btn-block {
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

        &__price {
            font-style: normal;
            font-weight: 600;
            font-size: 17px;
            line-height: 24px;
            letter-spacing: 0.2px;
            color: #6D0978;
            margin-top: 2px;
            margin-bottom: 2px;
        }

        &__devider {
            border: 1px dashed #CECED2;
            margin: 16px 0;
        }

        &__intro {
            font-style: normal;
            font-weight: normal;
            font-size: 15px;
            line-height: 20px;
            letter-spacing: -0.24px;
            color: #000000;
        }

        &__category {
            padding-bottom: 16px;

            &__header {
                display: flex;
                align-items: center;
            }

            &__icon {
                font-size: 16px;
                color: #6D0978;
            }

            &__name {
                font-style: normal;
                font-weight: normal;
                font-size: 12px;
                line-height: 16px;
                color: rgba(60, 60, 67, 0.6);
                padding-left: 12px;
            }

            &__cotent {
                font-style: normal;
                font-weight: normal;
                font-size: 15px;
                line-height: 20px;
                letter-spacing: -0.24px;
                color: #000000;
                padding-left: 28px;

                img {
                    width: 46px;
                    margin-right: 12px;
                }
            }
        }

        &__dot-wrap {
            display: flex;
            position: fixed;
            top: calc(100vw - 50px);
            justify-content: center;
            left: 0;
            right: 0;
            z-index: 0;
        }

        &__dot-item {
            background: #F5F7FA;
            width: 6px;
            height: 6px;
            margin: 3px;
            border-radius: 50%;
            transition: all 0.3s;

            &--active {
                background: #6D0978;
            }
        }

        &__image-wrap {

        }

        &__image {
            img {
                width: 100%;
            }
        }

        &__back {
            position: fixed;
            top: 44px;
            left: 16px;
            z-index: 20;

            .back-button {
                justify-content: center;
                width: 44px;
                height: 44px;
                border-radius: 50%;
                background-color: #6d0978;
                color: white;
                align-items: center;
                padding-left: unset;
                display: flex;

                .ons-icon {
                    font-size: 20px;
                }
            }
        }
    }

</style>
