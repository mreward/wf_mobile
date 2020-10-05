<template>
    <div
        v-if="items.length"
        class="select-card-list"
    >
        <select-card-list-item
            v-for="(item, index) in items"
            :key="index"
            :value="item"
            :selected="isSelected(item)"
            @select="$emit('input', $event)"
        />
    </div>
    <not-found-items
        v-else
        :message="notFoundMessage"
    />
</template>

<script>
    import { isEqual } from 'lodash'

    import SelectCardListItem from './select-card-list-item'

    export default {
        name: 'select-card-list',

        components: {
            SelectCardListItem
        },

        props: {
            items: {
                type: Array,
                default: () => ([])
            },
            value: {
                type: Object,
                default: () => ({})
            },
            notFoundMessage: {
                type: String,
                default: ''
            }
        },

        methods: {
            isSelected(item) {
                return isEqual(this.value, item)
            }
        }
    }
</script>

<style lang="scss">
    .select-card-list {
        display: grid;
        grid-auto-rows: 168px;
        grid-template-columns: 1fr 1fr;
        grid-row-gap: 8px;
        grid-column-gap: 7px;
        padding-top: 16px;

        &__item {
            position: relative;
            border-radius: 8px;
            background: #fff;
            border: 1px solid #CECED2;
            background-position: center;
            background-size: cover;

            &-text {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 150px;
                text-align: center;
            }

            .btn-check {
                bottom: 8px;
                right: 8px;
            }
        }
    }
</style>
