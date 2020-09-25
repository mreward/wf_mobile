import ApiClient from '_CORE/modules/mReward/libs/ApiClient'

export default class MrewardСakeDesignerMockMock extends ApiClient {
    GetAgreement(json) {
        this.logger('MrewardСakeDesignerMock:GetAgreement')
        const requestData = { ...this.APIEndPoints.Construct.GetAgreement }

        return new Promise(resolve => {
            resolve(JSON.parse(`{
                "partner": null,
                "agreement": [
                    {
                        "partner_id": 2,
                        "partner_name": "Macys",
                        "agreement": "<p>Text for Macys</p>",
                        "status": 1,
                        "status_name": "Active"
                    },
                    {
                        "partner_id": 1,
                        "partner_name": "Starbucks",
                        "agreement": "<p>Text fo Starbucks</p>",
                        "status": 1,
                        "status_name": "Active"
                    }
                ]
            }`), requestData)
        })
    }

    GetDecor(json) {
        this.logger('MrewardСakeDesignerMock:GetDecor')
        const requestData = { ...this.APIEndPoints.Construct.GetDecor }

        return new Promise(resolve => {
            resolve(JSON.parse(`{
                "partner": null,
                "decor": [
                {
                    "partner_id": 1,
                    "partner_name": "Starbucks",
                    "decor": [
                        {
                            "id": 1,
                            "art_id": "000115",
                            "name": "Оформление гель",
                            "price": 243,
                            "required_gallery": false,
                            "required_upload": false
                        },
                        {
                            "id": 2,
                            "art_id": "000116",
                            "name": "Оформление крем",
                            "price": 276,
                            "required_gallery": false,
                            "required_upload": false
                        },
                        {
                            "id": 3,
                            "art_id": "000117",
                            "name": "Оформление изображение из галереи ",
                            "price": 455,
                            "required_gallery": true,
                            "required_upload": false
                        },
                        {
                            "id": 4,
                            "art_id": "000118",
                            "name": "Оформление загруженное изображение",
                            "price": 610,
                            "required_gallery": false,
                            "required_upload": true
                        }
                    ]
                },
                {
                    "partner_id": 3,
                    "partner_name": "test",
                    "decor": []
                },
                {
                    "partner_id": 2,
                    "partner_name": "Macys",
                    "decor": []
                }
                ]
            }`), requestData)
        })
    }

    GetDecorGallery(json) {
        this.logger('MrewardСakeDesignerMock:GetDecorGallery')
        const requestData = { ...this.APIEndPoints.Construct.GetDecorGallery }

        return new Promise(resolve => {
            resolve(JSON.parse(`{
                "items": [
                    {
                        "id": 1,
                        "category_id": 3,
                        "category_name": "День рождения",
                        "partner_id": 1,
                        "partner_name": "Starbucks",
                        "img_origin": "http://storage.u-solutions.local/storage/construct_gallery/0/1/1/1_origin_1.jpg",
                        "img_main_800_600": "http://storage.u-solutions.local/storage/construct_gallery/0/1/1/1_main_1.jpg",
                        "img_mobile_420_210": "http://storage.u-solutions.local/storage/construct_gallery/0/1/1/1_mobile_1.jpg",
                        "img_thumbnail_100_80": "http://storage.u-solutions.local/storage/construct_gallery/0/1/1/1_thumbnail_1.jpg",
                        "img_icon_40_40": "http://storage.u-solutions.local/storage/construct_gallery/0/1/1/1_icon_1.jpg"
                    },
                    {
                        "id": 4,
                        "category_id": 3,
                        "category_name": "День рождения",
                        "partner_id": 1,
                        "partner_name": "Starbucks",
                        "img_origin": "http://storage.u-solutions.local/storage/construct_gallery/0/4/4/4_origin_1.jpg",
                        "img_main_800_600": "http://storage.u-solutions.local/storage/construct_gallery/0/4/4/4_main_1.jpg",
                        "img_mobile_420_210": "http://storage.u-solutions.local/storage/construct_gallery/0/4/4/4_mobile_1.jpg",
                        "img_thumbnail_100_80": "http://storage.u-solutions.local/storage/construct_gallery/0/4/4/4_thumbnail_1.jpg",
                        "img_icon_40_40": "http://storage.u-solutions.local/storage/construct_gallery/0/4/4/4_icon_1.jpg"
                    },
                    {
                        "id": 5,
                        "category_id": 3,
                        "category_name": "День рождения",
                        "partner_id": 1,
                        "partner_name": "Starbucks",
                        "img_origin": "http://storage.u-solutions.local/storage/construct_gallery/0/5/5/5_origin_1.jpg",
                        "img_main_800_600": "http://storage.u-solutions.local/storage/construct_gallery/0/5/5/5_main_1.jpg",
                        "img_mobile_420_210": "http://storage.u-solutions.local/storage/construct_gallery/0/5/5/5_mobile_1.jpg",
                        "img_thumbnail_100_80": "http://storage.u-solutions.local/storage/construct_gallery/0/5/5/5_thumbnail_1.jpg",
                        "img_icon_40_40": "http://storage.u-solutions.local/storage/construct_gallery/0/5/5/5_icon_1.jpg"
                    }
                ],
                "_links": {
                    "self": {
                        "href": "http://api.u-solutions.local/v2/client/construct/gallery?partner_id=1&category_id=3&page=1"
                    }
                },
                "_meta": {
                    "totalCount": 3,
                    "pageCount": 1,
                    "currentPage": 1,
                    "perPage": 20
                }
            }`), requestData)
        })
    }

    GetFillings(json) {
        this.logger('MrewardСakeDesignerMock:GetFillings')
        const requestData = { ...this.APIEndPoints.Construct.GetFillings }

        return new Promise(resolve => {
            resolve(JSON.parse(`{
                "partner": null,
                "filling": [
                    {
                        "partner_id": 1,
                        "partner_name": "Starbucks",
                        "filling": [
                        {
                            "id": 2,
                            "art_id": "688911",
                            "name": "Начинка снежок",
                            "price": 130
                        },
                        {
                            "id": 3,
                            "art_id": "688912",
                            "name": "Начинка смедовая",
                            "price": 234
                        }
                        ]
                    },
                    {
                        "partner_id": 3,
                        "partner_name": "test",
                        "filling": [
                        {
                            "id": 1,
                            "art_id": "788911",
                            "name": "Tekila Patron silver 0.5",
                            "price": 1343
                        }
                        ]
                    },
                    {
                        "partner_id": 2,
                        "partner_name": "Macys",
                        "filling": []
                    }
                ]
            }`), requestData)
        })
    }

    GetLetterings(json) {
        this.logger('MrewardСakeDesignerMock:GetLetterings')
        const requestData = { ...this.APIEndPoints.Construct.GetLetterings }

        return new Promise(resolve => {
            resolve(JSON.parse(`{
                "partner": null,
                "list": [
                {
                    "partner_id": 1,
                    "partner_name": "Starbucks",
                    "list": [
                    {
                        "id": 1,
                        "art_id": "000444",
                        "name": "Собственная надпись",
                        "price": 150,
                        "required_gallery": false,
                        "required_input": true
                    },
                    {
                        "id": 2,
                        "art_id": "000445",
                        "name": "Надпись из галереи ",
                        "price": 150,
                        "required_gallery": true,
                        "required_input": false
                    }
                    ]
                }
                ]
            }`), requestData)
        })
    }

    GetLetteringCategories(json) {
        this.logger('MrewardСakeDesignerMock:GetLetteringCategories')
        const requestData = { ...this.APIEndPoints.Construct.GetLetteringCategories }

        return new Promise(resolve => {
            resolve(JSON.parse(`{
                "partner": null,
                "category": [
                {
                    "partner_id": 1,
                    "partner_name": "Starbucks",
                    "category": [
                    {
                        "id": 2,
                        "name": "Свадьба"
                    },
                    {
                        "id": 1,
                        "name": "День рождения"
                    }
                    ]
                }
                ]
            }`), requestData)
        })
    }

    GetLetteringGallery(json) {
        this.logger('MrewardСakeDesignerMock:GetLetteringGallery')
        const requestData = { ...this.APIEndPoints.Construct.GetLetteringGallery }

        return new Promise(resolve => {
            resolve(JSON.parse(`{
                "items": [
                    {
                        "id": 1,
                        "text": "Text 1",
                        "category_id": 2,
                        "category_name": "Свадьба",
                        "partner_id": 1,
                        "partner_name": "Starbucks"
                    },
                    {
                        "id": 2,
                        "text": "Text 2",
                        "category_id": 1,
                        "category_name": "День рождения",
                        "partner_id": 1,
                        "partner_name": "Starbucks"
                    },
                    {
                        "id": 3,
                        "text": "Text 3",
                        "category_id": 2,
                        "category_name": "Свадьба",
                        "partner_id": 1,
                        "partner_name": "Starbucks"
                    }
                ],
                "_links": {
                    "self": {
                        "href": "http://api.u-solutions.local/v2/client/construct/construct-lettering-gallery?page=1"
                    }
                },
                "_meta": {
                    "totalCount": 3,
                    "pageCount": 1,
                    "currentPage": 1,
                    "perPage": 20
                }
            }`), requestData)
        })
    }
}
