<template>
    <v-ons-dialog
        class="alert"
        :visible.sync="visible"
        :class="classAlert"
    >
        <div class="alert__body">
            <alert-confirm-notification
                v-if="isNotification"
                :item="pushData"
                :icon="icon"
                :img="img"
                :title="title"
                :text="text"
                :cancel-name="cancelName"
                :next-name="nextName"
                @cancel="$emit('cancel')"
                @next="$emit('next')"
            />

            <alert-confirm-default
                v-else
                :icon="icon"
                :img="img"
                :sub-icon="subIcon"
                :title="title"
                :text="text"
            >
                <div
                    slot="buttons"
                    class="alert__buttons"
                    :class="{'is-length': cancelName.length >= 12 || nextName.length >= 12}"
                >
                    <v-ons-button
                        class="alert__button-primary"
                        data-test="alert-next-button"
                        @click="$emit('next')"
                    >
                        {{ nextName }}
                    </v-ons-button>

                    <template v-if="cancelName">
                        <v-ons-button
                            class="alert__button-cancel"

                            modifier="quiet"
                            @click="$emit('cancel')"
                        >
                            {{ cancelName }}
                        </v-ons-button>
                    </template>
                </div>
            </alert-confirm-default>
        </div>
    </v-ons-dialog>
</template>

<script>
    import AlertConfirmDefault from '_alert_confirm_default'
    import AlertConfirmNotification from '_alert_confirm_notification'

    export default {
        name: 'alert-confirm',
        components: {
            AlertConfirmDefault,
            AlertConfirmNotification
        },
        props: {
            timeout: {
                type: Number,
                default: 0
            },
            pushData: {
                type: Object,
                default: () => ({})
            },
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
            isBorder: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: ''
            },
            text: {
                type: String,
                default: ''
            },
            nextName: {
                type: String,
                default: ''
            },
            cancelName: {
                type: String,
                default: ''
            },
            visible: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: 'confirm'
            },
            showAgainCheckbox: {
                type: Boolean,
                default: false
            },
            addFavorite: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {}
        },
        computed: {
            isNotification() {
                return this.type === 'notification'
            },

            classAlert() {
                return [
                    { 'alert--notification': this.isNotification },
                    { 'alert--default': !this.isNotification },
                    `alert--${this.type}`
                ]
            }
        },
        watch: {
            timeout() {
                if (this.timeout > 0) {
                    setTimeout(() => {
                        this.close()
                    }, this.timeout)
                }
            }
        },
        methods: {
            close() {
                this.$emit('update:visible', false)
            }
        }
    }
</script>
