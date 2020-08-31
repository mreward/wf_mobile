<template>
    <layout
            :title="$t('m_profile_settings')"
            page="product-details"
    >
        <div class="product-details__title">
            Aссорти макаронс из
        </div>

        <div class="product-details__bottom">
            <span class="product-details__price">180 c.</span>
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
            Французское миндальное печенье с начинкой из белого шоколада и фисташкового крема
        </div>

        <div class="product-details__devider"/>

        <div class="product-details__category">
            <div class="product-details__category__header">
                <div class="product-details__category__icon">
                    <i class="icon-certificate"/>
                </div>
                <div class="product-details__category__name">
                    Сертификаты
                </div>
            </div>
            <div class="product-details__category__cotent">
                <img :src="ImgHalal" />
                <img :src="ImgKuvshin" />
                <img :src="ImgRumka" />
            </div>
        </div>

        <div class="product-details__category">
            <div class="product-details__category__header">
                <div class="product-details__category__icon">
                    <i class="icon-composition"/>
                </div>
                <div class="product-details__category__name">
                    Состав:
                </div>
            </div>
            <div class="product-details__category__cotent">
                мука высший сорт, яйцо куриное мука высший сорт, яйцо куриное мука высший сорт, яйцо куриное мука высший
                сорт, яйцо куриное мука высший сорт, яйцо куриное мука высший сорт, яйцо куриное мука высший сорт, яйцо
                куриное мука высший сорт, яйцо куриное
            </div>
        </div>

        <div class="product-details__category">
            <div class="product-details__category__header">
                <div class="product-details__category__icon">
                    <i class="icon-calories"/>
                </div>
                <div class="product-details__category__name">
                    В 100г продукта содержится:
                </div>
            </div>
            <div class="product-details__category__cotent">
                белков - 8,15г; жиров - 24,82г
            </div>
        </div>

        <div class="product-details__category">
            <div class="product-details__category__header">
                <div class="product-details__category__icon">
                    <i class="icon-energy"/>
                </div>
                <div class="product-details__category__name">
                    Энергетическая ценность:
                </div>
            </div>
            <div class="product-details__category__cotent">
                445,38 ккал
            </div>
        </div>

        <div class="product-details__category">
            <div class="product-details__category__header">
                <div class="product-details__category__icon">
                    <i class="icon-time"/>
                </div>
                <div class="product-details__category__name">
                    Срок хранения:
                </div>
            </div>
            <div class="product-details__category__cotent">
                5 дней, 3 мес
            </div>
        </div>

        <div class="product-details__category">
            <div class="product-details__category__header">
                <div class="product-details__category__icon">
                    <i class="icon-storage-conditions"/>
                </div>
                <div class="product-details__category__name">
                    Условия хранения:
                </div>
            </div>
            <div class="product-details__category__cotent">
                4 ± 2; -18℃
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

    </layout>

</template>

<script>
    import ProductItem from '../components/product-item'
    import { mapActions, mapGetters } from 'vuex'
    import constants from '_vuex_constants'
    import ImgHalal from '../img/halal.png'
    import ImgKuvshin from '../img/kuvshin.png'
    import ImgRumka from '../img/rumka.png'

    export default {
        name: 'screen-product-details',
        components: {
            ProductItem,
        },
        data () {
            return {
                ImgHalal,
                ImgRumka,
                ImgKuvshin
            }
        },
        computed: {
            ...mapGetters({
                productsFavorite: constants.MrewardShop.Getters.productsFavorite,
                totalCartProduct: constants.MrewardShop.Getters.totalCartProduct,
                cart: constants.MrewardShop.Getters.cart,

            }),

            isFavorite() {
                if (this.productsFavorite) {
                    return !!this.productsFavorite.find(item => item.art_id === this.item.data.art_id)
                }

                return false;
            },

            itemCount() {
                const productCart = this.cart.find(c => c.data.art_id === this.item.data.art_id)
                return productCart ? productCart.count : 0
            }
        },

        async created () {
            try {
                await this.getProduct(this.item)
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
                getProduct: constants.MrewardShop.Actions.getProduct,
                setFavorite: constants.MrewardShop.Actions.setFavorite,
                removeFavorite: constants.MrewardShop.Actions.removeFavorite,
                addToCart: constants.MrewardShop.Actions.addToCart,
                removeFromCart: constants.MrewardShop.Actions.removeFromCart,
            }),
            async addToFavorite(item) {
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
            flex: 1;
            display: flex;
            flex-direction: column;
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
    }

</style>
