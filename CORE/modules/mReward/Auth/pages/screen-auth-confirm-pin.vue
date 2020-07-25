<template id="screen-auth-confirm-pin">
    <layout
        :title="$t('m_auth_pin_code')"
        layout="auth"
    >
        <v-ons-card class="layout-auth__card">
            <form ref="form">
                <v-ons-row
                    justify="center"
                    class="layout-auth__text-message"
                >
                    {{ title }}
                </v-ons-row>

                <v-ons-row class="margin-top--base">
                    <input-pin
                        ref="pin"
                        v-model="pin"
                        :length="lengthPin"
                        class="layout-auth__input-pin layout-auth__input-pin--pass"
                    />
                </v-ons-row>

                <v-ons-row
                    class="margin-top--base"
                    justify="center"
                >
<!--                    <button-recover-pin-->
<!--                        class="layout-auth__button-text"-->
<!--                    />-->
                </v-ons-row>
                <use-touch-id
                    :support.sync="touchIdSupported"
                    @login="loadUser"
                />
            </form>
        </v-ons-card>
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
