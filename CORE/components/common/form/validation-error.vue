<template>
    <div :class="classesWrapper">
        <slot name="default" />
        <transition
            name="validation-fade"
            mode="out-in"
        >
            <span
                v-if="hasValidationErrorMessage"
                key="error"
                class="input__error-message"
                v-html="validationMessage"
            />
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'validation-error',
        props: {
            /**
             * Vuelidate error object
             */
            error: {
                type: Object,
                default: null
            },
            isFirst: {
                type: Boolean,
                default: true
            },
            onlyFirstError: {
                type: Boolean,
                default: false
            },
            static: {
                type: Boolean,
                default: false
            }
        },
        provide() {
            return {
                validation: this.error
            }
        },
        computed: {
            classesWrapper() {
                return [
                    'width--full',
                    { 'input--error': this.hasValidationError },
                    { 'input--error-static': this.static }
                ]
            },
            /**
             * Available messages for each validator.
             * If no validator is found, "default" will be used
             * TODO place available messages as shared module and add localization
             */
            validationMessages() {
                return [
                    {
                        validator: 'default',
                        message: this.$t('m_validation_default')
                    },
                    {
                        validator: 'required',
                        message: this.$t('m_validation_required')
                    },
                    {
                        validator: 'email',
                        message: this.$t('m_validation_email')
                    },
                    {
                        validator: 'minValue',
                        message: this.$t('m_validation_minvalue')
                    },
                    {
                        validator: 'minLength',
                        message: this.$t('m_validation_minlength')
                    },
                    {
                        validator: 'maxLength',
                        message: this.$t('m_validation_maxlength')
                    },
                    {
                        validator: 'numeric',
                        message: this.$t('m_validation_numeric')
                    },
                    {
                        validator: 'isMobileNumber',
                        message: this.$t('m_validation_ismobilenumber')
                    },
                    {
                        validator: 'isBankCard',
                        message: this.$t('m_validation_isbankcard')
                    },
                    {
                        validator: 'isBankAccount',
                        message: this.$t('m_validation_isbankaccount')
                    },
                    {
                        validator: 'isTrue',
                        message: this.$t('m_validation_required')
                    },
                    {
                        validator: 'sameAs',
                        message: this.$t('m_validation_sameas')
                    },
                    {
                        validator: 'alphaName',
                        message: this.$t('m_validation_alphaname')
                    },
                    {
                        validator: 'amount',
                        message: this.$t('m_validation_amount')
                    },
                    {
                        validator: 'cardExpiryDateFormat',
                        message: this.$t('m_validation_card_expiry')
                    }
                ]
            },
            /**
             * Check if passed error object exists and it is validated to have an $error
             * @returns {error|{type, default}|validationGetters.$error|$error}
             */
            hasValidationError() {
                return this.error && this.error.$error
            },
            hasValidationErrorMessage() {
                if (this.onlyFirstError) {
                    return this.hasValidationError && this.isFirst
                }
                return this.hasValidationError
            },
            /**
             * Generate validation message from dictionary
             * by looking up first occurring param that did not pass validation
             */
            validationMessage() {
                let validationMessage = ''
                if (this.hasValidationError) {
                    const { $params } = this.error
                    Object.keys($params).forEach((param) => {
                        if (this.error[param] === false) {
                            validationMessage = this.getValidationMessage({
                                param,
                                customParams: this.error.$params,
                                messages: this.validationMessages
                            })
                        }
                    })
                }
                return validationMessage
            }
        },
        methods: {
            /**
             * Get validation message for validation param.
             * @param param {String}
             * @param customParams {Object}
             * @param messages {Array}
             * @returns {String}
             */
            getValidationMessage({ param, customParams, messages }) {
                // Look for custom messages provided in validation schema via "withParams" modifier
                if (customParams[param] && customParams[param].message) {
                    return customParams[param].message
                }

                // Otherwise find matching validator message from dictionary
                const matchedValidator = messages.find(validation => validation.validator === param)

                // If param is not described in dictionary, return fallback message
                if (!matchedValidator) {
                    console.warn('Validator is not listed in available validators. Using fallback!')
                    return messages.find(validation => validation.validator === 'default').message
                }
                return matchedValidator.message ? matchedValidator.message : ''
            }
        }
    }
</script>
