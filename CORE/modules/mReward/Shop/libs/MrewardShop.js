import ApiClient from '_CORE/modules/mReward/libs/ApiClient'
import _get from 'lodash/get'

export default class MrewardShop extends ApiClient {
    GetProducts(json) {
        this.logger('MrewardShop:GetProducts')
        const requestData = { ...this.APIEndPoints.Shop.GetProducts }

        return this.sendRequest(
          requestData,
          {
              ...json,
              networkFirst: true,
          },
        )
    }

    GetProductsTop(json) {
        this.logger('MrewardShop:GetProductsTop')
        const requestData = { ...this.APIEndPoints.Shop.GetProductsTop }

        return this.sendRequest(
          requestData,
          {
              ...json,
              networkFirst: true,
          },
        )
    }

    GetProductsGroups(json, config) {
        this.logger('MrewardShop:GetProductsGroups')
        const requestData = { ...this.APIEndPoints.Shop.GetProductsGroups }

        return this.sendRequest(
          requestData,
          {
              ...json,
              networkFirst: true,
          }, config)
    }


    SetFavorite(json) {
        this.logger('MrewardShop:SetFavorite')
        const requestData = { ...this.APIEndPoints.Shop.SetFavorite }

        return this.sendRequest(
          requestData,
          {
              ...json,
              networkFirst: true,
          },
        )
    }

    RemoveFavorite(json) {
        this.logger('MrewardShop:RemoveFavorite')
        const requestData = { ...this.APIEndPoints.Shop.RemoveFavorite }

        return this.sendRequest(
          requestData,
          {
              ...json,
              networkFirst: true,
          },
        )
    }

    GetListFavorite(json) {
        this.logger('MrewardShop:GetListFavorite')
        const requestData = { ...this.APIEndPoints.Shop.ListFavorite }

        return this.sendRequest(
          requestData,
          {
              ...json,
              networkFirst: true,
          },
        )
    }

    GetDeliveryList(json) {
        this.logger('MrewardShop:GetDeliveryList')
        const requestData = { ...this.APIEndPoints.Shop.DeliveryList }

        return this.sendRequest(
          requestData,
          {
              ...json,
              networkFirst: true,
          },
        )
    }

    PaymentUrl(json) {
        this.logger('MrewardShop:PaymentUrl')
        const requestData = { ...this.APIEndPoints.Shop.PaymentUrl }

        return this.sendRequest(
          requestData,
          {
              ...json,
              networkFirst: true,
          },
        )
    }

    PreCheck(json, config) {
        this.logger('MrewardShop:PreCheck')
        const requestData = { ...this.APIEndPoints.Shop.PreCheck }

        return this.sendRequest(
          requestData,
          {
              ...json,
              networkFirst: true,
          }, config)
    }

    GetProduct(json, config) {
        this.logger('MrewardShop:PreCheck')
        const requestData = { ...this.APIEndPoints.Shop.GetProduct }

        return this.sendRequest(
          requestData,
          {
              ...json,
              networkFirst: true,
          }, config)
    }

    ProductSearch(json, config) {
        this.logger('MrewardShop:ProductSearch')
        const requestData = { ...this.APIEndPoints.Shop.ProductSearch }

        return this.sendRequest(
          requestData,
          {
              ...json,
              networkFirst: true,
          }, config)
    }

    GetProductsCategory(json, config) {
        this.logger('MrewardShop:GetProductsCategory')
        const requestData = { ...this.APIEndPoints.Shop.GetProductsCategory }

        return this.sendRequest(
          requestData,
          {
              ...json,
              networkFirst: true,
          }, config)
    }



}
