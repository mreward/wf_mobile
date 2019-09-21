import ApiClient from '_CORE/modules/mReward/libs/ApiClient'

export default class MrewardCard extends ApiClient {
    /**
     * Get Info card
     * @returns {Promise}
     * @constructor
     */
    GetInfo(json) {
        this.logger('MrewardCard:GetInfo')
        return this.sendRequest(this.APIEndPoints.Card.GetInfo, json)
    }

    Generate(json) {
        this.logger('MrewardCard:Generate')
        return this.sendRequest(this.APIEndPoints.Card.Generate, json)
    }
}
