<template>
    <v-ons-page shown>
        <div class="page__content">
            <validation-error
                v-bind="bindingsValidationMessage($v.order.filling.item)"
            >
                <select-list
                    v-model="filling"
                    :title="$t('m_cake_designer_filling')"
                    :items="fillings"
                    :with-price="true"
                    :currency="country.config.currency"
                    :default-item-name="$t('m_cake_designer_without_name')"
                    @input="setFilling"
                />
            </validation-error>

            <validation-error
                v-bind="bindingsValidationMessage($v.order.decor.item)"
            >
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
                        <validation-error
                            v-bind="bindingsValidationMessage($v.order.decor.gallery)"
                        >
                            <div
                                v-if="decor.required_gallery && !order.decor.gallery && !order.decor.custom"
                                class="btn-select"
                                @click="goToDecorCatalog"
                            >
                                <span>{{ $t('m_cake_designer_select_from_catalog') }}</span>
                                <i class="icon-closet" />
                            </div>
                        </validation-error>
                        <validation-error
                            v-bind="bindingsValidationMessage($v.order.decor.custom)"
                        >
                            <select-list-item
                                v-if="decor.required_upload && !order.decor.gallery && !order.decor.custom"
                                :value="{}"
                                :with-price="false"
                                icon="icon-plus"
                                icon-direction="left"
                                :default-name="$t('m_cake_designer_upload_custom_image')"
                                :default-description="$t('m_cake_designer_upload_custom_description')"
                                :selected="true"
                            />
                        </validation-error>
                        <selected-item
                            v-if="order.decor.gallery || order.decor.custom"
                            :value="order.decor.gallery || order.decor.custom"
                            :default-name="$t('m_cake_designer_without_name')"
                            :default-description="$t('m_cake_designer_catalog_image')"
                            @select="setDecor(decor)"
                            @click-image="(url) => imageDialogUrl = imageDialog = url"
                        />
                    </template>
                </select-list>
            </validation-error>

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
                <validation-error
                    v-bind="bindingsValidationMessage($v.order.lettering.item)"
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
                            <validation-error
                                v-bind="bindingsValidationMessage($v.order.lettering.gallery)"
                            >
                                <div
                                    v-if="lettering.required_gallery && !order.lettering.gallery && !order.lettering.custom"
                                    class="btn-select"
                                    @click="goToLetteringCatalog"
                                >
                                    <span>{{ $t('m_cake_designer_select_from_catalog') }}</span>
                                    <i class="icon-closet" />
                                </div>
                            </validation-error>
                            <validation-error
                                v-bind="bindingsValidationMessage($v.order.lettering.custom)"
                            >
                                <select-list-item
                                    v-if="lettering.required_input && !order.lettering.gallery && !order.lettering.custom"
                                    :value="{}"
                                    :with-price="false"
                                    icon="icon-plus"
                                    icon-direction="left"
                                    :default-name="$t('m_cake_designer_add_text')"
                                    :selected="true"
                                    @select="goToAddLettering"
                                />
                            </validation-error>
                            <selected-item
                                v-if="order.lettering.gallery || order.lettering.custom"
                                :value="order.lettering.gallery || order.lettering.custom"
                                :default-name="$t('m_cake_designer_without_name')"
                                :default-description="$t(order.lettering.gallery ? 'm_cake_designer_catalog_text' : 'm_cake_designer_custom_text')"
                                @select="setLettering(lettering)"
                            />
                        </template>
                    </select-list>
                </validation-error>
            </div>

            <div class="designer__info-item">
                <div class="designer__info-item__title">
                    {{ $t('m_cake_designer_weight') }}
                </div>
                <div class="designer__info-item__price">
                    {{ $t('m_cake_designer_weight_value', '', { value: '1,3' }) }}
                </div>
            </div>

            <div
                v-show="isShowPrice"
                class="designer__info-item"
            >
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
                    :disabled="isDisabledCheckbox"
                    @click="goToCheckout"
                >
                    {{ $t('m_cake_designer_submit_checkout') }}
                </v-btn>
            </div>
        </div>

        <v-dialog
            v-model="imageDialog"
            content-class="image--dialog"
        >
            <div
                class="dialog-image"
                :style="{ backgroundImage: `url(${imageDialogUrl})` }"
            >
                <v-btn
                    icon
                    fab
                    @click="imageDialog = false"
                >
                    <i class="icon icon-close" />
                </v-btn>
            </div>
        </v-dialog>
    </v-ons-page>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import constants from '_vuex_constants'
    import { get, sumBy, isEmpty } from 'lodash'

    import ValidationHelpers from '_plugins_validation_helpers'
    import { required, requiredIf } from '_plugins_validators'

    import SelectList from '../../components/select-list'
    import SelectListItem from '../../components/select-list-item'
    import SelectedItem from '../../components/selected-item'
    import SelectDesignerCatalog from '_screen_designer_catalog'
    import SelectDesignerAddLettering from '_screen_designer_add_lettering'
    import ScreenCheckout from '../screen-checkout'

    export default {
        name: 'screen-standart',
        components: {
            SelectList,
            SelectListItem,
            SelectedItem
        },
        mixins: [
            ValidationHelpers
        ],
        data () {
            return {
                filling: {},
                decor: {},
                lettering: {},
                checked: false,
                imageDialog: false,
                imageDialogUrl: ''
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

            isDisabledCheckbox() {
                return this.validationInvalid({ startFromFirst: true })
            },

            isShowPrice() {
                return !isEmpty(this.filling) && !isEmpty(this.decor)
            },

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
                setOrderLettering: constants.MrewardСakeDesigner.Actions.setOrderLettering
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
            },
            goToAddLettering() {
                this.pushPage({
                    extends: SelectDesignerAddLettering,
                    props: {
                        lettering: {
                            type: Object,
                            default: () => {
                                return this.lettering
                            }
                        }
                    }
                })
            },
            goToCheckout() {
                if (this.validationInvalid({ startFromFirst: true })) {
                    return
                }

                this.pushPage({
                    extends: ScreenCheckout
                })
            }
        },
        validations() {
            const validations = {
                order: {
                    filling: {
                        item: {
                            required,
                            $params: {
                                order: 5
                            }
                        },
                        $params: {
                            order: 10
                        }
                    },
                    decor: {
                        item: {
                            required,
                            $params: {
                                order: 5
                            }
                        },
                        gallery: {
                            required: requiredIf(() => {
                                return get(this.order.decor, 'item.required_gallery', false)
                            }),
                            $params: {
                                order: 5
                            }
                        },
                        custom: {
                            required: requiredIf(() => {
                                return get(this.order.decor, 'item.required_upload', false)
                            }),
                            $params: {
                                order: 5
                            }
                        },
                        $params: {
                            order: 10
                        }
                    },
                    lettering: {
                        item: {
                            required: requiredIf(() => {
                                return this.checked
                            }),
                            $params: {
                                order: 5
                            }
                        },
                        gallery: {
                            required: requiredIf(() => {
                                return this.checked && get(this.order.lettering, 'item.required_gallery', false)
                            }),
                            $params: {
                                order: 5
                            }
                        },
                        custom: {
                            required: requiredIf(() => {
                                return this.checked && get(this.order.lettering, 'item.required_input', false)
                            }),
                            $params: {
                                order: 5
                            }
                        },
                        $params: {
                            order: 10
                        }
                    },
                    $params: {
                        order: 100
                    }
                }
            }
            return validations
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

    .image--dialog {
        margin: 16px;

        .dialog-image {
            position: relative;
            border-radius: 8px;
            height: 343px;
            background-size: cover;
            background-position: center;

            button {
                position: absolute;
                top: 16px;
                right: 16px;
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
    }
</style>
