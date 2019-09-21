<template>
    <div
        class="tile"
        :class="{ 'tile--vertical': isVertical }"
        @click="onClick($event)"
        :data-test="testData"
    >
        <div
            v-if="icon || img || $slots.icon"
            class="tile__icon"
        >
            <slot name="icon">
                <img
                    v-if="img"
                    :src="img"
                    alt=""
                >
                <v-ons-icon
                    v-if="icon"
                    :icon="icon"
                />
            </slot>
        </div>
        <div class="tile__title">
            <slot>
                {{ title }}
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'tile',
        props: {
            vertical: {
                type: Boolean,
                default: true
            },
            title: {
                type: String,
                default: ''
            },
            icon: {
                type: [String, Boolean],
                default: ''
            },
            img: {
                type: String,
                default: ''
            },
            testData: {
                type: String,
                default: ''
            }
        },
        computed: {
            isVertical() {
                return this.vertical
            }
        },
        methods: {
            onClick($event) {
                this.$emit('click', $event)
            }
        }
    }
</script>
