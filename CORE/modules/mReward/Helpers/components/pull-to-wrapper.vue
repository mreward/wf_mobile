<template>
    <div>
        <v-ons-pull-hook
            :action="updateAction"
            @changestate="state = $event.state"
            class="pull-hook--wrapper"
        >
            <span v-show="state === 'initial'"> {{$t(pullText)}} </span>
            <span v-show="state === 'preaction'"> {{$t(triggerText)}} </span>
            <span v-show="state === 'action'"> {{$t(loadingText)}} </span>
        </v-ons-pull-hook>

        <slot></slot>
    </div>
</template>

<script>

    export default {
        name: 'pull-to-wrapper',
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
            }
        },
        data () {
            return {
                state: 'initial'
            }
        }
    }
</script>
