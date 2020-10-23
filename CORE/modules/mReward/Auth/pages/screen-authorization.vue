<template>
    <layout
        page="auth"
        layout="auth"
        :title="$t('m_auth_entry')"
        :button-right="goToRegistration"
        :label-right="$t('m_auth_registration')"
    >
        <div class="layout-auth__form">
            <mobile-number
                :country="selectedCountry"
                v-model="mobile"
                :error-messages="errorMessages['phone'] || errorMessages['mobile']"
                @hideError="hidePhoneInputError"
            />

            <v-text-field
                :append-icon="showPass ? 'icon-eye-opened' : 'icon-eye-closed'"
                v-model="password"
                :label="$t('m_auth_password', '', {required: ''})"
                required
                :type="showPass ? 'text' : 'password'"
                :persistent-hint="true"
                :error-messages="errorMessages['password']"
                :hint="$t('m_auth_must_contain_minimum','', {count: settings.passwordMinimumLength})"
                @click:append="showPass = !showPass"
                @focus="errorMessages['password'] = ''"
            />

            <v-btn
                block
                depressed
                color="primary"
                type="main"
                :disabled="loaderVisible"
                class="margin-top--base"
                @click.native.prevent="sendAuthorization"
            >
                {{ $t('m_auth_entry_verb') }}
            </v-btn>

            <v-btn
                text
                depressed
                block
                class="margin-top--small-base v-btn--text"
                :disabled="loaderVisible"
                @click.native="goToRecoveryPassword"
            >
                {{ $t('m_auth_forgot_password') }}
            </v-btn>

            <v-btn
                :disabled="loaderVisible"
                class="v-btn--secondary"
                color="secondary"
                depressed
                block
                @click.native="goToAboutApp"
            >
                {{ $t('m_auth_about_application') }}
            </v-btn>
        </div>
    </layout>
</template>

<script>
    import MixinScreenAuthorization from '_mixin_screen_authorization'
    import MixinChooseCounty from '_mixin_choose_country'

    export default {
        name: 'screen-authorization',
        mixins: [
            MixinScreenAuthorization,
            MixinChooseCounty
        ]
    }
</script>
