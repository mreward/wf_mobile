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
    },
    Actions: {
        getProducts: 'MrewardShop/getProducts',
        getProductsTop: 'MrewardShop/getProductsTop',
        getProductsGroups: 'MrewardShop/getProductsGroups',
    },
    Getters: {
        products: 'MrewardShop/products',
        productsTop: 'MrewardShop/productsTop',
        productsGroups: 'MrewardShop/productsGroups',
    }
}
