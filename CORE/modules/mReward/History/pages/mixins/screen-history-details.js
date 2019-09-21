import ProductItem from '_history_product_item'

export default {
    props: {
        history: {
            type: Object,
            default: () => ({})
        }
    },
    components: {
        ProductItem
    }
}
