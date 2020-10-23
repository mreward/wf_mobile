import ApiClient from '_CORE/modules/mReward/libs/ApiClient'

export default class MrewardGeo extends ApiClient {
    /**
     * Get Countries
     * @returns {Promise}
     * @constructor
     */
    GetCountries() {
        this.logger('MrewardGeo:GetCountries')
        return this.sendRequest(this.APIEndPoints.Geo.GetCountries)
    }

    /**
     * Get Cities
     * @returns {Promise}
     * @constructor
     */
    GetCities(json) {
        this.logger('MrewardGeo:GetCities')
        return this.sendRequest(this.APIEndPoints.Geo.GetCities, json)
    }

    /**
     * Get city by id
     * @returns {Promise}
     * @constructor
     */
    GetCityById(json) {
        this.logger('MrewardGeo:GetCityById')
        return this.sendRequest(this.APIEndPoints.Geo.GetCityById, json)
    }
}
