<template>
    <layout
            :layout="layout"
            :title="$t('m_shop_title')"
            buttonLeft="none"
            page="shop"
    >

        <template slot="toolbar">
            <div class="toolbar toolbar--search toolbar--shop">
                <div class="tabbar-button__wrapper">
                    <div class="country-row">
                        <span class="country-row__title">
                             Страна доставки
                        </span>
                        <v-btn
                                small
                                class="v-btn-rounded--small margin-left--small-base btn-country"
                                v-on="onSelectCountry"
                        >
                            <img v-if="country"
                                 class="flag"
                                 :src="country"
                                 alt="">
                            <i class="icon-next-page right currency-right "/>
                        </v-btn>
                    </div>

                    <div class="tabbar-button">
                        <div class="tabbar-button__item"
                             :class="{'tabbar-button__item--active': tab === 'top'}"
                             @click="setActiveTab('top', 0)">
                            <div class="tabbar-button__title">
                                {{$t('m_adresses_list')}}
                            </div>
                        </div>
                        <div class="tabbar-button__item"
                             :class="{'tabbar-button__item--active': tab === 'catalog'}"
                             @click="setActiveTab('catalog', 1)">
                            <div class="tabbar-button__title">
                                {{$t('m_adresses_map')}}
                            </div>
                        </div>
                        <div class="tabbar-button__item"
                             :class="{'tabbar-button__item--active': tab === 'favorite'}"
                             @click="setActiveTab('favorite', 2)">
                            <div class="tabbar-button__title">
                                {{$t('m_adresses_map')}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="toolbar__wrapper">
                    <v-text-field
                            ref="inputSearch"
                            slot="title"
                            v-model="search"
                            solo
                            :label="$t('m_adresses_search')"
                            class="input--search"
                            prepend-inner-icon="icon-search"
                            hide-details
                    />

                    <transition name="slide-fade">
                        <v-btn
                                v-show="showCancelButton"
                                text
                                depressed
                                @click="cleareSearchField"
                        >
                            {{ $t('m_adresses_cancel') }}
                        </v-btn>
                    </transition>

                    <v-btn
                            small
                            class="btn-filters"
                    >
                        <i class="icon-filters"/>
                    </v-btn>
                </div>
                <v-btn
                        small
                        class="btn-constructor"
                >
                    <img :src="ImgConstructor"/>
                    <span>Конструктор тортов</span>
                </v-btn>

            </div>
        </template>

        <div class="shop-content">
            <v-ons-tabbar swipeable>
                <template slot="pages">
                    <transition>
                        <keep-alive>
                            <component :is="tab"></component>
                        </keep-alive>
                    </transition>
                </template>

            </v-ons-tabbar>

        </div>


    </layout>
</template>

<script>
    import ScreenShopMixin from '_screen_shop_mixin'
    import ShopIllustration from '_screen_shop_img/shop-illustration.svg'
    import ImgConstructor from '_screen_shop_img/constructor.svg'
    import ProductItem from '../components/product-item'
    import Catalog from './catalog'
    import Favorite from './favorite'
    import Top from './top'

    export default {
        name: 'screen-shop',
        components: {
            ProductItem,
            Catalog,
            Favorite,
            Top
        },
        mixins: [
            ScreenShopMixin
        ],
        data () {
            return {
                img: ShopIllustration,
                ImgConstructor
            }
        },
    }
</script>

<style lang="scss">
    .page[page="shop"] {
        .page__content {
            padding: 0;
            padding-bottom: 34px;

            .not-found-items {
                height: 30px;
                min-height: 30px;
                margin: -62px;
            }
        }

        .toolbar-main__left {
            width: 0px;
        }

        .page__background {
            background: #ffffff;
        }

        .toolbar__wrapper {
            padding-right: 0px;
        }
    }

    .shop-content {
        margin-top: 274px;
        padding: 16px;
        background-color: #F5F7FA;
        height: 100%;
    }

    .toolbar.toolbar--shop {
        display: flex;
        flex-direction: column;
        height: 230px;
    }

    .country-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 0 18px;

        &__title {
            font-family: 'SF Pro Display';
            font-style: normal;
            font-weight: 600;
            font-size: 22px;
            line-height: 24px;
            letter-spacing: 0.4px;

            color: #000000;
        }
    }

    .btn-country {
        width: 48px !important;
        height: 20px !important;
        background-color: #F5F7FA !important;
        border-radius: 16px;

        .v-btn__content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 7px;
        }

        img {
            width: 18px;
            height: 12px;
        }

        i {
            position: relative;
            top: unset;
            right: unset;
            font-size: 10px;
            transform: rotate(90deg);
            color: #000;
        }
    }

    .btn-constructor {
        background: #F5F7FA !important;
        border-radius: 8px !important;
        width: calc(100% - 32px) !important;
        margin: 10px 16px;
        height: 43px !important;
        box-shadow: unset !important;
        padding: 0 16px;
        justify-content: start;
        img {
            height: 20px;
            margin-right: 12px;
        }

        span {
            font-style: normal;
            font-weight: 600;
            font-size: 13px;
            line-height: 20px;
            letter-spacing: -0.208px;
            color: #000000;
        }
    }



    .btn-filters {
        background-color: unset !important;
        border-radius: 50%;
        box-shadow: unset !important;
        padding: 0 16px !important;
        &:before {
            background-color: unset !important;
        }

        i {
            font-size: 20px;
        }
    }
</style>
