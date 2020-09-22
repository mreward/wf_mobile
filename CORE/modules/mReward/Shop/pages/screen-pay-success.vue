<template>
    <layout
            page="pay-status"
    >
        <div class="shop-status">
            <i class="icon-sucess"></i>
            <div class="shop-status__title">
                {{$t('m_shop_status_pay_title')}}
            </div>
            <div class="shop-status__info">
                {{$t('m_shop_status_pay_info')}}
            </div>
        </div>
        <div class="checkout-pay__btn-pay">
            <v-btn
                    block
                    depressed
                    color="primary"
                    type="main"
                    @click="goToOrder"
            >
                {{ $t('m_done') }}
            </v-btn>
        </div>
    </layout>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import constants from '_vuex_constants'


    export default {
        name: 'screen-pay-success',
        components: {
        },
        data () {
            return {
            }
        },
        computed: {
            ...mapGetters({
            }),
        },

        async created () {
        },
        methods: {
            ...mapActions({
                popPage: constants.App.Actions.popPage,
                pushPage: constants.App.Actions.pushPage,
                popToPage: constants.App.Actions.popToPage,
            }),
            async goToOrder () {
                this.popToPage('screen-dashboard')
            },
        },
    }
</script>

<style lang="scss">
    .page[page="pay-status"] {
        .page__content {
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: space-between;
        }

        .checkout-pay__btn-pay {
            margin-bottom: 32px;
        }
    }

    .shop-status {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        flex: 1;

        &__title {
            font-style: normal;
            font-weight: 600;
            font-size: 15px;
            line-height: 20px;
            text-align: center;
            letter-spacing: -0.24px;
            color: #000000;
        }
        &__info {
            font-weight: normal;
            font-size: 13px;
            line-height: 18px;
            text-align: center;
            letter-spacing: -0.078px;
            color: #000000;
        }

        i {
            color: #2DB055;
            font-size: 46px;
        }

        &--error {
            i {
                color: #2DB055;
            }
        }
    }
</style>
