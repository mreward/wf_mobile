<template>
    <layout
        layout="auth"
        :title="$t('m_auth_pin_code')"
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
                {{ $t('m_auth_enter_pin_code') }}
            </v-ons-row>

            <v-ons-row class="layout-auth__input-pin">
                <input-pin
                    ref="pin"
                    v-model="pin"
                    :length="lengthPin"
                    class="input--pin"
                />
            </v-ons-row>
            <v-ons-row
                justify="center"
                class="layout-auth__text-message margin-top--small-base"
            >
                {{ $t('m_auth_repiet_pin_code') }}
            </v-ons-row>

            <v-ons-row class="layout-auth__input-pin">
                <input-pin
                    ref="confirm"
                    v-model="confirm"
                    :length="lengthPin"
                    class="input--pin"
                />
            </v-ons-row>

            <v-btn
                text
                depressed
                block
                class="margin-top--small-base v-btn--text"
                :disabled="loaderVisible"
                @click.native="goToDashboard"
            >
                {{ $t('m_auth_pin_dont_use_pin_code') }}
            </v-btn>
        </form>
    </layout>
</template>

<script>
    import MixinScreenConfirmPin from '_mixin_screen_confirm_pin'

    export default {
        name: 'screen-confirm-pin',
        mixins: [MixinScreenConfirmPin]
    }
</script>
