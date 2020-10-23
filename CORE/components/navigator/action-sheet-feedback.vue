<template>
    <div>
        <vue-inspector :is-visible="devMode" />

        <v-ons-action-sheet
            :visible.sync="isVisible"
            cancelable
            :modifier="modifierMaterial"
            :title="$t('m_feedback')"
            class="action-sheet-custome"
        >
            <v-ons-action-sheet-button
                v-show="isVisibleDebugOptions"
                class="row-dev-mod-switch"
                :modifier="modifierMaterial"
            >
                Developer mod
                <v-ons-switch
                    v-model="devMode"
                />
            </v-ons-action-sheet-button>

            <v-ons-action-sheet-button
                :modifier="modifierMaterial"
                @click="sendMessage"
            >
                <v-ons-icon
                    v-show="modifierMaterial"
                    icon="mail"
                />
                {{ $t('m_send_message') }}
            </v-ons-action-sheet-button>

            <v-ons-action-sheet-button
                v-for="action in additionalActions"
                :key="action.event"
                :modifier="modifierMaterial"
                @click="onAdditionalAction(action.event)"
            >
                <v-ons-icon
                    v-show="modifierMaterial && action.icon"
                    :icon="action.icon"
                    :class="action.class"
                />
                {{ $t(action.label) }}
            </v-ons-action-sheet-button>

            <v-ons-action-sheet-button
                v-show="showSendLogButton"
                :modifier="modifierMaterial"
                @click="reportBug"
            >
                <v-ons-icon
                    v-show="modifierMaterial"
                    icon="error-circle"
                />
                {{ $t('m_report_bug', '', 'Сообщить об ошибке') }}
            </v-ons-action-sheet-button>

            <v-ons-action-sheet-button
                v-hold="{callback: openDebugOptions, duration: 5000}"
                :modifier="modifierMaterial"
                @click="_hideMenu"
            >
                <v-ons-icon
                    v-show="modifierMaterial"
                    icon="close-circle"
                />
                {{ $t('m_cancel') }}
            </v-ons-action-sheet-button>
        </v-ons-action-sheet>
    </div>
</template>

<script>
    import VueInspector from '_vue_inspector'

    // TODO: render from data array

    export default {
        name: 'action-sheet-feedback',
        components: {
            VueInspector
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            supportMail: {
                type: Object,
                default() {
                    return {
                        email: '',
                        subject: '',
                        body: ''
                    }
                }
            },
            timeWatchShake: {
                type: Number,
                default: 50
            },

            additionalActions: {
                type: Array,
                default: () => ([])
            }
        },
        data() {
            return {
                isVisibleDebugOptions: false,
                devMode: false,
                isVisible: this.visible,
                showSendLogButton: true
            }
        },
        computed: {
            modifierMaterial() {
                if (window.device && device.platform.toLowerCase() === 'android') {
                    return 'material'
                }
                return ''
            },
            templateMessage() {
                const { email, subject, body } = this.supportMail
                return `mailto:${email}?subject=${subject}&amp;body=${body}`
            }
        },
        watch: {
            isVisible(val) {
                this.$emit('update:visible', val)
                if (!val) {
                    this.initFormSendLog()
                }
            },
            visible: {
                handler(val) {
                    this.isVisible = val
                },
                deep: true
            }
        },

        created() {
            this.$bus.$on('sendLog', this.reportBug)
            this.$bus.$on('showErrorDialog', this.reportBug)
            this.$bus.$on('initFormSendLog', this.initFormSendLog)
            this.$bus.$on('showFormSendLog', this.showFormSendLog)

            document.addEventListener('pause', this.pauseApp, false)
            document.addEventListener('resume', this.initFormSendLog, false)

            this.initFormSendLog()
        },
        destroyed() {
            this.$bus.$off('sendLog', this.reportBug)
            this.$bus.$off('showErrorDialog', this.reportBug)
            this.$bus.$off('initFormSendLog', this.initFormSendLog)
            this.$bus.$off('showFormSendLog', this.showFormSendLog)

            document.removeEventListener('pause', this.pauseApp)
            document.removeEventListener('resume', this.initFormSendLog)
        },
        methods: {
            pauseApp() {
                if (window.shake) {
                    shake.stopWatch()
                }
            },

            initFormSendLog() {
                if (window.shake) {
                    shake.startWatch(this.showFormSendLog, this.timeWatchShake, (e) => {
                        console.error(e)
                    })
                }
            },

            showFormSendLog() {
                const ignoreShake = document.getElementsByTagName('html')[0].hasAttribute('touchid-show')
                if (ignoreShake) {
                    return
                }

                if (window.shake) {
                    shake.stopWatch()
                }

                const isOffline = 'onLine' in navigator && !navigator.onLine
                this.showSendLogButton = !isOffline

                this._showMenu()
            },

            openDebugOptions() {
                if (_DEVMOD === 'true') {
                    this.isVisibleDebugOptions = true
                }
            },
            sendMessage() {
                this._hideMenu()
                window.open(this.templateMessage, '_system')
            },
            reportBug(errorAlertType) {
                this._hideMenu()
                this.$emit('reportBugClick', errorAlertType)
            },
            _hideMenu() {
                this.isVisible = false
            },
            _showMenu() {
                this.isVisible = true
            },

            onAdditionalAction(event) {
                this.$emit('additionalAction', event)
                this._hideMenu()
            }
        }
    }
</script>

<style>
    .action-sheet-custome {
        z-index: 30001 !important;
    }
    .action-sheet-label {
        text-align: center;
        padding-left: 20px;
        font-size: 1rem;
    }
</style>
