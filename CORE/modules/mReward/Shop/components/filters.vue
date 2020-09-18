<template>
    <v-ons-action-sheet
            :visible.sync="isVisibleFilters"
            cancelable
            modifier="material"
            class="action-sheet__shop-filter"
    >
        <div class="shop-filter__wrap">
            <div class="shop-filter__header">
                <div class="shop-filter__title">
                    {{$t('m_shop_filters')}}
                </div>
                <div class="shop-filter__btn-close">
                    <v-btn
                            type="fab"

                            class="mt-12 toolbar-btn--close"
                            color="primary"
                            @click="closeFilter"
                    >
                        <i class="icon icon-close"/>
                    </v-btn>
                </div>
            </div>

            <div class="shop-filter__content-header">
                <div class="shop-filter__count-title">
                    {{$t('m_shop_filter_base')}}
                </div>
                <div class="shop-filter__clear-cart">
                    <v-btn
                            text
                            depressed
                            block
                            class="margin-top--small-base v-btn--text"
                            @click="clearFilter"
                    >
                        {{ $t('m_shop_clear_filter') }}
                    </v-btn>
                </div>
            </div>
            <div class="shop-filter__content">
                <div class="shop-filter__list-products">

                    <v-chip-group
                            multiple
                            active-class="primary--text"
                    v-model="baseSelected"
                    >
                        <v-chip v-for="tag in baseTags" :key="tag">
                            {{ tag }}
                        </v-chip>
                    </v-chip-group>
                </div>
            </div>


            <div class="shop-filter__content-header">
                <div class="shop-filter__count-title">
                    {{$t('m_shop_filter_taste')}}
                </div>
            </div>
            <div class="shop-filter__content">
                <div class="shop-filter__list-products">

                    <v-chip-group
                            multiple
                            active-class="primary--text"
                            v-model="tasteSelected"
                    >
                        <v-chip v-for="tag in tasteTags" :key="tag">
                            {{ tag }}
                        </v-chip>
                    </v-chip-group>
                </div>
            </div>

            <div class="shop-filter__btn-pay">
                <v-btn
                        block
                        depressed
                        color="primary"
                        type="main"
                        @click="onFiltered"
                >
                    {{ $t('m_apply') }}
                </v-btn>
            </div>
        </div>
    </v-ons-action-sheet>
</template>

<script>
    import ProductCartItem from './product-cart-item'
    import { mapActions, mapGetters } from 'vuex'
    import constants from '_vuex_constants'
    import ScreenCheckout from '_screen_checkout'
    import NotFoundItems from '_not_found_items'

    export default {
        name: 'filters',
        components: {
            ProductCartItem,
            NotFoundItems
        },
        props: {
            isVisible: {
                type: Boolean,
                default: false
            },
        },
        data () {
            return {
                isVisibleFilters: false,
                baseSelected: [],
                tasteSelected: [],

                baseSelectedOld: [],
                tasteSelectedOld: [],

                baseTags: [
                    'Бисквитная',
                    'Коржевая',
                    'Слоено-коржевая',
                    'Суфле',
                    'Муссовая',
                    'Дрожжевая',
                    'Песочная',
                ],
                tasteTags: [
                    'Слвочный',
                    'Сливочно-сырный',
                    'Ягодный',
                    'Сливочно-йогуртовый',
                    'Творожный',
                    'Фруктовый',
                    'Кофейный',
                    'Шоколадный',
                ],
            }
        },
        computed: {
            ...mapGetters({
            }),
        },
        watch: {
            isVisible(value) {
                if (this.isVisibleFilters !== value) {
                    this.isVisibleFilters = value
                }

                if(this.isVisibleFilters) {
                    this.baseSelectedOld = [...this.baseSelected]
                    this.tasteSelectedOld = [...this.tasteSelected]
                }
            },
            isVisibleFilters(value) {
                this.$emit('update:isVisible', value)
            },
        },
        methods: {
            ...mapActions({
                popPage: constants.App.Actions.popPage,
                pushPage: constants.App.Actions.pushPage,
                popToPage: constants.App.Actions.popToPage,
                getProductSearch: constants.MrewardShop.Actions.getProductSearch,
            }),

            closeFilter() {
                if(this.baseSelectedOld.length || this.tasteSelectedOld.length) {
                    this.baseSelected = [...this.baseSelectedOld]
                    this.tasteSelected = [...this.tasteSelectedOld]
                }

                this.isVisibleFilters = false
            },
            clearFilter() {
                this.baseSelected = []
                this.tasteSelected = []

                // TODO: попросили сразу применять фильтр
                this.baseSelectedOld = []
                this.tasteSelectedOld = []
                this.isVisibleFilters = false
                this.$bus.$emit('clearSearch')
            },
            async onFiltered() {
                const filter = []

                this.baseSelected.forEach(i => filter.push(`%23${this.baseTags[i]}`))
                this.tasteSelected.forEach(i => filter.push(`%23${this.tasteTags[i]}`))

                this.isVisibleFilters = false
                this.baseSelectedOld = []
                this.tasteSelectedOld = []

                debugger
                if (filter.length) {
                    this.$bus.$emit('goToSearch')

                    await this.getProductSearch({
                        name: filter.join(', ')
                    })
                } else {
                    this.$bus.$emit('clearSearch')
                }
            }
        }
    }
</script>

<style lang="scss">
    .action-sheet {
        &__shop-filter {
            .action-sheet-title {
                display: none;
            }

            .action-sheet {
                bottom: 0 !important;
                background: #FFFFFF !important;
                box-shadow: 0px 8px 15px rgba(39, 45, 45, 0.06) !important;
                border-radius: 8px 8px 0px 0px !important;
                overflow: hidden;
                padding: 16px;
            }
        }

        .shop-filter {
            &__wrap {
                .not-found-items {
                    padding: 42px 0 48px 0;
                }
            }

            &__header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 6px 0;
            }

            &__title {
                font-style: normal;
                font-weight: 600;
                font-size: 22px;
                line-height: 24px;
                letter-spacing: 0.4px;
                color: #000000;
            }

            &__count-title {
                font-style: normal;
                font-weight: 600;
                font-size: 17px;
                line-height: 24px;
                letter-spacing: 0.2px;
                color: #000000;
                padding: 8px 0px;
            }

            &__total-title {
                font-weight: 600;
                font-size: 17px;
                line-height: 24px;
                letter-spacing: 0.2px;
                color: #000000;
            }

            &__total-amount {
                font-weight: 600;
                font-size: 17px;
                line-height: 24px;
                letter-spacing: 0.2px;
                color: #6D0978;
            }

            &__btn-close {
                .v-btn {
                    width: 36px;
                    height: 36px;
                    min-width: 36px;
                    min-height: 36px;
                    border-radius: 50%;
                    background: #F5F7FA !important;

                    box-shadow: unset !important;

                    i {
                        color: #000;
                    }
                }
            }

            &__content-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            &__clear-cart {
                .margin-top--small-base {
                    margin: 0 !important;
                    padding: 0 !important;
                    min-height: unset !important;
                }
            }

            &__list-products {
                max-height: 60vh;
                overflow: scroll;
            }

            &__total-wrap {
                padding: 28px 0 15px 0;
                display: flex;
                justify-content: space-between;
            }
        }

        &__btn-pay {
            padding: 16px 0;
        }

        .v-slide-group__content {
            flex: unset !important;
            flex-wrap: wrap;
        }

        .v-chip .v-chip__content {
            font-style: normal;
            font-weight: 600;
            font-size: 13px;
            line-height: 20px;
            text-align: center;
            letter-spacing: -0.208px;
            color: rgba(60, 60, 67, 0.6);
        }

        .v-chip-group .v-chip {
            margin: 8px 16px 8px 0;
            border: 1px solid #CECED2;
            box-sizing: border-box;
            border-radius: 8px;
            background: #fff;

            &.v-chip--active {
                background: #B55CBF !important;
                border: 1px solid #B55CBF;

                .v-chip__content {
                    color: #fff;
                }
            }
        }
    }
</style>
