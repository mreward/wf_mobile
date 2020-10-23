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
            v-if="history.pay_sum"
        >
            <div>{{ $t('m_history_paid_money') }}</div>
            <div>{{ history.pay_sum }}</div>
        </div>

        <div
            class="history__info-row"
            v-if="history.bonus_redeemed"
        >
            <div>{{ $t('m_history_debited_onuses') }}</div>
            <div>{{ history.bonus_redeemed }}</div>
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
                {{$t('m_shop_order_details_info')}}
            </div>
        </div>

        <v-btn
                v-if="history.opportunity_to_refund"
                class="v-btn--secondary"
                color="secondary"
                depressed
                block
                @click.native="onCancelOrder"
        >
            {{ $t('m_shop_cancel_order') }}
        </v-btn>
    </layout>
</template>

<script>
    import { mapActions } from 'vuex'
    import constants from '_vuex_constants'
    import IllustrationPin from '_img_pin_illustration'
    import ProductItem from '_history_product_item'
    import Illustration from '../img/cancel-order-illustration.svg';

    export default {
        name: 'screen-order-details',
        components: {
            ProductItem
        },
        methods: {
            ...mapActions({
                popPage: constants.App.Actions.popPage,
                pushPage: constants.App.Actions.pushPage,
                checkReturn: constants.MrewardShop.Actions.checkReturn,
                onlineRefund: constants.MrewardShop.Actions.onlineRefund,
                getOrders: constants.MrewardShop.Actions.getOrders,
                onlineStoreStatus: constants.MrewardShop.Actions.onlineStoreStatus,
            }),
            onCancelOrder() {
                this.$Alert.Confirm({
                    img: Illustration,
                    title: this.$t('m_shop_cancel_order_confirm'),
                    nextName: this.$t('m_shop_yes'),
                    cancelName: this.$t('m_shop_no'),
                    nextEvent: async () => {
                        if (this.history.payment_type === 'cash') {
                            await this.checkReturn(this.history)
                        } else {
                            await this.onlineRefund(this.history)
                        }

                        await this.onlineStoreStatus({
                            ...this.history,
                            status: 3
                        })

                        await this.getOrders()

                        this.popPage()
                    }
                })
            }
        }
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
