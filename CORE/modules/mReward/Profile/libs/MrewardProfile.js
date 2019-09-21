import ApiClient from '_CORE/modules/mReward/libs/ApiClient'

export default class MrewardProfile extends ApiClient {
    /**
     * Get user profile
     * @param json - Object
     * @returns {Promise}
     * @constructor
     */
    GetProfile(json) {
        this.logger('MrewardProfile:GetProfile')
        return this.sendRequest(
            this.APIEndPoints.Profile.GetProfile,
            json
        )
    }

    /**
     * edit user profile
     * @param json - Object
     * @returns {Promise}
     * @constructor
     */
    EditProfile(json) {
        this.logger('MrewardProfile:EditProfile')
        const model = {
            ...json,
            channel_reg: 2 // required
        }
        return this.sendRequest(
            this.APIEndPoints.Profile.EditProfile,
            model
        )
    }

    /**
     * Get profile params
     * @returns {Promise}
     * @constructor
     */
    ProfileParams() {
        this.logger('MrewardProfile:ProfileParams')
        return this.sendRequest(this.APIEndPoints.Profile.ProfileParams)
    }

    /**
     * Sending mobile token for push notifications
     * @returns {Promise}
     * @constructor
     */
    SendPushToken(json) {
        this.logger('MrewardNotifications:SendPushToken')
        return this.sendRequest(this.APIEndPoints.Profile.SendPushToken, json)
    }

    /**
     * Upload profile avatar
     * @param imageURI
     * @param options
     * @returns {Promise}
     * @constructor
     */
    UploadAvatar({ imageURI, options }) {
        this.logger('MrewardProfile:UploadAvatar')
        const ft = new FileTransfer()
        if (this.authToken) {
            const encodedAuthorizationToken = btoa(`${this.authToken}:`)
            options.headers.Authorization = `Basic ${encodedAuthorizationToken}`
        }
        return new Promise((resolve, reject) => {
            ft.upload(imageURI, `${this.url}v2/client/profile-image`, (r) => {
                if (JSON.parse(r.response).success === true) {
                    resolve(JSON.parse(r.response).data)
                }
                reject(new Error('Error occurred'))
            }, (e) => {
                reject(e)
            }, options)
        })
    }
}
