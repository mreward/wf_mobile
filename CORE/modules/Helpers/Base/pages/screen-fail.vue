<template id="fail-page">
    <v-ons-page>
        <div class="page__content page__layout">
            <v-ons-row class="fail-page">
                <div class="fail-page__card">
                    <div class="fail-page__icon">
                        <v-ons-icon
                            icon="error"
                        />
                    </div>

                    <div class="fail-page__heading">
                        {{ title }}!
                    </div>
                    <div class="fail-page__text">
                        {{ message }}
                    </div>

                    <button-base
                        type="main"
                        class="fail-page__button"
                        @click="callback"
                    >
                        {{ $t('m_helpers_retry') }}
                    </button-base>
                    <div class="fail-page__down">
                        <button-base
                            type="text"
                            @click="goToDashboard"
                        >
                            {{ $t('m_helpers_cancel') }}
                        </button-base>
                    </div>
                </div>
            </v-ons-row>
        </div>
    </v-ons-page>
</template>

<script>
    import MixinScreenFail from '_mixin_screen_fail'

    export default {
        name: 'screen-fail',
        mixins: [MixinScreenFail]
    }
</script>
