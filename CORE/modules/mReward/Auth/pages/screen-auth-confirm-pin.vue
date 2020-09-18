<template id="screen-auth-confirm-pin">
    <layout
        :title="$t('m_auth_entry')"
        layout="auth"
        page="auth-pin"
    >
        <form
                ref="form"
                class="layout-auth__form"
        >
            <v-ons-row
                    v-if="touchIdSupported"
                    justify="center"
                    class="layout-auth__text-message"
            >
                {{ $t('m_auth_use_pin_or_face_id', '', {type: biometric}) }}
            </v-ons-row>
            <v-ons-row
                    v-else
                    justify="center"
                    class="layout-auth__text-message"
            >
                {{ $t('m_auth_use_pin') }}
            </v-ons-row>

            <v-ons-row class="layout-auth__input-pin">
                <input-pin
                        ref="pin"
                        v-model="pin"
                        :length="lengthPin"
                        class="input--pin"
                />
            </v-ons-row>

            <v-btn
                    v-if="touchIdSupported"
                    :disabled="loaderVisible"
                    class="v-btn--secondary v-btn--auth-finger"
                    color="secondary"
                    depressed
                    block
                    @click.native="useTouchId"
            >
                <i v-if="$ons.platform.isIPhoneX()" class="icon-face-id"/>
                <i v-else class="icon-touch-id" />
                {{ $t('m_auth_login_with_face_id', '', {type: biometric}) }}
            </v-btn>

            <v-btn
                    text
                    depressed
                    block
                    class="margin-top--small-base v-btn--text"
                    :disabled="loaderVisible"
                    @click.native="goToRecoveryPassword"
            >
                {{ $t('m_auth_forgot_pin') }}
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
        </form>
    </layout>
</template>

<script>
    import UseTouchId from '_use_touch_id';
    // import ButtonRecoverPin from '_button_recover_pin';
    import MixinScreenAuthConfirmPin from '_mixin_screen_auth_confirm_pin';

    export default {
        name: 'screen-auth-confirm-pin',
        components: {
            UseTouchId,
            // ButtonRecoverPin,
        },
        mixins: [
            MixinScreenAuthConfirmPin,
        ],
    };
</script>

<style lang="scss">
    .page[page="auth-pin"] {
        ons-row.layout-auth__text-message {
            padding-top: 32px;
            font-size: 13px;
            line-height: 18px;
            text-align: center;
            letter-spacing: -0.078px;
            color: rgba(60, 60, 67, 0.6);

        }

        .v-btn--auth-finger {
            position: unset !important;
            width: auto;
            display: block;
            min-width: unset!important;
            margin: auto;
            padding: 0px 40px;

            margin-top: 32px;
            i {
                font-size: 20px;
                padding-right: 14px;
            }
        }
    }
</style>
