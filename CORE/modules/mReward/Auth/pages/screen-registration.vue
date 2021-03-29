<template>
    <layout
        page="registration"
        layout="auth"
        :title="$t('m_auth_registration')"
        :button-right="goToAuthorization"
        :label-right="$t('m_auth_entry')"
    >
        <div class="layout-auth__form">
            <mobile-number
                :country="selectedCountry"
                v-model="mobile"
                :error-messages="errorMessages['phone'] || errorMessages['mobile']"
            />

            <v-text-field
                v-model="user.password"
                :label="$t('m_auth_password', '', {required: '*'})"
                :hint="$t('m_auth_must_contain_minimum','', {count: settings.passwordMinimumLength})"
                :error-messages="errorMessages['password']"
                type="password"
                @focus="errorMessages['password'] = ''"
            />

            <div>
                <v-text-field
                    v-model="cityParams.name"
                    readonly
                    :label="$t('m_auth_city', '', {required: '*'})"
                    :error-messages="errorMessages['id_city']"
                    type="text"
                    @focus="goToSelectCity"
                />
            </div>

            <template v-if="profileFields.length">
                <dynamic-input
                    v-for="(field, key) in inputArray"
                    v-model="inputArray[field.key]"
                    :key="key"
                    :field="field"
                    :error-messages="errorMessages[field.key]"
                    @hideError="() => errorMessages[field.key] = ''"
                />
            </template>

            <v-btn
                class="margin-top--base"
                depressed
                color="primary"
                type="main"
                block
                :disabled="loaderVisible"
                @click.native.prevent="sendRegistration"
            >
                {{ $t('m_auth_next') }}
            </v-btn>

            <div class="registration-terms">
                {{ $t('m_auth_push_next') }}
                <span @click="openProtocol(settings.termsUrl)">
                    {{ $t('m_auth_terms_of_conditions') }}
                </span>
            </div>
        </div>
    </layout>
</template>

<script>
    import MixinScreenRegistration from '_mixin_screen_registration'
    import MixinChooseCounty from '_mixin_choose_country'
    import MixinChooseCity from '_mixin_choose_city'
    import ValidationHelpers from '_plugins_validation_helpers'
    import MixinOpenProtocol from '_CORE/mixins/common/open-protocol'

    export default {
        name: 'screen-registration',
        mixins: [
            MixinScreenRegistration,
            MixinChooseCounty,
            MixinChooseCity,
            ValidationHelpers,
            MixinOpenProtocol
        ]
    }
</script>
