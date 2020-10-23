import ApiClient from '_CORE/modules/mReward/libs/ApiClient'

export default class MrewardPoll extends ApiClient {
    /**
     * Get poll list
     * @returns {Promise}
     * @constructor
     */
    GetPoll(json) {
        this.logger('MrewardPoll:GetPoll')
        return this.sendRequest(this.APIEndPoints.Poll.GetPoll, json)
    }

    /**
     * Set answer
     * @returns {Promise}
     * @constructor
     */
    SetAnswer(json) {
        this.logger('MrewardPoll:SetAnswer')
        return this.sendRequest(this.APIEndPoints.Poll.SetAnswer, json)
    }
}
