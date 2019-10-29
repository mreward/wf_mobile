<template>
    <div>
        <v-ons-pull-hook
            :action="updateAction"
            @changestate="state = $event.state"
        >
            <span v-show="state === 'initial'"> {{$t(pullText)}} </span>
            <span v-show="state === 'preaction'"> {{$t(triggerText)}} </span>
            <span v-show="state === 'action'"> {{$t(loadingText)}} </span>
        </v-ons-pull-hook>

        <slot></slot>
        <!---->
        <!--<pull-to-->
        <!--wrapper-height="20%"-->
        <!--:top-load-method="updateAction"-->
        <!--:top-config="hookToConfig"-->
        <!--&gt;-->
        <!---->
        <!--</pull-to>-->
    </div>
</template>

<script>
    // import PullTo from 'vue-pull-to'

    export default {
        name: 'pull-to-wrapper',
        components: {
            // PullTo,
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
        data () {
            return {
                state: 'initial',
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
