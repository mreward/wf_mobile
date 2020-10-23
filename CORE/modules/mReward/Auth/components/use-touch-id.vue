<template>
    <v-ons-row
        class="touch-id"
        v-if="support"
        justify="center"
        @click="useTouchId"
    >
        <img
            v-if="$ons.platform.isIPhoneX()"
            :src="imgFace"
        >
        <img
            v-else
            :src="imgTouch"
        >
    </v-ons-row>
</template>

<script>
    import constants from '_vuex_constants';
    import { mapActions, mapGetters } from 'vuex';
    import TouchId from '_PLUGINS/common/TouchId';
    import imgTouch from '_img_touch_id';
    import imgFace from '_img_face_id';

    export default {
        name: 'use-touch-id',
        props: {
            support: {
                type: Boolean,
                default: false,
            },
        },
        data: () => ({
            imgTouch,
            imgFace,
        }),
        computed: {
            ...mapGetters({
                userConfig: constants.MrewardUser.Getters.userConfig,
                selectedLanguage: constants.App.Getters.language,
            }),
        },
        async created() {
            if (this.userConfig.useFingerprint) {
                const $this = this;
                setTimeout(() => {
                    $this.useTouchId();
                }, 2000);
            }
        },
        methods: {
            ...mapActions({
                replacePage: constants.App.Actions.replacePage,
                pushPage: constants.App.Actions.pushPage,
            }),
            async useTouchId() {
                try {
                    await TouchId.IsAvailable();
                    this.$emit('update:support', true);
                    await TouchId.VerifyFingerprint({
                        locale: this.selectedLanguage,
                    });
                    this.$emit('login');
                } catch (e) {
                    console.log('COMPONENT: screen-auth-confirm-pin - useTouchId fail init', e);
                }
            },
        },
    };
</script>
