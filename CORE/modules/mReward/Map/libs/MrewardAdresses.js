import ApiClient from '_CORE/modules/mReward/libs/ApiClient'
import _get from 'lodash/get'
import Axios from 'axios'

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

    async GetGoogleGeoInfo(json) {
        this.logger('MrewardAdresses:GetGoogleGeoInfo')

        try {
            return await Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${json.latitude},${json.longitude}&key=${json.googleApiKey}`)
        } catch (error) {
            return {
                data: {
                    returnDefault: true
                }
            }
        }
    }
}
