<template>
    <layout
        layout="default"
        :title="false"
    >
        <poll-card
            :poll="poll"
        />
    </layout>
</template>

<script>
    import PollCard from '_poll_card'

    export default {
        name: 'screen-poll-details',
        components: {
            PollCard
        },
        props: {
            poll: {
                type: Object,
                default: () => ({})
            }
        }
    }
</script>

<style scoped>

</style>
