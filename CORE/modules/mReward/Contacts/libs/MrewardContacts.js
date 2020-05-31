import ApiClient from '_CORE/modules/mReward/libs/ApiClient'

export default class MrewardContacts extends ApiClient {
    GetContacts(json) {
        this.logger('MrewardContacts:GetContacts')
        const requestData = { ...this.APIEndPoints.Partner.GetContacts }

        return this.sendRequest(
            requestData,
            json
        )
    }
}
