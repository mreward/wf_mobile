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

    GetProductsGroups(json) {
        this.logger('MrewardShop:GetProductsGroups')
        const requestData = { ...this.APIEndPoints.Shop.GetProductsGroups }

        return this.sendRequest(
          requestData,
          json,
          {
              partnerKey: '1e417e47-2bb6-440d-8168-c6a56abcb5a0'
          }
        )
    }

}
