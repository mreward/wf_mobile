<template>
    <v-ons-page
        v-status-bar-fill
        shown
        class="layout-raffle-details"
    >
        <div class="page__content page__layout page__layout--cover">
            <back-button
                class="back-button"
                icon="back"
            />
            <div class="page__background--cover">
                <div
                    ref="toolbarContent"
                    class="toolbar-large"
                >
                    <div class="toolbar-large__header">
                        <i class="icon-k-symbol" />
                        <div class="text--top">
                            {{ raffleData.count }}
                        </div>
                        <div class="text--bottom">
                            {{ $t('m_raffles_my_dibs') }}
                        </div>
                    </div>
                    <div class="toolbar-large__footer">
                        {{ $t('m_raffles_for_next_dib') }}
                        <span class="text--ellipse">
                            {{ raffleData.dibsForNext }} {{ raffleData.currency }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="page-content" :style="`padding-top: 200px`">
                <slot/>
            </div>
        </div>
    </v-ons-page>
</template>

<script>
    // TODO move this layout to mreward/raffle module
    import BackButton from '_CORE/components/common/toolbar/back-button.vue'

    export default {
        name: 'layout-raffle-details',
        components: {
            BackButton
        },
        props: {
            raffleData: {
                type: Object,
                default: () => ({})
            }
        }
    }
</script>

