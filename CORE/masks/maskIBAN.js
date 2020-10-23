
/**
 * Mask object bank account format
 * UA 59 351005 00000 2620 1111 11 1111
 *
 * To use:
 * Use with v-mask directive
 *
 * @example
 * import { maskIBAN } from '_masks';
 *
 * data: () => ({
 *   maskIBAN,
 * })
 *
 * v-mask="maskIBAN(val)"
 */
export default function (val) {
    let mask
    switch (`${val}`.trim().substring(0, 2)) {
        default:
        case 'UA':
            mask = 'yy xx xxxxxx xxxxx xxxx xxxx xx xxxx'
            break
        case 'BY':
            mask = 'yy xx xxxx xxxx xxxx xxxx xxxx xxxx'
            break
    }

    return {
        mask,
        placeholder: '',
        greedy: false,
        definitions: {
            x: {
                validator: '[0-9]',
                cardinality: 1,
                definitionSymbol: 'x'
            },
            y: {
                validator: '[A-Za-z]',
                cardinality: 1,
                definitionSymbol: 'y'
            }
        }
    }
}
