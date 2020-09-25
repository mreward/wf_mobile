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
}
