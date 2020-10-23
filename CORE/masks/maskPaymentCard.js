/**
 * Mask object payment card format
 * 1234 5678 9012 3456
 *
 * To use:
 * Use with v-mask directive
 *
 * @example
 * import { maskPaymentCard } from '_masks';
 *
 * data: () => ({
 *   maskPaymentCard,
 * })
 *
 * v-mask="maskPaymentCard"
 */
export default {
    mask: 'xxxx xxxx xxxx xxxx',
    placeholder: '',
    greedy: false,
    definitions: {
        x: {
            validator: '[0-9]',
            cardinality: 1,
            definitionSymbol: 'x'
        }
    }
}
