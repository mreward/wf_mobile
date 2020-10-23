import toNumber from 'lodash/toNumber'

export default (value) => {
    let reGexp = /[\(\)+\-\s,\_]/g
    if (value < 0) {
        reGexp = /[\(\)+\s,\_]/g
    }
    const parseValue = String(value).replace(reGexp, '')
    const result = toNumber(parseFloat(parseValue))
    return result
}
