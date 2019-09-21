<template>
    <v-ons-button
        :class="classes"
        :modifier="currentModifier"
        :type="nativeType"
        :disabled="disabled"
        @click="onClick($event)"
    >
        <slot>
            <v-ons-icon
                v-if="_icon"
                :icon="_icon"
            />
        </slot>
    </v-ons-button>
</template>

<script>
    export default {
        name: 'button-base',
        props: {
            type: {
                type: String,
                default: 'default'
            },
            icon: {
                type: String,
                default: ''
            },
            modifier: {
                type: String,
                default: 'quiet'
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            classes() {
                return [
                    { 'button--expanded': this.type === 'expanded' },
                    { 'button--text': this.type === 'text' },
                    { 'button--main': this.type === 'main' },
                    { 'button--primary': this.type === 'primary' },
                    { 'button--auth': this.type === 'auth' },
                    { 'button--add': this.type === 'add' }
                ]
            },
            currentModifier() {
                switch (this.modifier) {
                    case 'main':
                    case 'auth':
                        return ''
                    case 'text':
                    case 'expanded':
                    case 'add':
                        return 'quiet'
                    default:
                        return this.modifier
                }
            },
            nativeType() {
                switch (this.type) {
                    case 'auth':
                    case 'submit':
                    case 'main':
                        return 'submit'
                    default:
                        return 'button'
                }
            },
            _icon() {
                let icon = this.icon

                if (this.type === 'add') {
                    icon = 'add'
                }

                switch (icon) {
                    case 'done':
                        return 'check'
                    case 'next':
                        return 'arrow-right'
                    default:
                        return icon
                }
            }
        },
        methods: {
            onClick($event) {
                this.$emit('click', $event)
            }
        }
    }
</script>
