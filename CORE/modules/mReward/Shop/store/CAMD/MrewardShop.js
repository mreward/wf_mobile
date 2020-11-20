export default {
    Mutations: {
        Products: {
            name: 'PRODUCTS',
            nameGlobal: 'MrewardShop/PRODUCTS'
        },
        ProductsTop: {
            name: 'PRODUCTSTOP',
            nameGlobal: 'MrewardShop/PRODUCTSTOP'
        },
        ProductsGroups: {
            name: 'PRODUCTSGROUPS',
            nameGlobal: 'MrewardShop/PRODUCTSGROUPS'
        },
        Cart: {
            name: 'CART',
            nameGlobal: 'MrewardShop/CART'
        },
        ProductsFavorite: {
            name: 'PRODUCTSFAVORITE',
            nameGlobal: 'MrewardShop/PRODUCTSFAVORITE'
        },
        DeliveryList: {
            name: 'DELIVERYLIST',
            nameGlobal: 'MrewardShop/DELIVERYLIST'
        },
        Country: {
            name: 'COUNTRY',
            nameGlobal: 'MrewardShop/COUNTRY'
        },
        ProductSearch: {
            name: 'PRODUCTSEARCH',
            nameGlobal: 'MrewardShop/PRODUCTSEARCH'
        },
        PayData: {
            name: 'PAYDATA',
            nameGlobal: 'MrewardShop/PAYDATA'
        },
        ProductSearchLoader: {
            name: 'PRODUCTSEARCHLOADER',
            nameGlobal: 'MrewardShop/PRODUCTSEARCHLOADER'
        },
        Orders: {
            name: 'ORDERS',
            nameGlobal: 'MrewardShop/ORDERS'
        },
        Address: {
            name: 'ADDRESS',
            nameGlobal: 'MrewardShop/ADDRESS'
        },
        ProductsCategory: {
            name: 'PRODUCTSCATEGORY',
            nameGlobal: 'MrewardShop/PRODUCTSCATEGORY'
        },
    },
    Actions: {
        getProducts: 'MrewardShop/getProducts',
        getProductsTop: 'MrewardShop/getProductsTop',
        getProductsGroups: 'MrewardShop/getProductsGroups',
        addToCart: 'MrewardShop/addToCart',
        removeFromCart: 'MrewardShop/removeFromCart',
        clearCart: 'MrewardShop/clearCart',
        setFavorite: 'MrewardShop/setFavorite',
        removeFavorite: 'MrewardShop/removeFavorite',
        getProductsFavorite: 'MrewardShop/getProductsFavorite',
        getDeliveryList: 'MrewardShop/getDeliveryList',
        preCheck: 'MrewardShop/preCheck',
        paymentUrl: 'MrewardShop/paymentUrl',
        selectCountry: 'MrewardShop/selectCountry',
        getProduct: 'MrewardShop/getProduct',
        getProductSearch: 'MrewardShop/getProductSearch',
        getProductSearchTag: 'MrewardShop/getProductSearchTag',
        getProductsCategory: 'MrewardShop/getProductsCategory',
        clearProductSearch: 'MrewardShop/clearProductSearch',
        getPriceDelivery: 'MrewardShop/getPriceDelivery',
        loadSelectCountry: 'MrewardShop/loadSelectCountry',
        checkConfirm: 'MrewardShop/checkConfirm',
        onlineStoreApplication: 'MrewardShop/onlineStoreApplication',
        getOrders: 'MrewardShop/getOrders',
        checkReturn: 'MrewardShop/checkReturn',
        onlineRefund: 'MrewardShop/onlineRefund',
        onlineStoreStatus: 'MrewardShop/onlineStoreStatus',
        listDeliveryAddress: 'MrewardShop/listDeliveryAddress',
        removeDeliveryAddress: 'MrewardShop/removeDeliveryAddress',
        clearProductsCategory: 'MrewardShop/clearProductsCategory',
    },
    Getters: {
        products: 'MrewardShop/products',
        productsTop: 'MrewardShop/productsTop',
        productsGroups: 'MrewardShop/productsGroups',
        cart: 'MrewardShop/cart',
        totalCartProduct: 'MrewardShop/totalCartProduct',
        productsFavorite: 'MrewardShop/productsFavorite',
        deliveryList: 'MrewardShop/deliveryList',
        country: 'MrewardShop/country',
        productSearch: 'MrewardShop/productSearch',
        payData: 'MrewardShop/payData',
        productSearchLoader: 'MrewardShop/productSearchLoader',
        orders: 'MrewardShop/orders',
        address: 'MrewardShop/address',
        productsCategory: 'MrewardShop/productsCategory',
    }
}
