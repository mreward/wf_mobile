import ApiClient from '_CORE/modules/mReward/libs/ApiClient'
import _get from 'lodash/get'

export default class MrewardNews extends ApiClient {
    /**
     * Get partner news
     * @param json - Object
     * @returns {Promise}
     * @constructor
     */
    GetNews(json) {
        this.logger('MrewardNews:GetNews')
        const requestData = { ...this.APIEndPoints.Partner.GetNews }
        if (_get(json, 'page', false)) {
            requestData.url += `&page=${json.page}`
        }

        return this.sendRequest(
            requestData,
            json
        )
    }
}
