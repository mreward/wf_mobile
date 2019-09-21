<template>
    <v-ons-popover
        cancelable
        :visible.sync="visible"
        target=".toolbar-main"
        direction="'up'"
        class="popover--status"
    >
        <slot>
            <div
                class="popover__icon"
                :class="{'is-success': status === 1 }"
            >
                <ons-icon :icon="status === 1 ? 'sucess' : 'exclamation'" />
            </div>
            <div class="popover__text">
                {{ title }}
            </div>
        </slot>
    </v-ons-popover>
</template>

<script>
    import isFunction from 'lodash/isFunction'

    export default {
        name: 'status-popover',
        data() {
            return {
                status: 1,
                title: '',
                visible: false
            }
        },
        created() {
            this.$bus.$on('showStatusPopover', this.showPopover)
        },
        beforeDestroy() {
            this.$bus.$off('showStatusPopover', this.showPopover)
        },
        methods: {
            showPopover({ status, title, nextEvent }) {
                this.status = status
                this.title = title
                this.visible = true
                setTimeout(async () => {
                    this.visible = false

                    if (isFunction(nextEvent)) {
                        nextEvent()
                    }
                }, 3000)
            }
        }
    }
</script>
