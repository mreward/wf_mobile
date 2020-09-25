<template>
    <div>
        <div
            :class="['select-list__item', `select-list__item--${iconDirection}`]"
            @click="$emit('select', value)"
        >
            <div
                v-if="name"
                class="select-list__item-title"
            >
                <span class="select-list__item-name">
                    {{ name }}
                </span>
                <span
                    v-if="withPrice"
                    :class="['select-list__item-price', {
                        'select-list__item-price--space': !description
                    }]"
                >
                    {{ price }} {{ currency }}
                </span>
            </div>

            <div
                v-if="description"
                class="select-list__item-description"
            >
                {{ description }}
            </div>

            <v-btn
                v-if="icon"
                small
                :class="['btn-check', {
                    'btn-check--active': isSelected,
                    'btn-check--center': !withPrice || !description
                }]"
            >
                <i :class="icon" />
            </v-btn>
        </div>

        <template v-if="isSelected">
            <slot
                name="content"
            />
        </template>
    </div>
</template>

<script>
    import { get } from 'lodash'

    export default {
        name: 'select-list-item',

        props: {
            value: {
                type: Object,
                default: () => ({})
            },
            icon: {
                type: String,
                default: 'icon-checkmark'
            },
            iconDirection: {
                type: String,
                default: 'right'
            },
            withPrice: {
                type: Boolean,
                default: false
            },
            currency: {
                type: String,
                default: ''
            },
            selected: {
                type: Boolean,
                default: false
            },
            defaultImage: {
                type: String,
                default: ''
            },
            defaultName: {
                type: String,
                default: ''
            },
            defaultDescription: {
                type: String,
                default: ''
            },
            defaultPrice: {
                type: Number,
                default: 0
            }
        },

        computed: {
            isSelected() {
                return this.selected
            },
            description() {
                return get(this.value, 'description', this.defaultDescription)
            },
            name() {
                return get(this.value, 'name', this.defaultName)
            },
            price() {
                return get(this.value, 'price', this.defaultPrice)
            }
        }
    }
</script>
