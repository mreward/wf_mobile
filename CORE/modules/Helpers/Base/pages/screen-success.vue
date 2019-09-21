<template id="success-page">
    <v-ons-page>
        <div class="page__content page__layout">
            <v-ons-row class="success-page">
                <div class="success-page__card">
                    <div class="success-page__icon">
                        <ons-icon
                            :icon="icon"
                        />
                    </div>

                    <div class="success-page__heading">
                        {{ title }}
                    </div>
                    <div
                        v-if="text"
                        class="success-page__text"
                    >
                        {{ text }}
                    </div>

                    <button-base
                        v-if="showGoDashboardButton"
                        type="main"
                        class="success-page__button"
                        data-test="success-next-btn"
                        @click="goToDashboard"
                    >
                        {{ $t(buttonTitle) }}
                    </button-base>
                    <button-base
                        v-else
                        type="main"
                        class="success-page__button"
                        data-test="success-next-btn"
                        @click="callback"
                    >
                        {{ $t(buttonTitle) }}
                    </button-base>
                    <button-base
                        v-if="_showAddToFavoriteButton"
                        type="add"
                        class="width--full"
                        @click="addToFavorites"
                    >
                        <v-ons-icon icon="add" /> {{ $t('m_helpers_success_add_to_favorites') }}
                    </button-base>
                    <button-base
                        v-if="showAddContactButton"
                        type="add"
                        class="width--full"
                        @click="goToPage('add-contact', { formData: { phone } })"
                    >
                        <v-ons-icon icon="add" /> {{ $t('m_helpers_success_add_to_contact') }}
                    </button-base>
                </div>
            </v-ons-row>
        </div>
    </v-ons-page>
</template>

<script>
    import MixinScreenSuccess from '_mixin_screen_success'

    export default {
        name: 'screen-success',
        mixins: [MixinScreenSuccess]
    }
</script>
