<template id="screen-sms-confirm">
    <layout
        layout="auth"
        :title="$t('m_helpers_sms_code')"
        button-left="back"
    >
        <v-ons-card class="layout-auth__card">
            <form
                ref="form"
                @submit.prevent="confirmPhone"
            >
                <v-ons-row
                    justify="center"
                    class="layout-auth__text-message"
                >
                    {{ $t('m_auth_enter_verification_code') }}
                    <account
                        :account="profile.mobile"
                        type="mobile"
                    />
                </v-ons-row>
                <v-ons-row class="layout-auth__input-pin input-pin margin-top--base">
                    <input-pin
                        data-test="sms-confirm"
                        ref="otp"
                        v-model="otp"
                        :length="lengthOtp"
                        class="layout-auth__input-pin"
                    />
                </v-ons-row>

                <v-ons-row
                    class="margin-top--base"
                    justify="center"
                >
                    <button-base
                        v-show="codeResentButton"
                        type="text"
                        @click="resendCode"
                    >
                        {{ $t('m_auth_didnt_receive_code') }}
                    </button-base>

                    <button-base
                        v-show="codeResent"
                        type="text"
                    >
                        {{ $t('m_auth_please_wait', '', { timer }) }}
                    </button-base>
                </v-ons-row>
            </form>
        </v-ons-card>
    </layout>
</template>
<script>
    import MixinScreenSMSConfirmHelper from '_mixin_screen_sms_confirm_helper'
    import MixinScreenSMSConfirm from '_mixin_screen_sms_confirm'
    import MixinScreenSMSConfirmResendCode from '_mixin_screen_sms_confirm_resend_code'

    export default {
        name: 'screen-sms-confirm',
        mixins: [
            MixinScreenSMSConfirm,
            MixinScreenSMSConfirmHelper,
            MixinScreenSMSConfirmResendCode
        ]
    }
</script>
