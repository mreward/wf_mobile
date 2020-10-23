import ApiClient from '_CORE/modules/mReward/libs/ApiClient'

export default class MrewardHistory extends ApiClient {
    /**
     * Get history
     * @returns {Promise}
     * @constructor
     */
    GetHistory(json) {
        this.logger('MrewardHistory:GetHistory')
        return this.sendRequest(this.APIEndPoints.History.GetHistory, json)
    }
}
