<template>
    <div class="select-list">
        <div
            v-if="title"
            class="select-list__header"
        >
            {{ title }}
        </div>

        <select-list-item
            v-for="(item, index) in items"
            :key="index"
            :value="item"
            :with-price="withPrice"
            :currency="currency"
            :selected="isSelected(item)"
            :default-name="defaultItemName"
            :default-description="defaultItemDescription"
            @select="$emit('input', $event)"
        >
            <template slot="content">
                <slot
                    name="content"
                />
            </template>
        </select-list-item>
    </div>
</template>

<script>
    import { isEqual } from 'lodash'

    import SelectListItem from './select-list-item'

    export default {
        name: 'select-list',

        components: {
            SelectListItem
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
            withPrice: {
                type: Boolean,
                default: false
            },
            currency: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            defaultItemName: {
                type: String,
                default: ''
            },
            defaultItemDescription: {
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
    .select-list {
        margin-bottom: 16px;

        &__header {
            font-size: 17px;
            line-height: 24px;
            margin-bottom: 8px;
            font-weight: 600;
        }

        &__item {
            position: relative;
            padding: 14px;
            border-radius: 8px;
            box-shadow: 0px 8px 15px rgba(39, 45, 45, 0.06);
            background: #fff;
            margin-bottom: 8px;

            &-title {
                display: flex;
                font-size: 15px;
                line-height: 20px;
                letter-spacing: -0.24px;
                font-weight: 600;
            }

            &-description {
                font-size: 12px;
                line-height: 16px;
                color: rgba(60, 60, 67, 0.6);
                margin-right: 50px;
                margin-top: 4px;
            }

            &-name {
                flex: 1;
            }

            &-price {
                text-align: right;
                letter-spacing: -0.24px;
                color: #6D0978;

                &--space {
                    margin-right: 38px;
                }
            }

            &--left {
                .select-list__item-description {
                    margin-left: 38px;
                }

                .select-list__item-name {
                    margin-left: 38px;
                }

                .btn-check {
                    right: auto;
                    left: 16px;
                }
            }
        }
    }

    .btn-check {
        position: absolute;
        border-radius: 50%;
        height: 22px !important;
        width: 22px !important;
        min-height: 22px !important;
        min-width: 22px !important;
        background: #fff !important;
        border: 1px solid #CECED2;
        box-shadow: unset !important;
        padding: 0 !important;
        bottom: 16px;
        right: 16px;

        .v-btn__content {
            visibility: hidden;
            font-size: 10px;
            line-height: 22px;
            letter-spacing: inherit;
        }

        &--center {
            bottom: 50%;
            transform: translateY(50%);
        }

        &--active {
            background: #6D0978 !important;
            border: none;

             .v-btn__content {
                visibility: visible;
                color: #fff !important;
             }
        }
    }
</style>
