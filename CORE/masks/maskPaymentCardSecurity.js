/**
 * Mask object payment card format
 * 1234 **** **** 3456
 *
 * To use:
 * Use with v-mask directive
 *
 * @example
 * import { maskPaymentCardSecurity } from '_masks';
 *
 * data: () => ({
 *   maskPaymentCardSecurity,
 * })
 *
 * v-mask="maskPaymentCardSecurity"
 */
export default {
    mask: 'xxxx **** **** xxxx',
    greedy: false,
    definitions: {
        x: {
            validator: '[0-9]',
            cardinality: 1,
            definitionSymbol: 'x'
        },
        '*': {
            validator(chrs) {
                const isValid = new RegExp('[0-9]').test(chrs)
                return isValid !== true || {
                    c: '*'
                }
            },
            cardinality: 1
        }
    }
}
