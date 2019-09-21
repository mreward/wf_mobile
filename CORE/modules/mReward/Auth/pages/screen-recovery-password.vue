<template>
    <layout
        layout="auth"
        :title="$t(titleTranslationKey)"
        button-left="back"
        icon-left="arrow"
    >
        <div class="layout-auth__form">
            <template v-if="showMobileNumberInput">
                <mobile-number
                    :country="selectedCountry"
                    v-model="mobile"
                    :error-messages="errorMessages['phone'] || errorMessages['mobile']"
                    @hideError="hidePhoneInputError"
                />
            </template>
            <template v-else>
                <div class="text--muted">
                    {{ $t('m_auth_think_up_new_password') }}
                </div>
            </template>

            <v-text-field
                :label="$t('m_auth_password', '', {required: ''})"
                v-model="password"
                required
                :type="showPass ? 'text' : 'password'"
                :append-icon="showPass ? 'icon-eye-closed' : 'icon-eye-opened'"
                :persistent-hint="true"
                :error-messages="errorMessages['password']"
                :hint="$t('m_auth_enter_password_must_contain_minimum','', {count: settings.passwordMinimumLength})"
                @click:append="showPass = !showPass"
                @focus="errorMessages['password'] = ''"
            />

            <v-btn
                depressed
                class="margin-top--base"
                color="primary"
                type="main"
                block
                :disabled="loaderVisible"
                @click.native.prevent="sendRecoveryPassword"
            >
                {{ $t('m_auth_next') }}
            </v-btn>
        </div>
    </layout>
</template>

<script>
    import MixinScreenRecoveryPassword from '_mixin_screen_recovery_password'
    import MixinChooseCounty from '_mixin_choose_country'

    export default {
        name: 'screen-recovery-password',
        mixins: [
            MixinScreenRecoveryPassword,
            MixinChooseCounty
        ]
    }
</script>
