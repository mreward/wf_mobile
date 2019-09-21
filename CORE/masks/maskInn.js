/**
 * Mask object bank inn format
 * 123456
 *
 * To use:
 * Use with v-mask directive
 *
 * @example
 * import { maskInn } from '_masks';
 *
 * data: () => ({
 *   maskInn,
 * })
 *
 * v-mask="maskInn"
 */
export default {
    mask: 'xxxxxx',
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
