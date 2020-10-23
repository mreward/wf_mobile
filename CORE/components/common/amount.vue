<template>
    <!--TODO: display: inline-flex-->
    <span
        class="amount"
        style="display: inline-flex"
    >
        <template v-if="type === 'after' || !type">
            <span
                v-if="!notRounded"
                class="amount__value"
            >
                {{ amount | amountFormat('', decimalDigits, currencyObj) }}
            </span>
            <span
                v-else
                class="amount__value"
            >
                {{ amount }}
            </span>
            <span
                v-if="currency && showCurrency"
                v-html="delimiter"
            />
            <span
                v-if="currency && showCurrency"
                class="amount__currency"
            >
                {{ useSymbol ? symbol : currency }}
            </span>
        </template>
        <template v-else-if="type === 'before'">
            <span
                v-if="currency && !useSupTag && showCurrency"
                class="amount__currency"
            >
                {{ useSymbol ? symbol : currency }}
            </span>
            <!--TODO: remove this tag and use style for "sup style" -->
            <sup v-else>
                {{ useSymbol ? symbol : currency }}
            </sup>
            <span v-html="delimiter" />
            <span
                class="amount__value"
            >
                {{ amount | amountFormat('', decimalDigits, currencyObj) }}
            </span>
        </template>
    </span>
</template>

<script>
    import constants from '_vuex_constants'
    import { mapGetters } from 'vuex'
    import currency from 'vue2-filters/src/other/currency'
    import { get } from 'lodash'

    export default {
        name: 'amount',
        filters: {
            amountFormat: currency
        },
        props: {
            currency: {
                type: [String, Boolean],
                default: 'USD'
            },
            amount: {
                type: [String, Number],
                default: 0
            },
            mask: {
                type: Object,
                default: () => ({})
            },
            useSupTag: {
                type: Boolean,
                default: false
            },
            showCurrency: {
                type: Boolean,
                default: true
            },
            notRounded: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            ...mapGetters({
                settings: constants.App.Getters.settings
            }),
            currencyObj() {
                const { typeCurrencies } = this.settings
                let currencyObj
                if (typeCurrencies) {
                    const isSymbol = this.currency.length === 1
                    const currencyObj = typeCurrencies.find((currency) => {
                        if (isSymbol) {
                            return currency.symbol === this.currency
                        }

                        return currency.code === this.currency
                    })
                }
                return currencyObj
            },
            useSymbol() {
                return get(this.currencyObj, 'useSymbol', false)
            },
            symbol() {
                return this.currencyObj.symbol
            },
            type() {
                if (this.currencyObj) {
                    return this.currencyObj.type
                }
                return false
            },
            delimiter() {
                if (this.currencyObj) {
                    return this.currencyObj.delimiter
                }
                return ''
            },
            decimalDigits() {
                let decimalDigits = 2
                let decimalSeparator = '.'

                if (this.currencyObj) {
                    decimalSeparator = this.currencyObj.decimalSeparator
                    decimalDigits = this.currencyObj.decimalDigits
                }

                if (!this.amount.toString().includes(decimalSeparator.toString())) {
                    return 0
                }

                return decimalDigits
            }
        }
    }
</script>
