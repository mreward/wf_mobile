import ApiClient from '_CORE/modules/mReward/libs/ApiClient'
import _get from 'lodash/get'

export default class MrewardShop extends ApiClient {
    GetProducts(json) {
        this.logger('MrewardShop:GetProducts')
        const requestData = { ...this.APIEndPoints.Shop.GetProducts }

        return this.sendRequest(
          requestData,
          json
        )
    }

    GetProductsTop(json) {
        this.logger('MrewardShop:GetProductsTop')
        const requestData = { ...this.APIEndPoints.Shop.GetProductsTop }

        return this.sendRequest(
          requestData,
          json
        )
    }

}
