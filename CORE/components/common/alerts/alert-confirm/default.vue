<template>
    <div>
        <div
            class="alert__icon"
            v-show="icon"
        >
            <div :class="classesWrapper">
                <v-ons-icon
                    :icon="icon"
                />
            </div>
        </div>

        <div
                class="alert__image"
                v-show="img"
        >
            <div :class="classesWrapper">
                <img :src="img">
            </div>
        </div>

        <div class="alert__heading">
            {{ title }}
        </div>
        <div
            class="alert__text"
            v-html="text"
        />

        <slot name="buttons" />
    </div>
</template>

<script>

    export default {

        name: 'alert-confirm-default',
        props: {
            icon: {
                type: String,
                default: ''
            },
            img: {
                type: String,
                default: ''
            },
            subIcon: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            text: {
                type: String,
                default: ''
            }
        },
        data() {
            return {}
        },

        computed: {
            classesWrapper() {
                return {[`alert__icon--sub-${this.subIcon}`]: this.subIcon}
            }
        }
    }
</script>
