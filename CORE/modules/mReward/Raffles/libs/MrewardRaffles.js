import ApiClient from '_CORE/modules/mReward/libs/ApiClient'

export default class MrewardRaffles extends ApiClient {
    /**
     * Get raffles
     * @returns {Promise}
     * @constructor
     */
    GetRaffles(json) {
        this.logger('MrewardRaffles:GetRaffles')

        return this.sendRequest(
            this.APIEndPoints.Raffles.GetRaffles,
            json
        )
    }
}
