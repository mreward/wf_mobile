<template>
    <div
        class="back-button"
        @click="back"
    >
        <v-ons-icon :icon="icon" />
    </div>
</template>

<script>
    import constants from '_vuex_constants'
    import isFunction from 'lodash/isFunction'
    import { mapActions } from 'vuex'

    export default {
        name: 'back-button',
        // TODO Refactor with props type validation
        props: {
            icon: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {}
        },
        inject: {
            onBack: {
                default: null
            }
        },
        methods: {
            ...mapActions({
                popPage: constants.App.Actions.popPage
            }),
            back() {
                if (isFunction(this.onBack)) {
                    this.onBack()
                } else if (!this.disabled) {
                    this.popPage()
                }
            }
        }
    }
</script>
