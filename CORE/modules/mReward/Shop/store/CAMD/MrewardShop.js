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
    },
    Actions: {
        getProducts: 'MrewardShop/getProducts',
        getProductsTop: 'MrewardShop/getProductsTop',
    },
    Getters: {
        products: 'MrewardShop/products',
        productsTop: 'MrewardShop/productsTop',
    }
}
