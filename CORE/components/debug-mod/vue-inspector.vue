<template>
    <div v-if="isVisible">
        <device-info :is-visible.sync="spdOpen" />

        <debug-console :is-visible.sync="isVisibleConsole" />

        <v-ons-speed-dial
            v-show="isSpdVisible"
            position="bottom right"
            direction="up"
            :open.sync="spdOpen"
        >
            <v-ons-fab>
                <v-ons-icon
                    v-show="!spdOpen"
                    icon="ion-settings"
                />
                <v-ons-icon
                    v-show="spdOpen"
                    icon="ion-close"
                />
            </v-ons-fab>

            <v-ons-speed-dial-item @click="openConsole">
                <v-ons-icon icon="ion-clipboard" />
            </v-ons-speed-dial-item>

            <!--  <v-ons-speed-dial-item @click="">
                  <v-ons-icon icon="ion-navicon-round"></v-ons-icon>
              </v-ons-speed-dial-item>-->

            <v-ons-speed-dial-item @click="refreshApp">
                <v-ons-icon icon="ion-refresh" />
            </v-ons-speed-dial-item>
        </v-ons-speed-dial>
    </div>
</template>

<script>
    import DeviceInfo from './device-info.vue'
    import DebugConsole from './debug-console.vue'
    // пока как черновик НИКОМУ СЮДА НЕ ЛАЗИТЬ )))
    export default {
        name: 'vue-inspector',
        components: {
            'device-info': DeviceInfo,
            'debug-console': DebugConsole
        },
        props: {
            isVisible: {
                type: Boolean,
                required: false,
                default: true
            }
        },
        data() {
            return {
                spdOpen: false,
                isVisibleConsole: false,
                isSpdVisible: true
            }
        },
        created() {
            this.$bus.$on('on-open-debug-console', this.onOpenDebugConsole)
        },
        beforeDestroy() {
            this.$bus.$off('on-open-debug-console', this.onOpenDebugConsole)
        },
        methods: {
            onOpenDebugConsole() {
                this.isVisibleConsole = false
                this.isSpdVisible = true
                this.spdOpen = false
            },
            refreshApp() {
                window.location.reload(true)
            },

            openConsole() {
                this.isVisibleConsole = true
                this.spdOpen = false
                this.isSpdVisible = false
            }
        }
    }
</script>

<style lang="scss"
       scoped>
    :not(ons-toolbar-button):not(ons-action-sheet-button):not(.segment__button) > .ons-icon--ion {
        line-height: normal;
        vertical-align: unset;
    }
    .fab {
        background: #000000;
    }
</style>
