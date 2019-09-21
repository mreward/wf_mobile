import ApiClient from '_CORE/modules/mReward/libs/ApiClient'

export default class MrewardNotifications extends ApiClient {
    /**
     * Get notifications
     * @returns {Promise}
     * @constructor
     */
    GetNotifications(json) {
        this.logger('MrewardNotifications:GetNotifications')
        return this.sendRequest(this.APIEndPoints.Notifications.GetNotifications, json)
    }
}
