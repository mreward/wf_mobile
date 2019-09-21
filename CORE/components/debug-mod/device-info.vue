<template>
    <div
        v-show="isVisible"
        class="content-debug-info"
    >
        <v-ons-row>
            <v-ons-col class="header-info">
                DEVICE
            </v-ons-col>
        </v-ons-row>

        <v-ons-row>
            <v-ons-col width="90px">
                model:
            </v-ons-col>
            <v-ons-col>
                {{ deviceInfo.model }}
            </v-ons-col>
        </v-ons-row>

        <v-ons-row>
            <v-ons-col width="90px">
                platform:
            </v-ons-col>
            <v-ons-col>
                {{ deviceInfo.platform }} {{ deviceInfo.version }}
            </v-ons-col>
        </v-ons-row>

        <v-ons-row>
            <v-ons-col width="90px">
                cordova:
            </v-ons-col>
            <v-ons-col>
                {{ deviceInfo.cordova }}
            </v-ons-col>
        </v-ons-row>

        <v-ons-row>
            <v-ons-col class="header-info">
                INFO
            </v-ons-col>
        </v-ons-row>
        <v-ons-row>
            <v-ons-col width="90px">
                nameApp:
            </v-ons-col>
            <v-ons-col>
                {{ settings.nameApp }}
            </v-ons-col>
        </v-ons-row>
        <v-ons-row>
            <v-ons-col width="90px">
                bundleID:
            </v-ons-col>
            <v-ons-col>
                {{ settings.bundleID }}
            </v-ons-col>
        </v-ons-row>
        <v-ons-row>
            <v-ons-col width="90px">
                version:
            </v-ons-col>
            <v-ons-col>
                {{ settings.version }}
            </v-ons-col>
        </v-ons-row>
        <v-ons-row>
            <v-ons-col width="90px">
                versionCode:
            </v-ons-col>
            <v-ons-col>
                {{ settings.versionCode }}
            </v-ons-col>
        </v-ons-row>

        <v-ons-row>
            <v-ons-col class="header-info">
                API
            </v-ons-col>
        </v-ons-row>
        <v-ons-row>
            <v-ons-col width="90px">
                hostname:
            </v-ons-col>
            <v-ons-col>
                {{ settings.API.hostname }}
            </v-ons-col>
        </v-ons-row>
        <v-ons-row>
            <v-ons-col width="90px">
                name:
            </v-ons-col>
            <v-ons-col>
                {{ settings.API.name }}
            </v-ons-col>
        </v-ons-row>
        <v-ons-row>
            <v-ons-col width="90px">
                version:
            </v-ons-col>
            <v-ons-col>
                {{ settings.API.version }}
            </v-ons-col>
        </v-ons-row>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import constants from '_vuex_constants'

    export default {
        name: 'device-info',
        props: {
            isVisible: {
                type: Boolean,
                required: false,
                default: true
            }
        },
        computed: {
            ...mapGetters({
                settings: constants.App.Getters.settings
            }),

            deviceInfo() {
                if (!window.device) {
                    return {
                        cordova: '6.5',
                        model: 'Google Chrome',
                        platform: 'browser',
                        version: '1.1'
                    }
                }
                return device
            }
        }
    }
</script>

<style lang="scss"
       scoped>
    .content-debug-info {
        z-index: 9990;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        position: absolute;
        background-color: rgba(0, 0, 0, 0.92);
        font-size: 0.8rem;
        color: #d4d4d4;
        text-align: left;
        padding: 20px;

        ons-row {
            border-bottom: 1px solid #212121;
            line-height: 1.6rem;
        }

        ons-col.header-info {
            font-weight: bold;
            font-size: 0.8rem;
        }

    }
</style>
