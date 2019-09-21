import ApiClient from '_CORE/modules/mReward/libs/ApiClient'
import _forIn from 'lodash/forIn'

export default class MrewardAuth extends ApiClient {
    /**
     * Authenticate by phone number and password
     * @param json - {Object} [object]
     * @param json.clearMobileNumber
     * @param json.password
     * @returns {Promise}
     * @constructor
     */
    AuthenticateUser(json) {
        this.logger('MrewardAuth:AuthenticateUser')
        const endodedData =
            `phone=${json.clearMobileNumber}&` +
            `password=${json.password}`

        return this.sendRequest(
            this.APIEndPoints.User.AuthenticateUser,
            endodedData
        )
    }

    /**
     * Change password
     * @param json - {Object} [object]
     * @param json.clearMobileNumber
     * @param json.password
     * @returns {Promise}
     * @constructor
     */
    ChangePassword(json) {
        this.logger('MrewardAuth:ChangePassword')
        const endodedData =
            `phone=${json.clearMobileNumber}&` +
            `password=${json.password}`

        return this.sendRequest(
            this.APIEndPoints.User.ChangePassword,
            endodedData
        )
    }

    /**
     * Change password confirm with sms
     * @param json - {Object} [object]
     * @param json.smsCode
     * @param json.smsId
     * @returns {Promise}
     * @constructor
     */
    ChangePasswordConfirm(json) {
        this.logger('MrewardAuth:ChangePasswordConfirm')
        const endodedData =
            `code=${json.smsCode}&` +
            `sms_id=${json.smsId}`

        return this.sendRequest(
            this.APIEndPoints.User.ChangePasswordConfirm,
            endodedData
        )
    }

    /**
     * Registration user
     * @param json - {Object} [object]
     * @param json.address
     * @param json.dateBirthday
     * @param json.email
     * @param json.emailNotify
     * @param json.firstName
     * @param json.gender
     * @param json.cityId
     * @param json.country
     * @param json.regionId
     * @param json.lastName
     * @param json.middleName
     * @param json.password
     * @param json.mobileNumber
     * @param json.smsNotify
     * @returns {Promise}
     * @constructor
     */
    RegistrationUser(json) {
        this.logger('MrewardAuth:RegistrationUser')
        const model = {
            ...json,
            channel_reg: 2 // required
        }
        let endodedData = ''
        _forIn(model, (value, key) => {
            if (value) {
                endodedData += `${key}=${value}&`
            }
        })

        return this.sendRequest(
            this.APIEndPoints.User.RegistrationUser,
            endodedData
        )
    }

    /**
     * Registration confirm with sms
     * @param json - {Object} [object]
     * @param json.smsCode
     * @param json.smsId
     * @returns {Promise}
     * @constructor
     */
    RegistrationUserConfirm(json) {
        this.logger('MrewardAuth:RegistrationUserConfirm')
        const endodedData =
            `code=${json.smsCode}&` +
            `sms_id=${json.smsId}`

        return this.sendRequest(
            this.APIEndPoints.User.RegistrationUserConfirm,
            endodedData
        )
    }
}
