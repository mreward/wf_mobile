<template>
    <div class="history__product">
        <div class="product__header">
            <div class="product__name">{{ product.name }}</div>
            <div class="product__sum">{{ product.sum }}</div>
        </div>
        <div class="product__footer">
            {{ product.amount }} x {{ product.price }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'history-product-item',
        props: {
            product: {
                type: Object,
                default: () => ({})
            }
        }
    }
</script>
