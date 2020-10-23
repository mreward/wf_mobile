import ApiClient from '_CORE/modules/mReward/libs/ApiClient'

export default class MrewardAccount extends ApiClient {
    /**
     * Get User Balances
     * @returns {Promise}
     * @constructor
     */
    GetBalance(json) {
        this.logger('MrewardAccount:GetBalance')
        return this.sendRequest(this.APIEndPoints.Account.GetBalance, json)
    }

    /**
     * Get User Accounts
     * @returns {Promise}
     * @constructor
     */
    GetAccounts(json) {
        this.logger('MrewardAccount:GetBalance')
        return this.sendRequest(this.APIEndPoints.Account.GetAccounts, json)
    }
}
