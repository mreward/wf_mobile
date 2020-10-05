/**
 * API client mReward
 *
 * @author Wallet Factory
 */

import ApiEndPoints from './ApiEndPoints/ApiEndPoints'
import axios from '_CORE/utils/axios-cache-instance'
import _get from 'lodash/get'

export default class ApiClient {
    _config(options) {
        axios.interceptors.response.use(
            response => response,
            (error) => {
                if (error.message === 'Network Error' || error.message === 'No internet connection') {
                    return Promise.reject({
                        error: 404,
                        desc: 'Network Error'
                    })
                }

                if (error.message && error.message.indexOf('timeout of') > -1) {
                    return Promise.reject({
                        error: 504,
                        desc: 'Gateway Timeout.'
                    })
                }

                return Promise.reject(error)
            },
        )

        // Язык приложения
        this.lang = options.lang
        this.headers = {}
        this.isLogger = true
        this.phone = options.phone
        this.partnerKeys = options.partnerKeys

        this.url = options.mReward.API.url

        this.APIEndPoints = ApiEndPoints
    }

    logger(text, data = null) {
        if (this.isLogger) {
            // let textForLog = text;
            if (data) {
                // textForLog += `: ${JSON.stringify(data)}`;
                console.log(text, data)
            } else {
                console.log(text)
            }
        }
    }

    /**
     * Sending request
     * @param apiEndpoint - api method from ApiEndPoints
     * @param json - data for request
     * @param config - query caching configuration
     * @returns {Promise}
     */
    async sendRequest(apiEndpoint, json = {}, config = {}) {
        const headers = {
            'Content-Type': apiEndpoint.contentType ? apiEndpoint.contentType : 'application/json',
            'cache-control': 'no-cache',
            'Accept-Language': this.lang,
            'Content-Language': this.lang,
            ...this.headers
        }

        if (this.authToken) {
            if (config.partnerKey) {
                const encodedAuthorizationToken = btoa(`${config.partnerKey}:`)
                headers.Authorization = `Basic ${encodedAuthorizationToken}`
            } else {
                const encodedAuthorizationToken = btoa(`${this.authToken}:`)
                headers.Authorization = `Basic ${encodedAuthorizationToken}`
            }
        }

        let { url, method, apiVersion, apiTag } = apiEndpoint

        if (method === 'GET') {
            url = this.formatGetRequestUrl(apiEndpoint, json)
        }

        const requestSettings = {
            async: true,
            url: this.url + apiVersion + apiTag + url,
            method: method,
            headers,
            data: method === 'GET' ? '' : json,
            transformResponse: [function (response) {
                const res = typeof response === 'string' ? JSON.parse(response) : response
                // Transform only error data to match application error parser
                if (res.status >= 400 && res.status < 500) {
                    return {
                        ...res,
                        error: res.status,
                        // message: parseErrorMessage(res.data),
                        message: (function (data) {
                            if (data.message) {
                                return data.message
                            }
                            return _get(data, '[0].message', null)
                        }(res.data))
                    }
                }

                return res
            }],
            networkFirst: json.networkFirst || false
        }

        this.logger('mReward:sendRequest DATA', requestSettings)
        const { data: response } = await axios(requestSettings)
        if (response.success) {
            return response.data
        }
        throw response
    }

    formatGetRequestUrl(apiEndpoint, json) {
        let apiUrl = apiEndpoint.url
        const pureApiEndpointUrl = apiEndpoint.url.replace(/\?page=\d?/ig, '')
        switch (pureApiEndpointUrl) {
            case this.APIEndPoints.Poll.SetAnswer.url: {
                return `${apiEndpoint.url}/${json.type}/${json.pollId}/${json.answer}`
            }
            case this.APIEndPoints.History.GetHistory.url: {
                if (!json.dateFrom && !json.dateTo) {
                    return apiUrl
                }
                return `${apiEndpoint.url}?dateFrom=${json.dateTo}&dateTo=${json.dateFrom}&branch=${json.branch || ''}`
            }
            case this.APIEndPoints.Geo.GetCities.url: {
                return `/geo/${json.country}/${json.city}/search-city`
            }
            case this.APIEndPoints.Geo.GetCityById.url: {
                return `/geo/${json.id}/get-city`
            }
            case this.APIEndPoints.Adresses.GetAdresses.url: {
                if (json.page) {
                    return `/partner/${json.partnerId}/branches?page=${json.page}`
                }
                return `/partner/${json.partnerId}/branches`
            }
            case this.APIEndPoints.Shop.ProductSearch.url: {
                return `${apiEndpoint.url}?product=${json.product}`
            }
            case this.APIEndPoints.Shop.GetProductsCategory.url: {
                return `${apiEndpoint.url}?group_id=${json.group_id}`
            }
            case this.APIEndPoints.Construct.GetAgreement.url:
            case this.APIEndPoints.Construct.GetDecor.url:
            case this.APIEndPoints.Construct.GetFillings.url:
            case this.APIEndPoints.Construct.GetLetterings.url:
            case this.APIEndPoints.Construct.GetDeliveryPreset.url: {
                return `${apiEndpoint.url}?partner=${json.partnerId}`
            }
            case this.APIEndPoints.Construct.GetDecorGallery.url:
            case this.APIEndPoints.Construct.GetLetteringGallery.url: {
                return `${apiEndpoint.url}?partner_id=${json.partnerId}`
            }

            default: {
                return apiUrl
            }
        }
    }

    static setAuthToken(token) {
        if (token) {
            ApiClient.prototype.authToken = token
        }
    }

    static setConfig(data) {
        if (data) {
            ApiClient.prototype._config(data)
        }
    }
}
