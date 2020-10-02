<template>
    <v-ons-page
        page="cake-exclusive"
        shown
    >
        <div class="page__content">
            <div class="cake-exclusive">
                <p class="text--muted">{{ $t('m_cake_designer_exclusive_text') }}</p>
                <div class="designer__btn-submit">
                    <v-btn
                        block
                        depressed
                        color="primary"
                        type="main"
                        @click="goToFeedback"
                    >
                        {{ $t('m_cake_designer_send_feedback') }}
                    </v-btn>
                </div>
            </div>
        </div>
    </v-ons-page>
</template>

<script>
    import { mapActions } from 'vuex'
    import constants from '_vuex_constants'
    import ScreenDesignerFeedback from '_screen_designer_feedback'

    export default {
        name: 'screen-exclusive',
        methods: {
            ...mapActions({
                pushPage: constants.App.Actions.pushPage
            }),
            goToFeedback() {
                this.pushPage({
                    extends: ScreenDesignerFeedback
                })
            }
        }
    }
</script>

<style lang="scss">
    .page[page="cake-exclusive"] {
        .page__content {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
        .cake-exclusive {
            font-size: 13px;
            line-height: 18px;
            text-align: center;
            letter-spacing: -0.078px;
            color: rgba(60, 60, 67, 0.6);
        }
    }
</style>
