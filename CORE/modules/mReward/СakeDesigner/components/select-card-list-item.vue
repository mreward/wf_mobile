<template>
    <div
        :class="['select-card-list__item', `select-card-list__item--${iconDirection}`]"
        :style="{
            backgroundImage: `url(${value.img_main_800_600})`
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
            selected: {
                type: Boolean,
                default: false
            }
        },

        computed: {
            isSelected() {
                return this.selected
            }
        }
    }
</script>
