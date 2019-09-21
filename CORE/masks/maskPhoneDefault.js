/**
 * Mask object mobile phone format with code
 * +000 (00) 123 45 67
 *
 * To use:
 * Use with v-mask directive
 *
 * @example
 * import { maskPhoneDefault } from '_masks';
 *
 * data: () => ({
 *   maskPhoneDefault,
 * })
 *
 * v-mask="maskPhoneDefault"
 */
export default {
    mask: '+999 999 999 999',
    placeholder: ''
}
