<template>
    <div
        :class="['select-card-list__item', `select-card-list__item--${iconDirection}`]"
        :style="{
            backgroundImage: `url(${image})`
        }"
        @click="$emit('select', value)"
    >
        <div
            v-if="!value.image && value.text"
            class="select-card-list__item-text"
        >
            {{ value.text }}
        </div>

        <v-btn
            v-if="icon"
            small
            :class="['btn-check', {
                'btn-check--active': isSelected
            }]"
        >
            <i :class="icon" />
        </v-btn>
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
            defaultImage: {
                type: String,
                default: ''
            },
            selected: {
                type: Boolean,
                default: false
            }
        },

        computed: {
            image() {
                return get(this.value, 'img_main_800_600', this.defaultImage)
            },
            isSelected() {
                return this.selected
            }
        }
    }
</script>
