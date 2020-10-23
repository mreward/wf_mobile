<template>
    <div
        class="card--horizontal"
        :class="{ 'muted': item.isExpired }"
        @click="goToRaffleDetailsPage"
    >
        <div class="card__content">
            <div class="card__image--block">
                <i class="icon-active" />
                <div class="card__dibs">
                    {{ item.count }}
                </div>
            </div>

            <div class="card__text--block">
                <div class="card__title">
                    {{ item.name }}
                </div>
                <div class="card__subtext">
                    {{ item.datePeriod }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import constants from '_vuex_constants'
    import { mapActions } from 'vuex'
    import ScreenRaffleDetails from '_screen_raffle_details'

    export default {
        name: 'raffle-card',
        props: {
            item: {
                type: Object,
                default: () => ({})
            }
        },
        methods: {
            ...mapActions({
                pushPage: constants.App.Actions.pushPage
            }),
            goToRaffleDetailsPage() {
                this.pushPage({
                    extends: ScreenRaffleDetails,
                    data: () => {
                        return {
                            raffleData: this.item
                        }
                    }
                })
            }
        }
    }
</script>

