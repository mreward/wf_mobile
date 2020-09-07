<template>
    <layout :title="false" page="order-details">
        <div class="history__header">
            <div class="history__logo">
                <v-ons-icon
                    icon="k-symbol"
                />
            </div>
            <div class="history__name">
                {{ history.name }}
            </div>
            <div class="history__address" v-if="history.address">
                {{ history.address }}
            </div>
        </div>

        <div class="history__separator"></div>

        <template v-for="(product, index) in history.products">
            <product-item
                :key="index + product.price"
                :product="product"
            />
        </template>

        <div class="history__separator"></div>

        <div class="history__sum">
            <div>{{ $t('m_history_sum') }}</div>
            <div>{{ history.sumTotal }}</div>
        </div>

        <div class="history__separator"></div>

        <div
            class="history__info-row"
            v-if="history.sumMoney"
        >
            <div>{{ $t('m_history_paid_money') }}</div>
            <div>{{ history.sumMoney }}</div>
        </div>

        <div
            class="history__info-row"
            v-if="history.debitedBonuses"
        >
            <div>{{ $t('m_history_debited_onuses') }}</div>
            <div>{{ history.debitedBonuses }}</div>
        </div>

        <div
            class="history__info-row"
            v-if="history.accruedBonuses"
        >
            <div>{{ $t('m_history_accrued_new_bonuses') }}</div>
            <div>{{ history.accruedBonuses }}</div>
        </div>

        <template v-if="history.fishka && history.fishka.length">
            <div class="history__separator"></div>
            <div
                v-for="(item, index) in history.fishka"
                :key="index"
                class="history__info-row"
            >
                <div>{{ $t('m_history_accrued_dibs', '', { generatorName: item.generator_name }) }}</div>
                <div>{{ item.count }}</div>
            </div>
        </template>

        <div class="history__date">
            {{ history.date }}
        </div>

        <div class="delivery__info">
            <div class="delivery__info__icon">
                <i class="icon-info"/>
            </div>
            <div class="delivery__info__text">
                Дорогой друг, хотим тебя предупредить: если твой адрес доставки не входит в зону со стандартной суммой оплаты доставки, то тебе нужно будет совершить доплату наличными курьеру.
            </div>
        </div>
    </layout>
</template>

<script>
    import ScreenHistoryDetailsMixin from '_screen_history_details_mixin'

    export default {
        name: 'screen-order-details',
        mixins: [
            ScreenHistoryDetailsMixin
        ]
    }
</script>

<style lang="scss">
    .page[page="order-details"] {
        .toolbar,
        .page__background {
            background: #fff;
        }
    }
</style>
