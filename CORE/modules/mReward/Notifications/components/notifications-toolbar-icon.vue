<template>
    <v-ons-icon
        :class="showDot"
        icon="notifications"
        @click="$bus.$emit('goToPage', { page: 'notifications' })"
    />
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import constants from '_vuex_constants'

    export default {
        name: 'notifications-toolbar-icon',
        computed: {
            ...mapGetters({
                notificationsUnread: constants.MrewardNotifications.Getters.notificationsUnread
            }),
            showDot() {
                return [
                    { 'hide-notifications-counter': !this.notificationsUnread.length }
                ]
            }
        },
        async created() {
            try {
                await this.getNotifications({ networkFirst: true })
            } catch (e) {
                this.$Alert.Error(e)
            }
        },
        methods: {
            ...mapActions({
                getNotifications: constants.MrewardNotifications.Actions.getNotifications
            })
        }
    }
</script>

<style scoped>

</style>
