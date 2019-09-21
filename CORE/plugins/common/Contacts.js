import Vue from 'vue'
/**
 * Contacts plugin provides access to the device's contact database.
 *
 * To use:
 * Call `Contacts.Pick()`
 */
export default {
    /**
     * Starts a contact selection and returns the selected contact
     * @example
     * <caption>-----</caption>
     * import Contacts from '_PLUGINS/common/Contacts';
     *
     * await Contacts.Pick()
     */
    Pick() {
        return new Promise((resolve, reject) => {
            if (window.cordova) {
                navigator.contacts.pickContact((result) => {
                    if (result.phoneNumbers && result.phoneNumbers.length > 0) {
                        result.displayName = this.GetName(result)

                        if (result.phoneNumbers.length === 1) {
                            resolve({
                                phone: this.FormatNumber(result.phoneNumbers[0].value),
                                unParsedPhone: result.phoneNumbers[0].value,
                                name: result.displayName
                            })
                        } else {
                            const phonesArr = []
                            for (let i = 0; i < result.phoneNumbers.length; i += 1) {
                                phonesArr.push({
                                    text: result.phoneNumbers[i].value,
                                    value: result.phoneNumbers[i].value
                                })
                            }
                            const config = {
                                title: result.displayName,
                                items: phonesArr,
                                selectedValue: result.phoneNumbers[0].value,
                                doneButtonLabel: 'Done',
                                cancelButtonLabel: 'Cancel'
                            }

                            window.plugins.listpicker.showPicker(
                                config,
                                (item) => {
                                    resolve({
                                        phone: this.FormatNumber(item),
                                        unParsedPhone: item,
                                        name: result.displayName
                                    })
                                },
                                () => {
                                    reject()
                                },
                            )
                        }
                    } else {
                        reject({
                            error: -1,
                            message: Vue.prototype.$polyglot._translate('m_no_phone_numbers')
                        })
                    }
                }, reject)
            } else {
                reject()
            }
        })
    },
    /**
     * Format user name and return Full Name ( Handle iOS )
     * @param c - selected contact object
     * @returns {*}
     * @constructor
     */
    GetName(c) {
        const name = c.displayName
        if (!name || name === '') {
            if (c.name && c.name.formatted) return c.name.formatted
            if (c.name && c.name.givenName && c.name.familyName) return `${c.name.givenName} ${c.name.familyName}`
            return ''
        }
        return name
    },
    /**
     * Format user phone number and returns in a uniform format
     * @param number - selected contact number
     * @returns ххххххххх (cuts off the code of Ukraine)
     * @constructor
     */
    FormatNumber(number) {
        const clearNumber = number.replace(/\D/g, '')
        if (clearNumber.startsWith('0')) {
            return clearNumber.substr(1)
        } if (clearNumber.startsWith('380')) {
            return clearNumber.substr(3)
        }
        return clearNumber
    },
    /**
     * Get all contacts from user phone book
     * @constructor
     */
    AllContacts() {
        return new Promise(async (resolve, reject) => {
            if (window.cordova) {
                const options = new ContactFindOptions()
                options.filter = ''
                options.multiple = true
                options.hasPhoneNumber = true
                options.desiredFields = [navigator.contacts.fieldType.displayName,
                    navigator.contacts.fieldType.name,
                    navigator.contacts.fieldType.phoneNumbers,
                    navigator.contacts.fieldType.photos]
                const filter = ['']
                navigator.contacts.find(filter, (list) => {
                    resolve(list)
                }, (e) => {
                    reject(e)
                }, options)
            } else {
                reject()
            }
        })
    },
    /**
     * Add contact with number and save to device contacts
     * @constructor
     */
    AddContactAndSave(displayName, phone) {
        return new Promise(async (resolve, reject) => {
            if (window.cordova && navigator.contacts) {
                // create a new contact object
                const contact = navigator.contacts.create()
                contact.displayName = displayName
                contact.nickname = displayName

                // populate some fields
                const name = new window.ContactName()
                name.givenName = displayName
                contact.name = name

                const phoneNumbers = []
                phoneNumbers[0] = new window.ContactField('mobile', phone, true)
                contact.phoneNumbers = phoneNumbers

                // save to device
                contact.save(resolve, reject)
            } else {
                reject()
            }
        })
    }

}
