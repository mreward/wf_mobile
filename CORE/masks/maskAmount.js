/**
 * Mask object amount format
 * 0.00
 *
 * To use:
 * Use with v-mask directive
 *
 * @example
 * import { maskAmount } from '_masks';
 *
 * data: () => ({
 *   maskAmount,
 * })
 *
 * v-mask="maskAmount"
 */
import Clipboard from '_PLUGINS/common/Clipboard'
// import Inputmask from 'inputmask';

export default {
    alias: 'numeric',
    groupSeparator: ' ',
    digits: 2,
    autoGroup: true,
    placeholder: '',
    prefix: '',
    rightAlign: false,
    // digitsOptional: false,
    radixPoint: '.',
    onBeforePaste(pastedValue) {
        console.log('PASTE:::::', pastedValue)

        Clipboard.Paste().then((value) => {
            this.el.value = parseFloat(value)
        }).catch((e) => {
            console.log('PASTE:error:', e)
        })

        return parseFloat(pastedValue)
    }
    // postValidation: function(buffer, currentResult, opts) {
    //     const isValid = true;
    //     const maskedValue = opts.numericInput ? buffer.slice().reverse().join('') : buffer.join('');
    //     let processValue = maskedValue.replace(opts.prefix, '');
    //     processValue = processValue.replace(opts.suffix, '');
    //     processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), 'g'), '');
    //     if (opts.radixPoint === ',') processValue = processValue.replace(Inputmask.escapeRegex(opts.radixPoint), '.');
    //     // handle negation symbol
    //     processValue = processValue.replace(new RegExp(`^${Inputmask.escapeRegex(opts.negationSymbol.front)}`), '-');
    //     processValue = processValue.replace(new RegExp(`${Inputmask.escapeRegex(opts.negationSymbol.back)}$`), '');
    //     processValue = processValue === opts.negationSymbol.front ? `${processValue}0` : processValue;
    //
    //     if (Number.isFinite(processValue)) {
    //         if (processValue > this.maxPay) {
    //             this.amount = this.maxPay;
    //             return false;
    //         }
    //     }
    //
    //     return isValid;
    // },
}
