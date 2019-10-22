<template>
    <layout
        :title="$t('m_raffles')"
        page="raffles"
    >
        <div class="raffle">
            <div class="raffle__title padding-vertical--base">
                {{ raffleData.name }}
            </div>

            <div class="raffle__img">
                <img :src="raffleData.images.mobile"/>
            </div>

            <div class="raffle__text-normal padding-vertical--base">
                {{ $t('m_raffles_period_dibs_accumulation') }}
                <div class="raffle__text-primary-bold margin-top--xsmall">
                    {{ raffleData.datePeriod }}
                </div>
            </div>

            <div class="raffle__dashed-border raffle__text-normal padding-vertical--base">
                {{ $t('m_raffles_residue_from_last_purchase') }}
                <div class="raffle__text-bold margin-top--xsmall">
                    {{ raffleData.dibsForNext }}
                </div>
            </div>

            <div class="raffle__dashed-border raffle__text-normal padding-vertical--base">
                <div v-html="raffleData.description" />
            </div>

            <div class="padding-vertical--base">
                {{ $t('m_raffles_my_dibs') }}

            </div>

            <div class="raffle__text-muted">
                {{ raffleData.expiredDate }}
            </div>
        </div>
    </layout>
</template>

<script>
    import ScreenRaffleDetailsMixin from '_screen_raffle_details_mixin'

    export default {
        name: 'screen-raffle-details',
        mixins: [ScreenRaffleDetailsMixin]
    }
</script>
