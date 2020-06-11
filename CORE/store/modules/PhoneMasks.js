import constants from '_vuex_constants'
import * as libphonenumber from 'libphonenumber-js'
import * as examples from 'libphonenumber-js/examples.mobile'
import Countries from 'i18n-iso-countries/entry-node'
import _sortBy from 'lodash/sortBy'
import _get from 'lodash/get'
import parseAccount from '_CORE/utils/parseAccount'

const {
    PhoneMasks: {
        Mutations: PhoneMasksMutat
    }
} = constants

const state = {
    countryList: []
}

const mutations = {
    [PhoneMasksMutat.CountryList.name]: (state, data) => {
        const list = [
            {
                iso: 'ALL',
                name: 'All countries'
            },
            {
                iso: 'SH-AC',
                name: 'Ascension Island (United Kingdom)'
            },
            {
                iso: 'SH-TA',
                name: 'Tristan da Cunha'
            }
        ]

        Object.keys(data).forEach((iso) => {
            if (data[iso] === 'Åland Islands') {
                data[iso] = 'Aland Islands'
            } else if (data[iso] === 'Côte-d\'Ivoire') {
                data[iso] = 'Côte d\'Ivoire'
            }

            list.push({
                iso,
                name: data[iso]
            })
        })

        state.countryList = _sortBy(list, [item => item.name])
    }
}

const actions = {

    /**
     * get the country with the language in mind
     * @param dispatch
     * @returns {Promise.<*>}
     */
    async updateCountryList({ rootState, commit }) {
        let languageForPhoneMask
        switch (rootState.App.language) {
            case 'tg':
                languageForPhoneMask = 'ru'
                break
            default:
                languageForPhoneMask = rootState.App.language
        }
        const list = Countries.getNames(languageForPhoneMask)
        commit(PhoneMasksMutat.CountryList.name, list)
        return list
    }
}

const getters = {
    // countryList: state => (search = '') => {
    //     return state.countryList.filter(item => item.name.toLowerCase().match(search.toLowerCase()));
    // },
    countryList: state => (search = '', list = []) => {
        if (list.length > 0) {
            return state.countryList.filter(item => list.includes(item.iso) && item.name.toLowerCase().match(search.toLowerCase()))
        }
        return state.countryList.filter(item => item.name.toLowerCase().match(search.toLowerCase()))
    },
    maskFromPhone: (state, getters, rootState) => (phoneNumber) => {
        let phoneMasks = []
        // maskFromPhone function return current object only if passed phone number starts with country code and symbol '+'
        let parseNumber = parseAccount(phoneNumber)
        let phone = `+${parseNumber}`
        let { country: iso } = libphonenumber.parseNumber(phone)

        if (!iso) {
            phoneMasks = _get(rootState, 'App.settings.phoneMasks', [])
            const defaultPhoneMask = _get(rootState, 'App.settings.defaultPhoneMask')

            if (defaultPhoneMask && (parseNumber.length === 7 || parseNumber.length === 8)) {
                iso = defaultPhoneMask
            } else if (!phoneMasks.length || phoneMasks.find(item => item === 'ALL')) {
                iso = 'ALL'
            }
        }

        let mask

        if (iso) {
            mask = getters.maskFromIso(state.countryList.find(country => country.iso === iso))
        } else {
            const isValid = phoneMasks.find((_iso) => {
                mask = getters.maskFromIso(state.countryList.find(country => country.iso === _iso))
                const {code, mask: _mask} = mask
                if (!code) {
                    return false
                }

                const simple = `+${parseAccount(`${code}${_mask}`)}`
                return phone.length === simple.length && phone.startsWith(code)
            })

            if (!isValid) {
                return
            }
        }

        return {
            iso,
            phone,
            ...mask
        }
    },
    // Getter used for v-mask attribute
    maskForComponents: (state, getters) => (phoneNumber) => {
        const maskData = getters.maskFromPhone(phoneNumber)
        let mask
        let masked = true
        let parseNumber = parseAccount(phoneNumber)
        let phone = `+${parseNumber}`
        let divider = ' '
        if (maskData && maskData.mask) {
            const isValid = (phone, mask, code) => {
                const simple = `+${parseAccount(mask)}`
                return phone.length === simple.length && phone.startsWith(code)
            }

            if (maskData.iso === 'ALL') {
                divider = ''
            }
            // For v-mask attribute we need a mask in format '+999 999 999 999', replace default 'x' symbols to digits
            mask = `${maskData.code}${divider}${maskData.mask.replace(/x/g, '9')}`
            if (!isValid(phone, mask, maskData.code)) {
                const maskedPhone = `${maskData.code}${maskData.phone.replace(maskData.code, '').replace(/\+/g, '')}`
                if (maskedPhone !== phone) {
                    phone = maskedPhone
                } else {
                    phone = parseNumber
                    masked = false
                }
            }
        }

        return {
            ...maskData,
            phone,
            placeholder: '',
            masked,
            mask
        }
    },
    maskFromIso: () => (country) => {
        if (!country) {
            return null
        }
        switch (country.iso) {
            case 'ALL': {
                return {
                    ...country,
                    code: '+',
                    mask: 'xxxxxxxxxxxxxxx',
                    name: 'All countries'
                }
            }
            case 'FK':
            case 'GS': {
                return {
                    ...country,
                    code: '+500',
                    mask: 'xxxxx',
                    name: country.name
                }
            }
            case 'AG': {
                return {
                    ...country,
                    code: '+1',
                    mask: 'xxx xxx xxxx',
                    name: country.name
                }
            }
            case 'AQ': {
                return {
                    ...country,
                    code: '+6721',
                    mask: 'xx xxx',
                    name: country.name
                }
            }
            case 'BV': {
                return {
                    ...country,
                    code: '+47',
                    mask: 'xxx xx xxx',
                    name: country.name
                }
            }
            case 'TF': {
                return {
                    ...country,
                    code: '+262',
                    mask: 'xxxxx xxxx',
                    name: country.name
                }
            }
            case 'GI': {
                return {
                    ...country,
                    code: '+350',
                    mask: 'xxx xxxxx',
                    name: country.name
                }
            }
            case 'KI': {
                return {
                    ...country,
                    code: '+686',
                    mask: 'xx xxx',
                    name: country.name
                }
            }
            case 'NU': {
                return {
                    ...country,
                    code: '+683',
                    mask: 'xxxx',
                    name: country.name
                }
            }
            case 'SH': {
                return {
                    ...country,
                    code: '+290',
                    mask: 'xxxx',
                    name: country.name
                }
            }
            case 'WS': {
                return {
                    ...country,
                    code: '+685',
                    mask: 'xx xxxx',
                    name: country.name
                }
            }
            case 'TK': {
                return {
                    ...country,
                    code: '+690',
                    mask: 'xxxx',
                    name: country.name
                }
            }
            case 'TV': {
                return {
                    ...country,
                    code: '+688',
                    mask: 'xxxxx',
                    name: country.name
                }
            }
            case 'HM': {
                return {
                    ...country,
                    code: '+672',
                    mask: 'xxx xxx',
                    name: country.name
                }
            }
            case 'PN': {
                return {
                    ...country,
                    code: '+672',
                    mask: 'xx xxxxxx',
                    name: country.name
                }
            }
            case 'UM': {
                return {
                    ...country,
                    code: '+1',
                    mask: 'xxx xxx xxxx',
                    name: country.name
                }
            }
            case 'ZM': {
                return {
                    ...country,
                    code: '+260',
                    mask: 'xxx xxx xxx',
                    name: country.name
                }
            }
            case 'ID': {
                return {
                    ...country,
                    code: '+62',
                    mask: 'xxx xxxx xxxx',
                    dynamicMasks: '9,11',
                    name: country.name
                }
            }
            case 'LB': {
                return {
                    ...country,
                    code: '+961',
                    mask: 'xxxxxxxx',
                    dynamicMasks: '7,8',
                    regex: '^(3|71|76|78|79|81)\\\d{6}$',
                    name: country.name
                }
            }
            case 'NA': {
                return {
                    ...country,
                    code: '+264',
                    mask: 'xxx xxxx xxxx',
                    name: country.name
                }
            }
            case 'TJ': {
                return {
                    ...country,
                    code: '+992',
                    mask: 'xx xxx xxxx',
                    name: country.name
                }
            }
            case 'BY': {
                return {
                    ...country,
                    code: '+375',
                    mask: 'xx xxxxxxx',
                    name: country.name
                }
            }
            case 'SH-AC': {
                return {
                    ...country,
                    code: '+247',
                    mask: 'xxxxx'
                }
            }
            case 'SH-TA': {
                return {
                    ...country,
                    code: '+290',
                    mask: 'xxxx'
                }
            }
            case 'KG': {
                return {
                    ...country,
                    code: '+996',
                    mask: 'xxx xxx xxx',
                    name: country.name
                }
            }
            case 'KZ':
            case 'RU': {
                return {
                    ...country,
                    code: '+7',
                    mask: 'xxx xxx xx xx',
                    name: country.name
                }
            }
            default: {
                const maskCountry = new libphonenumber.AsYouType(country.iso.toUpperCase())
                const code = `+${maskCountry.countryCallingCode}`

                maskCountry.input(`${code}${examples[country.iso.toUpperCase()]}`)
                if(maskCountry) {
                    const mask = maskCountry.partially_populated_template.replace(/\d/g, 'x')
                    return {
                        code,
                        mask,
                        name: country.name,
                        iso: country.iso
                    }
                }

            }
        }
    }
}

export default {
    strict: false,
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
