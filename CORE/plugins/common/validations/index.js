import constants from '_vuex_constants'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            firstValidationError: null
        }
    },
    computed: {
        ...mapGetters({
            loaderVisible: constants.App.Getters.loaderVisible
        })
    },
    watch: {
        /**
         * Watch for validator instance to change in order to update first error.
         * This allows to instantly change validation error message to the next field
         * Once current edited is fixed.
         */
        $v: {
            handler(nextVal) {
                if (nextVal.$invalid) {
                    this.firstValidationError = this.findFirstValidationError({
                        error: nextVal
                    })
                }
            },
            deep: true
        }
    },

    methods: {
        /**
         * Do validation preparation checks
         */
        validationInvalid(options = {}) {
            const startFromFirst = options.startFromFirst || false
            // Whether to start validation from first occurring validation or as usual
            if (this.$v && this.$v.$invalid && startFromFirst) {
                this.firstValidationError = this.findFirstValidationError({
                    error: this.$v
                })
            }

            if (this.$v && this.$v.$invalid) {
                this.$v.$touch()
                this.scrollToValidationError()
                return true
            }
            return false
        },

        /**
         * Recursively find invalid validation param with lowest order from provided validation object
         * @param validation - Vuelidate validation object
         * @returns {*}
         */
        findFirstValidationError(validation) {
            // If no nested validation - return current validator
            if (!validation.error || !validation.error.$params) {
                return validation
            }
            // Go through available invalid params and find one with lowest order value
            const firstInvalid = Object.keys(validation.error.$params).reduce((acc, param) => {
                // If param does not have order or is not invalid - skip it
                if (!validation.error.$params[param] || !validation.error.$params[param].order || !validation.error[param].$invalid) {
                    return acc
                }
                // If order is less than current or fallback max, collect current validator
                if (validation.error.$params[param].order <= (acc.order || 999999)) {
                    return {
                        validator: param,
                        order: validation.error.$params[param].order,
                        error: validation.error[param]
                    }
                }
                return acc
            }, validation)
            // If no (any) invalid param was found, return original parent validator (or instance)
            if (firstInvalid.error === validation.error) {
                return validation
            }
            // Apply recursive check
            return this.findFirstValidationError(firstInvalid)
        },

        /**
         * Check if provided error is current first failed validation
         * @param error - Vuelidate validation object
         * @param firstError - Vuelidate validation object
         * @returns {boolean}
         */
        isFirstValidation(error, firstError) {
            if (firstError && firstError.error) {
                return error === firstError.error
            }
        },

        /**
         * Props for validation-message component
         * @param error - Vuelidate validation object
         * @returns {*[]}
         */
        bindingsValidationMessage(error) {
            return [
                { error },
                { isFirst: this.isFirstValidation(error, this.firstValidationError) }
            ]
        },

        async scrollToValidationError(selector = '.input_error') {
            // Next tick is required to make sure validation dom element is resent in DOM
            await this.$nextTick()

            const firstErrorInput = this.$el.querySelector(selector)
            if (firstErrorInput) {
                firstErrorInput.scrollIntoView({ behavior: 'smooth' }) // TODO figure out smooth scroll
            }
        }
    },

    mounted() {
        this.$bus.$on('validations:reset', () => {
            if (this.$v && typeof this.$v.$reset === 'function') {
                this.$v.$reset()
            }
        })
    }
}
