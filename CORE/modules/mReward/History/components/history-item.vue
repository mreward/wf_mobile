<template>
    <v-ons-list-item>
        <div class="left flex--justify-between">
            {{ item.name }}
            <span v-if="item.accruedBonuses">
                +{{ item.accruedBonuses }}
            </span>
        </div>
        <div class="center">
            {{ item.address }}
        </div>
        <div class="right text--muted">
            {{ item.date }}
            <i class="icon-next-page" />
        </div>
    </v-ons-list-item>
</template>

<script>
    export default {
        name: 'history-item',
        props: {
            item: {
                type: Object,
                default: () => ({}),
                required: true
            }
        }
    }
</script>

<style scoped>
    .icon-next-page {
        color: #CECED2;
        font-size: 10px;
    }
</style>
