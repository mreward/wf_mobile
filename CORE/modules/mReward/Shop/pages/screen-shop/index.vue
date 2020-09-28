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
                             {{$t('m_shop_delivery_country')}}
                        </span>
<!--                        // v-on="onSelectCountry"-->
                        <v-btn
                                small
                                class="v-btn-rounded--small margin-left--small-base btn-country"
                                @click="countryDialog = true"
                        >
                            <img v-if="country.flag && !loaderUpdate"
                                 class="flag"
                                 :src="country.flag"
                                 alt="">
                            <v-progress-circular
                                    v-else
                                    :width="1"
                                    :size="5"
                                    indeterminate
                            />

                            <i class="icon-next-page right currency-right "/>
                        </v-btn>
                    </div>

                    <div class="tabbar-button">
                        <div class="tabbar-button__item"
                             :class="{'tabbar-button__item--active': tab === 'top'}"
                             @click="setActiveTab('top', 0)">
                            <div class="tabbar-button__title">
                                {{$t('m_shop_top')}}
                            </div>
                        </div>
                        <div class="tabbar-button__item"
                             :class="{'tabbar-button__item--active': tab === 'catalog'}"
                             @click="setActiveTab('catalog', 1)">
                            <div class="tabbar-button__title">
                                {{$t('m_shop_catalog')}}
                            </div>
                        </div>
                        <div class="tabbar-button__item"
                             :class="{'tabbar-button__item--active': tab === 'favorite'}"
                             @click="setActiveTab('favorite', 2)">
                            <div class="tabbar-button__title">
                                {{$t('m_shop_favorite')}}
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
                                @click="clearSearchField"
                        >
                            {{ $t('m_adresses_cancel') }}
                        </v-btn>
                    </transition>

                    <v-btn
                            small
                            class="btn-filters"
                            @click="isVisibleFilters = true"
                    >
                        <i class="icon-filters"/>
                    </v-btn>
                </div>
                <v-btn
                    small
                    class="btn-constructor"
                    @click="contructorDialog = true"
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
                            <component :is="tab" :mode="mode"></component>
                        </keep-alive>
                    </transition>
                </template>
            </v-ons-tabbar>
        </div>


        <cart :isVisible.sync="isVisibleCart"/>
        <filters :isVisible.sync="isVisibleFilters"/>

        <div class="button-cart"
             ref="btnCall"
             @click="isVisibleCart = true">
            <i class="icon-cart"/>
            <div v-if="cart.length"
                 class="button-cart__badge">
                {{totalCartProduct}}
            </div>
        </div>

        <v-ons-popover
                cancelable
                :visible.sync="popoverFavorite"
                target=".page__content"
                direction="'up'"
                class="popover--status popover--favorite"
        >
            <slot>
                <div class="popover__icon">
                    <ons-icon icon="favorites" />
                </div>
                <div class="popover__text">
                    {{ $t('m_shop_add_to_favorite_success') }}
                </div>
            </slot>
        </v-ons-popover>

        <v-dialog
                v-model="countryDialog"
                content-class="accounts--dialog country--dialog"
        >
            <v-list
                    flat
            >
                <div class="dialog-header">
                    <v-subheader>{{ $t('m_shop_delivery_country') }}</v-subheader>
                    <v-btn
                            icon
                            fab
                            @click="countryDialog = false"
                    >
                        <i class="icon icon-close"/>
                    </v-btn>
                </div>

                <v-list-item-group>
                    <v-list-item
                            v-for="(item, i) in countries"
                            :key="i"
                            @click="onSelectCountry(item)"
                    >
                        <v-list-item-content>
                            <img class="flag" :src="item.flag" alt="">
                            <v-list-item-title>

                                {{ item.country_name }}
                                <v-ons-icon
                                        v-if="item.country_id === country.country_id"
                                        icon="checkmark"
                                />
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-dialog>

        <v-dialog
            v-model="contructorDialog"
            content-class="agreement--dialog"
        >
            <v-list
                flat
            >
                <div class="dialog-header">
                    <v-subheader>{{ $t('m_cake_designer_agreement_title') }}</v-subheader>
                    <v-btn
                        icon
                        fab
                        @click="contructorDialog = false"
                    >
                        <i class="icon icon-close" />
                    </v-btn>
                </div>

                <div
                    class="dialog-content"
                    v-html="agreement"
                />

                <v-checkbox
                    v-model="agreementChecked"
                    :label="$t('m_cake_designer_agreement_check')"
                    off-icon=""
                    on-icon="icon-checkmark"
                    :ripple="false"
                />

                <div class="designer__btn-submit">
                    <v-btn
                        block
                        depressed
                        color="primary"
                        type="main"
                        :disabled="!agreementChecked"
                        @click="goToCakeDesigner"
                    >
                        {{ $t('m_next') }}
                    </v-btn>
                </div>
            </v-list>
        </v-dialog>
    </layout>
</template>

<script>
    import ScreenShopMixin from '_screen_shop_mixin'
    import ShopIllustration from '_screen_shop_img/shop-illustration.svg'
    import ImgConstructor from '_screen_shop_img/constructor.svg'
    import ProductItem from '../../components/product-item'
    import Cart from '../../components/cart'
    import Filters from '../../components/filters'
    import Catalog from './catalog'
    import Favorite from './favorite'
    import Top from './top'
    import Search from './search'
    import ScreenDesigner from '_screen_designer'

    export default {
        name: 'screen-shop',
        components: {
            ProductItem,
            Catalog,
            Favorite,
            Top,
            Cart,
            Search,
            Filters,
        },
        mixins: [
            ScreenShopMixin,
        ],
        data () {
            return {
                isVisibleCart: false,
                isVisibleFilters: false,
                img: ShopIllustration,
                ImgConstructor,
                countryDialog: false,
                contructorDialog: false,
                agreementChecked: false,
            }
        },
        methods: {
            goToCakeDesigner(item) {
                this.contructorDialog = false
                this.agreementChecked = false
                this.pushPage({
                    extends: ScreenDesigner
                })
            }
        }
    }
</script>

<style lang="scss">
    .page[page="shop"] {
        display: flex;
        flex: 1;
        flex-direction: column-reverse;
        justify-content: space-between;

        .toolbar {
            background: #fff;
        }

        > .page__content {
            padding: 0;
            /*padding-bottom: 34px;*/
            position: static;
            flex: 1;
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
        margin-top: 0;
        padding: 16px;
        background-color: #F5F7FA;
        height: 100%;
        position: relative;

        .tabbar__content {
            bottom: 0 !important;
        }

        .page__content {
            background-color: #F5F7FA !important;
            padding: 16px !important;
        }

        .ons-tabbar__footer {
            display: none;
        }
    }

    .toolbar.toolbar--shop {
        display: flex;
        flex-direction: column;
        height: 230px;
        // height: 174px;
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
            height: 100%;
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

        .v-progress-circular {
            width: 10px !important;
            height: 10px !important;
            margin: unset !important;
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

    .button-cart {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        background: #6D0978;
        box-shadow: 0px 4px 8px rgba(77, 50, 80, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;

        position: fixed;
        right: 16px;
        bottom: 16px;
        z-index: 99;
        transform: translate3d(0, 0, 0);
        will-change: transform;

        i {
            color: #fff;
        }
        &__badge {
            position: absolute;
            left: -3px;
            top: -3px;
            width: 20px;
            height: 20px;
            background: #FF0000;

            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            font-weight: 600;
            font-size: 12px;
            line-height: 16px;
        }
    }

    .popover--favorite {
        .popover__icon {
            color: #FFC700 !important;
        }
    }

    .country--dialog,
    .agreement--dialog {
        border-radius: 8px;
        box-shadow: 0px 8px 15px rgba(39, 45, 45, 0.06);

        .dialog-header {
            display: flex;
            justify-content: space-between;

            .v-subheader {
                font-style: normal;
                font-weight: 600;
                font-size: 22px;
                line-height: 24px;
                letter-spacing: 0.4px;
                color: #000000;
                padding: 0;
                height: unset !important;
            }

            button {
                width: 36px;
                height: 36px;
                min-width: 36px;
                min-height: 36px;
                border-radius: 50%;
                background: #F5F7FA !important;

                box-shadow: unset !important;

                i {
                    color: #000;
                    font-size: 14px;
                }
            }
        }

        .v-list {
            padding: 16px;
            border-radius: 8px;
        }

        .v-list-item {
            display: flex;
            justify-content: space-between;

            padding: 2px 0;
            img {
                width: 30px;
                height: 20px;
                max-width: 30px;
            }

            &__title {
                flex: 1;
                padding-left: 12px;
                display: flex;
                justify-content: space-between;

                ons-icon {
                    color: #6D0978;
                }
            }
        }

        .v-item-group {
            padding-top: 4px;
        }
    }

    .agreement--dialog {
        margin: 16px;

        .dialog-content {
            margin-top: 16px;
            margin-bottom: 14px;
        }
    }
</style>
