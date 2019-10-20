<template>
    <layout
        :title="$t('m_raffles')"
    >
        <div class="card-container--raffles padding-top--base">
            <pull-to-wrapper
                class="card-container__vertical-wrapper"
                :update-action="updateRaffles"
            >
                <raffle-card
                    v-for="(item, index) in allRaffles"
                    :key="index"
                    :item="item"
                />
            </pull-to-wrapper>
        </div>
    </layout>
</template>

<script>
    import ScreenRafflesMixin from '_screen_raffles_mixin'
    import PullToWrapper from '_pull_to_wrapper'
    import RaffleCard from '_raffle_card'

    export default {
        name: 'screen-raffles',
        components: {
            PullToWrapper,
            RaffleCard
        },
        mixins: [
            ScreenRafflesMixin
        ]
    }
</script>
