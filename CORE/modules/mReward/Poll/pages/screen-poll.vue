<template>
    <layout
        :layout="layout"
    >
        <pull-to-wrapper
            :update-action="updatePolls"
        >
            <template v-if="polls.length">
                <poll-card
                    v-for="(poll, index) in polls"
                    :key="index"
                    :poll="poll"
                />
            </template>
            <not-found-items
                v-else
                :message="$t('m_poll_not_found_promotions')"
            />
        </pull-to-wrapper>
    </layout>
</template>

<script>
    import ScreenPollMixin from '_screen_poll_mixin'

    export default {
        name: 'screen-poll',
        mixins: [
            ScreenPollMixin
        ]
    }
</script>
