/**
 * Mask object mobile phone format
 * 50 123 45 67
 *
 * To use:
 * Use with v-mask directive
 *
 * @example
 * import { maskPhone } from '_masks';
 *
 * data: () => ({
 *   maskPhone,
 * })
 *
 * v-mask="maskPhone"
 */
export default {
    mask: 'xx xxx xx xx',
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
