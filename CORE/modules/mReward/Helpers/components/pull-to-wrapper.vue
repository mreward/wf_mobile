<template>
    <pull-to
        :top-load-method="updateAction"
        :top-config="hookToConfig"
    >
        <slot></slot>
    </pull-to>
</template>

<script>
    import PullTo from 'vue-pull-to'

    export default {
        name: 'pull-to-wrapper',
        components: {
            PullTo
        },
        props: {
            updateAction: {
                type: Function,
                default: () => ({})
            },
            pullText: {
                type: String,
                default: 'm_helpers_pull_to_refresh'
            },
            triggerText: {
                type: String,
                default: 'm_helpers_pull_to_release'
            },
            loadingText: {
                type: String,
                default: 'm_helpers_pull_to_loading'
            },
            doneText: {
                type: String,
                default: ''
            },
            loadedStayTime: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                hookToConfig: {
                    pullText: this.$t(this.pullText),
                    triggerText: this.$t(this.triggerText),
                    loadingText: this.$t(this.loadingText),
                    doneText: this.doneText,
                    loadedStayTime: this.loadedStayTime
                }
            }
        }
    }
</script>
