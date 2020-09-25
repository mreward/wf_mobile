<template>
    <v-ons-page shown>
        <div class="page__content">
            <select-list
                v-model="filling"
                :title="$t('m_cake_designer_filling')"
                :items="fillings"
                :with-price="true"
                :currency="country.config.currency"
                :default-item-name="$t('m_cake_designer_without_name')"
                @input="setFilling"
            />
            <select-list
                v-model="decor"
                :title="$t('m_cake_designer_decor')"
                :items="decors"
                :with-price="true"
                :currency="country.config.currency"
                :default-item-name="$t('m_cake_designer_without_name')"
                @input="setDecor"
            >
                <template slot="content">
                    <div
                        v-if="decor.required_gallery"
                        class="btn-select"
                        @click="goToDecorCatalog"
                    >
                        <span>{{ $t('m_cake_designer_select_from_catalog') }}</span>
                        <i class="icon-closet" />
                    </div>
                    <select-list-item
                        v-if="decor.required_upload"
                        :value="{}"
                        :with-price="false"
                        icon="icon-plus"
                        icon-direction="left"
                        :default-name="$t('m_cake_designer_upload_custom_image')"
                        :default-description="$t('m_cake_designer_upload_custom_description')"
                        :selected="{}"
                    />
                    <selected-item
                        v-if="order.decor.gallery"
                        :value="order.decor.gallery"
                        :default-name="$t('m_cake_designer_without_name')"
                        :default-description="$t('m_cake_designer_catalog_image')"
                        @select="setDecor(decor)"
                    />
                </template>
            </select-list>

            <v-checkbox
                v-model="checked"
                :label="$t('m_cake_designer_add_lettering')"
                off-icon=""
                on-icon="icon-checkmark"
                :ripple="false"
            />

            <div
                v-if="checked"
                class="designer__info-postcard"
            >
                <select-list
                    v-model="lettering"
                    title=""
                    :items="letterings"
                    :with-price="true"
                    :currency="country.config.currency"
                    :default-item-name="$t('m_cake_designer_without_name')"
                    @input="setLettering"
                >
                    <template slot="content">
                        <div
                            v-if="lettering.required_gallery"
                            class="btn-select"
                            @click="goToLetteringCatalog"
                        >
                            <span>{{ $t('m_cake_designer_select_from_catalog') }}</span>
                            <i class="icon-closet" />
                        </div>
                        <select-list-item
                            v-if="lettering.required_input"
                            :value="{}"
                            :with-price="false"
                            icon="icon-plus"
                            icon-direction="left"
                            :default-name="$t('m_cake_designer_add_lettering')"
                            :selected="{}"
                        />
                        <selected-item
                            v-if="order.lettering.gallery"
                            :value="order.lettering.gallery"
                            :default-name="$t('m_cake_designer_without_name')"
                            :default-description="$t('m_cake_designer_catalog_text')"
                            @select="setLettering(lettering)"
                        />
                    </template>
                </select-list>
            </div>

            <div class="designer__info-item">
                <div class="designer__info-item__title">
                    {{ $t('m_cake_designer_weight') }}
                </div>
                <div class="designer__info-item__price">
                    {{ $t('m_cake_designer_weight_value', '', { value: '1,3' }) }}
                </div>
            </div>

            <div class="designer__info-item">
                <div class="designer__info-item__title">
                    {{ $t('m_cake_designer_price') }}
                </div>
                <div class="designer__info-item__price">
                    {{ price }} {{ country.config.currency }}
                </div>
            </div>

            <div class="designer__btn-submit">
                <v-btn
                    block
                    depressed
                    color="primary"
                    type="main"
                    @click="() => {}"
                >
                    {{ $t('m_cake_designer_submit_checkout') }}
                </v-btn>
            </div>
        </div>
    </v-ons-page>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import constants from '_vuex_constants'
    import { get, sumBy } from 'lodash'

    import SelectList from '../../components/select-list'
    import SelectListItem from '../../components/select-list-item'
    import SelectedItem from '../../components/selected-item'
    import SelectDesignerCatalog from '_screen_designer_catalog'

    export default {
        name: 'screen-standart',
        components: {
            SelectList,
            SelectListItem,
            SelectedItem
        },
        data () {
            return {
                filling: {},
                decor: {},
                lettering: {},
                checked: false
            }
        },
        computed: {
            ...mapGetters({
                order: constants.MrewardСakeDesigner.Getters.order,
                fillings: constants.MrewardСakeDesigner.Getters.fillings,
                decors: constants.MrewardСakeDesigner.Getters.decors,
                letterings: constants.MrewardСakeDesigner.Getters.letterings,
                country: constants.MrewardShop.Getters.country
            }),

            price() {
                return sumBy([
                    this.filling,
                    this.decor,
                    this.lettering
                ], item => {
                    return get(item, 'price', 0)
                })
            }
        },
        async created () {
            try {
                const options = {
                    partnerId: get(this.country, 'config.id')
                }

                await Promise.all([
                    this.getFillings(options),
                    this.getDecor(options),
                    this.getLetterings(options)
                ])
            } catch (e) {
                this.$Alert.Error(e)
            }
        },
        methods: {
            ...mapActions({
                pushPage: constants.App.Actions.pushPage,
                getFillings: constants.MrewardСakeDesigner.Actions.getFillings,
                getDecor: constants.MrewardСakeDesigner.Actions.getDecor,
                getLetterings: constants.MrewardСakeDesigner.Actions.getLetterings,
                setOrderFilling: constants.MrewardСakeDesigner.Actions.setOrderFilling,
                setOrderDecor: constants.MrewardСakeDesigner.Actions.setOrderDecor,
                setOrderLettering: constants.MrewardСakeDesigner.Actions.setOrderLettering,
            }),
            async setFilling(item) {
                await this.setOrderFilling({
                    item
                })
            },
            async setDecor(item) {
                await this.setOrderDecor({
                    item,
                    gallery: null
                })
            },
            async setLettering(item) {
                await this.setOrderLettering({
                    item,
                    gallery: null
                })
            },
            goToDecorCatalog(item) {
                this.pushPage({
                    extends: SelectDesignerCatalog,
                    props: {
                        decor: {
                            type: Object,
                            default: () => {
                                return this.decor
                            }
                        },
                        title: {
                            type: String,
                            default: () => {
                                return this.$t('m_cake_designer_catalog_decor_title')
                            }
                        }
                    },
                    computed: {
                        ...mapGetters({
                            items: constants.MrewardСakeDesigner.Getters.decorGallery,
                            country: constants.MrewardShop.Getters.country
                        })
                    },
                    async created () {
                        try {
                            await this.getDecorGallery({
                                partnerId: get(this.country, 'config.id')
                            })
                        } catch (e) {
                            this.$Alert.Error(e)
                        }
                    },
                    methods: {
                        ...mapActions({
                            getDecorGallery: constants.MrewardСakeDesigner.Actions.getDecorGallery,
                            setOrderDecor: constants.MrewardСakeDesigner.Actions.setOrderDecor,
                            popPage: constants.App.Actions.popPage
                        }),
                        async goToBack() {
                            await this.setOrderDecor({
                                item: this.decor,
                                gallery: this.item
                            })
                            this.popPage()
                        }
                    }
                })
            },
            goToLetteringCatalog(item) {
                this.pushPage({
                    extends: SelectDesignerCatalog,
                    props: {
                        lettering: {
                            type: Object,
                            default: () => {
                                return this.lettering
                            }
                        },
                        title: {
                            type: String,
                            default: () => {
                                return this.$t('m_cake_designer_catalog_lettering_title')
                            }
                        }
                    },
                    computed: {
                        ...mapGetters({
                            items: constants.MrewardСakeDesigner.Getters.letteringGallery,
                            country: constants.MrewardShop.Getters.country
                        })
                    },
                    async created () {
                        try {
                            await this.getLetteringGallery({
                                partnerId: get(this.country, 'config.id')
                            })
                        } catch (e) {
                            this.$Alert.Error(e)
                        }
                    },
                    methods: {
                        ...mapActions({
                            getLetteringGallery: constants.MrewardСakeDesigner.Actions.getLetteringGallery,
                            setOrderLettering: constants.MrewardСakeDesigner.Actions.setOrderLettering,
                            popPage: constants.App.Actions.popPage
                        }),
                        async goToBack() {
                            await this.setOrderLettering({
                                item: this.lettering,
                                gallery: this.item
                            })
                            this.popPage()
                        }
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    .designer {
        &__btn-submit {
            margin-top: 16px;
        }

        &__info-postcard {
          margin-bottom: 16px;
        }

        &__info-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;

            &__title {
                font-size: 13px;
                line-height: 18px;
                letter-spacing: -0.078px;
                color: #000000;
            }

            &__price {
                font-weight: 600;
                font-size: 15px;
                line-height: 20px;
                text-align: right;
                letter-spacing: -0.24px;
                color: #000000;
            }
        }
    }

    .v-input {
        &--checkbox {
            padding-top: 0;
            margin-bottom: 16px;

            .v-input--selection-controls__input {
                margin-right: 12px;
                height: 22px;
                width: 22px
            }

            .v-label {
                font-style: normal;
                font-weight: normal;
                font-size: 15px;
                line-height: 20px;
                letter-spacing: -0.24px;
                color: #000000;
            }

            .v-icon {
                border: 1px solid #CECED2;
                box-sizing: border-box;
                border-radius: 2px;
                font-size: 12px !important;

                &.primary--text {
                    color: #fff !important;
                    caret-color:#fff !important;
                }
            }
        }

        &--is-label-active.v-input--checkbox {
            .v-icon {
                border: 1px solid #6D0978;
                background-color: #6D0978;
            }
        }
    }
</style>
