import ApiClient from '_CORE/modules/mReward/libs/ApiClient'

export default class MrewardСakeDesigner extends ApiClient {
    GetAgreement(json) {
        this.logger('MrewardСakeDesigner:GetAgreement')
        const requestData = { ...this.APIEndPoints.Construct.GetAgreement }

        return this.sendRequest(
            requestData,
            {
                ...json,
                networkFirst: true
            })
    }

    GetDecor(json) {
        this.logger('MrewardСakeDesigner:GetDecor')
        const requestData = { ...this.APIEndPoints.Construct.GetDecor }

        return this.sendRequest(
            requestData,
            {
                ...json,
                networkFirst: true
            })
    }

    GetDecorGallery(json) {
        this.logger('MrewardСakeDesigner:GetDecorGallery')
        const requestData = { ...this.APIEndPoints.Construct.GetDecorGallery }

        return this.sendRequest(
            requestData,
            {
                ...json,
                networkFirst: true
            })
    }

    GetFillings(json) {
        this.logger('MrewardСakeDesigner:GetFillings')
        const requestData = { ...this.APIEndPoints.Construct.GetFillings }

        return this.sendRequest(
            requestData,
            {
                ...json,
                networkFirst: true
            })
    }

    /**
     * Upload decor image
     * @param imageURI
     * @param options
     * @returns {Promise}
     * @constructor
     */
    UploadDecorImage({ imageURI, options }) {
        this.logger('MrewardСakeDesigner:UploadDecorImage')
        const ft = new FileTransfer()

        if (this.authToken) {
            const encodedAuthorizationToken = btoa(`${this.authToken}:`)
            options.headers.Authorization = `Basic ${encodedAuthorizationToken}`
        }

        const { apiVersion, apiTag, url } = this.APIEndPoints.Construct.UploadDecorImage

        return new Promise((resolve, reject) => {
            ft.upload(imageURI, this.url + apiVersion + apiTag + url, (r) => {
                if (JSON.parse(r.response).success === true) {
                    resolve(JSON.parse(r.response).data)
                }
                reject(new Error('Error occurred'))
            }, (e) => {
                reject(JSON.parse(e.body).data)
            }, options)
        })
    }

    GetLetterings(json) {
        this.logger('MrewardСakeDesigner:GetLetterings')
        const requestData = { ...this.APIEndPoints.Construct.GetLetterings }

        return this.sendRequest(
            requestData,
            {
                ...json,
                networkFirst: true
            })
    }

    GetLetteringCategories(json) {
        this.logger('MrewardСakeDesigner:GetLetteringCategories')
        const requestData = { ...this.APIEndPoints.Construct.GetLetteringCategories }

        return this.sendRequest(
            requestData,
            {
                ...json,
                networkFirst: true
            })
    }

    GetLetteringGallery(json) {
        this.logger('MrewardСakeDesigner:GetLetteringGallery')
        const requestData = { ...this.APIEndPoints.Construct.GetLetteringGallery }

        return this.sendRequest(
            requestData,
            {
                ...json,
                networkFirst: true
            })
    }

    GetDeliveryPreset(json) {
        this.logger('MrewardСakeDesigner:GetDeliveryPreset')
        const requestData = { ...this.APIEndPoints.Construct.GetDeliveryPreset }

        return this.sendRequest(
            requestData,
            {
                ...json,
                networkFirst: true
            })
    }

    Order(json, config) {
        this.logger('MrewardСakeDesigner:Order')
        const requestData = { ...this.APIEndPoints.Construct.Order }

        return this.sendRequest(
            requestData,
            {
                ...json,
                networkFirst: true
            }, config)
    }

    PreCheck(json, config) {
        this.logger('MrewardСakeDesigner:PreCheck')
        const requestData = { ...this.APIEndPoints.Shop.PreCheck }

        return this.sendRequest(
            requestData,
            {
                ...json,
                networkFirst: true
            }, config)
    }

    /**
     * Upload feedback image
     * @param imageURI
     * @param options
     * @returns {Promise}
     * @constructor
     */
    UploadFeedbackImage({ imageURI, options }) {
        this.logger('MrewardСakeDesigner:UploadFeedbackImage')
        const ft = new FileTransfer()

        if (this.authToken) {
            const encodedAuthorizationToken = btoa(`${this.authToken}:`)
            options.headers.Authorization = `Basic ${encodedAuthorizationToken}`
        }

        const { apiVersion, apiTag, url } = this.APIEndPoints.Construct.UploadFeedbackImage

        return new Promise((resolve, reject) => {
            ft.upload(imageURI, this.url + apiVersion + apiTag + url, (r) => {
                if (JSON.parse(r.response).success === true) {
                    resolve(JSON.parse(r.response).data)
                }
                reject(new Error('Error occurred'))
            }, (e) => {
                reject(JSON.parse(e.body).data)
            }, options)
        })
    }

    Feedback(json, config) {
        this.logger('MrewardСakeDesigner:Feedback')
        const requestData = { ...this.APIEndPoints.Construct.Feedback }

        return this.sendRequest(
            requestData,
            {
                ...json,
                networkFirst: true
            }, config)
    }
}
