/**
 * Mask object bank account format
 * 1234567890123456
 *
 * To use:
 * Use with v-mask directive
 *
 * @example
 * import { maskBankAccount } from '_masks';
 *
 * data: () => ({
 *   maskBankAccount,
 * })
 *
 * v-mask="maskBankAccount"
 */
export default {
    mask: 'xxxxxxxxxxxxxxxx',
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
