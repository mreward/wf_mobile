<template>
    <div class="product-cart-item__wrap">
        <div class="product-cart-item__image"
             :style="`background-image: url('${item.img}')`">
        </div>

        <div class="product-cart-item__content">
            <div class="product-cart-item__info">
                <span class="product-cart-item__name">{{item.name}}</span>
                <span class="product-cart-item__price">{{totalAmount}}</span>
            </div>
            <div class="product-cart-item__bottom">
                <span class="product-cart-item__wight">1 x {{item.price}} c.</span>
                <div class="product-cart-item__btn-block">
                    <v-btn
                            small
                            class="btn-count"
                            @click="removeFromCart(item)"
                    >
                        <i class="icon-minus"/>
                    </v-btn>
                    <span class="product-cart-item__btn-block__count">{{item.count}}</span>
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
    import { mapActions } from 'vuex'
    import constants from '_vuex_constants'

    export default {
        name: 'product-cart-item',
        props: {
            item: {
                type: Object,
                default: {
                    count: 0,
                }
            },
        },
        computed: {
            totalAmount() {
                return this.item.count * this.item.price
            }
        },
        methods: {
            ...mapActions({
                addToCart: constants.MrewardShop.Actions.addToCart,
                removeFromCart: constants.MrewardShop.Actions.removeFromCart,
            }),
        },
    }
</script>

<style lang="scss">
    .product-cart-item {
        &__wrap {
            width: 100%;
            /*height: 80px;*/
            /*border-radius: 8px;*/
            /*background-color: #fff;*/
            /*margin: 8px 0;*/
            display: flex;
            justify-content: space-between;
            align-items: center;
            /*box-shadow: 0px 8px 15px rgba(39, 45, 45, 0.06);*/
            position: relative;
            padding: 16px 0;
            border-bottom: 1px dashed #CECED2;
        }

        &__content {
            display: flex;
            flex-direction: column;
            /*padding: 16px;*/
            margin-left: 16px;
            height: 100%;
            width: 100%;
            justify-content: space-between;
        }

        &__info {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
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
        }

        &__price{
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
            height: 60px;
            width: 60px;
            min-width: 60px;
            border-radius: 8px;
            overflow: hidden;
            background-size: cover;
            background-position: center;
        }
    }
</style>
