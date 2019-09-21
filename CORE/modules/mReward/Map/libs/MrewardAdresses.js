import ApiClient from '_CORE/modules/mReward/libs/ApiClient'
import _get from 'lodash/get'

export default class MrewardAdresses extends ApiClient {
    GetAdressesPoints(json) {
        this.logger('MrewardAdresses:GetAdressesPoints')
        const requestData = { ...this.APIEndPoints.Adresses.GetAdresses }
        if (_get(json, 'page', false)) {
            requestData.url += `?page=${json.page}`
        }

        return this.sendRequest(
            requestData,
            json
        )
    }
}
