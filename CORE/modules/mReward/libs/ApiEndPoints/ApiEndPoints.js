export default {
    User: {
        AuthenticateUser: {
            url: '/auth-phone',
            method: 'POST',
            apiVersion: 'v2.1',
            apiTag: '/client',
            contentType: 'application/x-www-form-urlencoded'
        },
        ChangePassword: {
            url: '/change-password',
            method: 'POST',
            apiVersion: 'v2.1',
            apiTag: '/client',
            contentType: 'application/x-www-form-urlencoded'
        },
        ChangePasswordConfirm: {
            url: '/change-password-confirm',
            method: 'POST',
            apiVersion: 'v2.1',
            apiTag: '/client',
            contentType: 'application/x-www-form-urlencoded'
        },
        RegistrationUser: {
            url: '/full-registration',
            method: 'POST',
            apiVersion: 'v2.1',
            apiTag: '/client',
            contentType: 'application/x-www-form-urlencoded'
        },
        RegistrationUserConfirm: {
            url: '/full-registration-confirm',
            method: 'POST',
            apiVersion: 'v2.1',
            apiTag: '/client',
            contentType: 'application/x-www-form-urlencoded'
        }
    },
    History: {
        GetHistory: {
            url: '/purchase-history',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client'
        }
    },
    Profile: {
        GetProfile: {
            url: '/profile',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client'
        },
        EditProfile: {
            url: '/profile',
            method: 'PUT',
            apiVersion: 'v2',
            apiTag: '/client'
        },
        ProfileParams: {
            url: '/profile-params',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client'
        },
        SendPushToken: {
            url: '/push-params',
            method: 'POST',
            apiVersion: 'v2',
            apiTag: '/client',
            contentType: 'application/x-www-form-urlencoded'
        },
        ProfileImage: {
            url: '/profile-image',
            method: 'POST',
            apiVersion: 'v2',
            apiTag: '/client',
            contentType: 'multipart/form-data'
        }
    },
    Partner: {
        GetActions: {
            url: '/actions?published=1&status=2&sort=-act_from',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client/partner'
        },
        GetActionItem: {
            url: '/actions',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client/partner'
        },
        GetNews: {
            url: '/news-all?sort=-date',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client/partner'
        },
        GetNewsItem: {
            url: '/news-all',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client/partner'
        },
        GetContacts: {
            url: '/partner-contacts',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client'
        }
    },
    Adresses: {
        GetAdresses: {
            url: '/partner/1/branches',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client'
        }
    },
    Geo: {
        GetCountries: {
            url: '/geo/countries',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client'
        },
        GetCityById: {
            url: '/geo/get-city',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client'
        },
        GetCities: {
            url: '/geo/search-city',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client'
        }
    },
    Poll: {
        GetPoll: {
            url: '/nps/list?communication_type=mobile&status=1',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client'
        },
        SetAnswer: {
            url: '/nps/vote',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client'
        }
    },
    Notifications: {
        GetNotifications: {
            url: '/push-list',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client'
        }
    },
    Account: {
        GetBalance: {
            url: '/account/BON/balance',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client'
        },
        GetAccounts: {
            url: '/accounts',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client'
        }
    },
    Card: {
        GetInfo: {
            url: '/card/card-info',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client'
        },
        Generate: {
            url: '/card/generate-card',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client'
        }
    },
    Raffles: {
        GetRaffles: {
            url: '/dibs/dibs',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client'
        }
    },
    Shop: {
        GetProducts: {
            url: '/product',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client'
        },
        GetProductsTop: {
            url: '/product/list-top',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client'
        },
        GetProductsGroups: {
            url: '/products/groups',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/partner'
        },
        SetFavorite: {
            url: '/product/set-favorite',
            method: 'POST',
            apiVersion: 'v2',
            apiTag: '/client'
        },
        RemoveFavorite: {
            url: '/product/remove-favorite',
            method: 'POST',
            apiVersion: 'v2',
            apiTag: '/client'
        },
        ListFavorite: {
            url: '/product/list-favorite',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client'
        },
        DeliveryList: {
            url: '/construct/construct-delivery-list',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client'
        },
        PreCheck: {
            url: '/operation/pre-check',
            method: 'POST',
            apiVersion: 'v2',
            apiTag: '/partner'
        },
        PaymentUrl: {
            url: '/payment-url',
            method: 'POST',
            apiVersion: 'v2',
            apiTag: '/client'
        },
        GetProduct: {
            url: '/products/product-view',
            method: 'POST',
            apiVersion: 'v2',
            apiTag: '/partner'
        },
        ProductSearch: {
            url: '/products/product-search',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/partner'
        },
        GetProductsCategory: {
            url: '/products',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/partner'
        },
        CheckConfirm: {
            url: '/operation/check-confirm',
            method: 'POST',
            apiVersion: 'v2',
            apiTag: '/partner'
        },
        OnlineStoreApplication: {
            url: '/operation/online-store-application',
            method: 'POST',
            apiVersion: 'v2',
            apiTag: '/partner'
        },
        OnlineOrder: {
            url: '/online-order',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client'
        },
        CheckReturn: {
            url: '/operation/check-return',
            method: 'POST',
            apiVersion: 'v2',
            apiTag: '/partner'
        },
        OnlineRefund: {
            url: '/online-refund',
            method: 'POST',
            apiVersion: 'v2',
            apiTag: '/client'
        },
        OnlineStoreStatus: {
            url: '/operation/online-store-status',
            method: 'POST',
            apiVersion: 'v2',
            apiTag: '/partner'
        },
        ListDeliveryAddress: {
            url: '/list-delivery-address',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client'
        },
        RemoveDeliveryAddress: {
            url: '/remove-delivery-address',
            method: 'POST',
            apiVersion: 'v2',
            apiTag: '/client'
        }
    },
    Construct: {
        GetAgreement: {
            url: '/construct-agreement',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client/construct'
        },
        GetDecor: {
            url: '/construct-decor',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client/construct'
        },
        GetDecorGallery: {
            url: '/gallery',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client/construct'
        },
        GetFillings: {
            url: '/construct-filling',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client/construct'
        },
        GetLetterings: {
            url: '/construct-lettering-list',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client/construct'
        },
        GetLetteringCategories: {
            url: '/construct-lettering-category',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client/construct'
        },
        GetLetteringGallery: {
            url: '/construct-lettering-gallery',
            method: 'GET',
            apiVersion: 'v2',
            apiTag: '/client/construct'
        },
        UploadDecorImage: {
            url: '/construct-decor-user-image',
            method: 'POST',
            apiVersion: 'v2',
            apiTag: '/client/construct'
        },
        UploadFeedbackImage: {
            url: '/construct-feedback-image',
            method: 'POST',
            apiVersion: 'v2',
            apiTag: '/client/construct'
        },
        SendFeedback: {
            url: '/construct-feedback',
            method: 'POST',
            apiVersion: 'v2',
            apiTag: '/client/construct'
        },
        Order: {
            url: '/construct-order',
            method: 'POST',
            apiVersion: 'v2',
            apiTag: '/client/construct'
        }
    }
}
