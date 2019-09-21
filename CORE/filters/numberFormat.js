import parseMoney from '_CORE/utils/parseMoney'

export default (value) => {
    const number = parseMoney(value)
    return new Intl.NumberFormat().format(number)
}
