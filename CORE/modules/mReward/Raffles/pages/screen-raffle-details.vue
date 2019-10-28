<template>
    <layout
        layout="raffle-details"
        :title="$t('m_raffles')"
        page="raffles"
        :raffleData="raffleData"
    >
        <div class="raffle-content">
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

            <div
                v-show="raffleData.dibsForNext && !raffleData.isExpired"
                class="raffle__dashed-border-top raffle__text-normal padding-vertical--base"
            >
                {{ $t('m_raffles_residue_from_last_purchase') }}
                <div class="raffle__text-bold margin-top--xsmall">
                    {{ raffleData.amount - raffleData.dibsForNext }} {{ raffleData.currency }}
                    <span class="raffle__text-muted margin-left--small-base">
                        ( 1 {{ $t('m_raffles_dib') }} = {{ raffleData.amount }} {{ raffleData.currency }})
                    </span>
                </div>
            </div>

            <div class="raffle__dashed-border raffle__text-normal padding-vertical--base margin-bottom--base">
                <div v-html="raffleData.description" />
            </div>

            <div
                v-show="dibsView.length"
                class="raffle__list-wrapper padding-bottom--base"
                @click="showAllDibs = true"
            >
                {{ $t('m_raffles_my_dibs') }}
                <div
                    v-for="(item, index) in dibsView"
                    :key="index"
                    class="raffle__text-bold"
                >
                    {{ item }}
                </div>
                <div
                    v-show="raffleData.dibs.length > 6 && !showAllDibs"
                    class="blur-dibs-list"
                />
            </div>

            <div class="raffle__text-muted padding-bottom--base">
                {{ raffleData.expiredDate }}
            </div>
        </div>
    </layout>
</template>

<script>
    // TODO raffleData must be a props, not data
    import ScreenRaffleDetailsMixin from '_screen_raffle_details_mixin'

    export default {
        name: 'screen-raffle-details',
        mixins: [ScreenRaffleDetailsMixin]
    }
</script>
