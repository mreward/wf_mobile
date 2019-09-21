<template>
    <alert-confirm
        :push-data="pushData"
        :timeout="timeout"
        :icon="icon"
        :sub-icon="subIcon"
        :title="title"
        :text="text"
        :cancel-name="cancelName"
        :next-name="nextName"
        :add-favorite="addFavorite"
        :type="type"
        :visible.sync="visible"
        :is-border="isBorder"
        :show-again-checkbox="showAgainCheckbox"
        @next="nextEvent"
        @cancel="cancelEvent"
    />
</template>

<script>
    export default {
        name: 'alert-confirm-helper',
        data() {
            return {
                pushData: {
                    body: '',
                    data: {
                        date: ''
                    },
                    tap: false,
                    title: '',
                    type: ''
                },
                timeout: 0,
                icon: '',
                subIcon: '',
                title: '',
                text: '',
                cancelName: '',
                addFavorite: false,
                type: 'confirm',
                visible: false,
                cancelCallback: null,
                nextCallback: null,
                isBorder: false,
                showAgainCheckbox: false,
                stack: [],
                nextName: ''
            }
        },
        created() {
            this.$bus.$on('alert-confirm:Show', this.alertConfirmShow)
        },
        beforeDestroy() {
            this.$bus.$off('alert-confirm:Show', this.alertConfirmShow)
        },
        methods: {
            alertConfirmShow(options = {}) {
                this.timeout = options.timeout
                this.pushData = options.pushData
                this.icon = options.icon
                this.subIcon = options.subIcon
                this.title = options.title
                this.text = options.text
                this.cancelName = options.cancelName
                this.nextName = options.nextName
                this.addFavorite = options.addFavorite
                this.type = options.type
                this.isBorder = options.isBorder
                this.showAgainCheckbox = options.showAgainCheckbox

                this.visible = true

                this.cancelCallback = options.cancelCallback
                this.nextCallback = options.nextCallback
            },
            cancelEvent() {
                this.visible = false

                if (this.cancelCallback) {
                    this.cancelCallback()
                }
            },
            nextEvent() {
                this.visible = false

                if (this.nextCallback) {
                    this.nextCallback()
                }
            }
        }
    }
</script>
