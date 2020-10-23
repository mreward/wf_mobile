<template>
    <layout
        layout="auth"
        :title="$t('m_auth_sms_code')"
        button-left="back"
        icon-left="arrow"
    >
        <form
            ref="form"
            class="layout-auth__form"
        >
            <v-ons-row
                justify="center"
                class="layout-auth__text-message"
            >
                {{ $t('m_auth_enter_sms_code', '', {mobileNumber}) }}
            </v-ons-row>

            <v-ons-row class="layout-auth__input-pin">
                <input-pin
                    ref="smsCodeInput"
                    v-model="smsCode"
                    :length="lengthPin"
                    class="input--pin"
                />
            </v-ons-row>
        </form>
    </layout>
</template>

<script>
    import MixinScreenConfirmOtp from '_mixin_screen_confirm_otp'

    export default {
        name: 'screen-confirm-otp',
        mixins: [MixinScreenConfirmOtp]
    }
</script>
