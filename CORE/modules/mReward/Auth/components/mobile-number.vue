<template>
    <div class="mobile-number">
        <v-text-field
            v-model="country.code"
            readonly
            type="text"
            class="mobile-code"
            :disabled="disabled"
            @click="goToSelectCountry"
        />
        <v-text-field
            ref="input"
            v-model="mobile"
            v-mask="maskPhoneCode"
            :label="$t('m_auth_phone_number', '', {required: '*'})"
            autocapitalize="off"
            autocomplete="off"
            autocorrect="off"
            type="tel"
            :disabled="disabled"
            :error-messages="errorMessages"
            :hint="showMobileHint ? $t('m_auth_phone_number_hint') : ''"
            @focus="$emit('hideError')"
        />
    </div>
</template>

<script>
    import constants from '_vuex_constants'
    import { mapActions, mapGetters } from 'vuex'
    import _get from 'lodash/get'
    import _split from 'lodash/split'
    const ScreenSelectCountry = () => import('_screen_select_country')

    export default {
        name: 'mobile-number',
        props: {
            value: {
                type: String,
                default: '',
                required: true
            },
            disabled: {
                type: Boolean,
                default: false
            },
            errorMessages: {
                type: String,
                default: ''
            },
            country: {
                type: Object,
                default: () => ({})
            }
        },
        data() {
            return {
                mobile: this.value,
                maskPhoneCode: {
                    mask: 'xxx xxx xxx xxx',
                    placeholder: '',
                    greedy: false,
                    showMaskOnHover: false,
                    showMaskOnFocus: false,
                    groupmarker: { start: '((', end: '))' },
                    definitions: {
                        x: {
                            validator: '[0-9]',
                            cardinality: 1,
                            definitionSymbol: 'x'
                        },
                        y: {
                            validator: '[1-9]',
                            cardinality: 1,
                            definitionSymbol: 'y'
                        }
                    }
                }
            }
        },
        computed: {
            ...mapGetters({
                maskFromIso: constants.PhoneMasks.Getters.maskFromIso,
                moduleOptions: constants.App.Getters.moduleOptions
            }),
            showMobileHint() {
                return this.maskPhoneCode.mask.includes('y') &&
                    this.moduleOptions('mReward.Auth').showMobileHint &&
                    this.mobile.length === 0
            }
        },
        watch: {
            value(newVal) {
                this.mobile = newVal
            },
            mobile: {
                immediate: true,
                handler(newVal) {
                    this.$emit('input', newVal.replace(/[^0-9]/g, ''))
                    this.$emit('change', newVal.replace(/[^0-9]/g, ''))
                }
            },
            country(newValue) {
                this.setPhoneMask(newValue)
            }
        },
        created() {
            this.setPhoneMask(this.country)
        },
        methods: {
            ...mapActions({
                pushPage: constants.App.Actions.pushPage
            }),
            goToSelectCountry() {
                this.pushPage({
                    extends: ScreenSelectCountry,
                    props: {
                        country: {
                            type: Object,
                            default: () => {
                                return this.country
                            }
                        }
                    }
                })
            },
            setPhoneMask(country) {
                const mask = _get(country, 'mask', false)
                if (mask) {
                    this.maskPhoneCode.mask = this.formattedMaskWithOptionalParts(mask)
                } else if (_get(country, 'iso', false)) {
                    const { mask } = this.maskFromIso(country)
                    this.maskPhoneCode.mask = mask
                }
            },
            /**
             * Format mask for inputmask with optional parts
             * example: (xxx)-xxx-xxx -> [(xxx][)-xxx][-xxx]
             */
            formattedMaskWithOptionalParts(maskString) {
                let maskParts = _split(maskString, '-')
                if (!maskParts.length) {
                    return maskString
                }

                let formattedArray = []
                maskParts.forEach((item, index) => {
                    if (item.startsWith('(') && item.endsWith(')')) {
                        formattedArray[index] = `[${item.slice(0, -1)}]`
                        formattedArray[index + 1] = `[)-${maskParts[index + 1]}]`
                    } else {
                        if (!formattedArray[index]) {
                            formattedArray[index] = `[-${item}]`
                        }
                    }
                })

                return formattedArray.join('')
            }
        }
    }
</script>
