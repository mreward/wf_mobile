import ApiClient from '_CORE/modules/mReward/libs/ApiClient'
import _get from 'lodash/get'

export default class MrewardPromotions extends ApiClient {
    /**
     * Get partner promotions
     * @returns {Promise}
     * @constructor
     */
    GetPromotions(json) {
        this.logger('MrewardPromotions:GetPromotions')
        const requestData = { ...this.APIEndPoints.Partner.GetActions }
        if (_get(json, 'page', false)) {
            requestData.url += `&page=${json.page}`
        }

        return this.sendRequest(
            requestData,
            json
        )
    }
}
