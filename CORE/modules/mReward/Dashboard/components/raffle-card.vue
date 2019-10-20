<template>
    <div class="card--horizontal">
        <div class="card__content">
            <div class="card__image--block">
                <i class="icon-k-symbol" />
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
    export default {
        name: 'raffle-card',
        props: {
            item: {
                type: Object,
                default: () => ({})
            }
        }
    }
</script>

