/**
 * Mask object mobile phone format with static code(UA)
 * +380 (00) 123 45 67
 *
 * To use:
 * Use with v-mask directive
 *
 * @example
 * import { maskPhoneCode } from '_masks';
 *
 * data: () => ({
 *   maskPhoneCode,
 * })
 *
 * v-mask="maskPhoneCode"
 */
export default {
    mask: '+38x (xx) xxx xx xx',
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
