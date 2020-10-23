<template>
    <div>
        <v-ons-toolbar-button
            v-if="button === 'menu'"
            v-ga:side-menu
            @click="$bus.$emit('onOpenDashboardMenu')"
        >
            <v-ons-icon icon="burger" />
        </v-ons-toolbar-button>
        <back-button
            v-if="button === 'back'"
            :icon="icon"
        />
    </div>
</template>

<script>
    import BackButton from './back-button'

    export default {
        name: 'toolbar-left',
        components: {
            BackButton
        },
        props: {
            button: {
                type: String,
                default: 'back'
            },
            icon: {
                type: String,
                default: ''
            }
        }
    }
</script>
