<template>
    <v-app light>
        <v-ons-navigator
            tabindex="0"
            :page-stack="pageStack"
            :options="navigatorAnimation"
            :swipeable="swipeable"
            @postpush="postPush"
            @prepush="prePush"
            @postpop="postPop"
            @prepop="prePop"
        >
            <component
                :is="page"
                v-for="page in pageStack"
                :key="page.name"
            />
        </v-ons-navigator>

        <action-sheet-feedback
            ref="actionSheetFeedback"
            :visible.sync="visibleActionSheetFeedback"
            :support-mail="_supportMail"
            :additional-actions="additionalActions"

            @reportBugClick="_onReportBug"
            @additionalAction="onAdditionalAction"
        />

        <alert-confirm-helper />
        <user-guide />
    </v-app>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import constants from '_vuex_constants'

    import AlertConfirmHelper from '_alert_confirm_helper'
    import MixinNavigator from '_mixins_navigator'
    import ActionSheetFeedback from '_action_sheet_feedback'

    import _isFunction from 'lodash/isFunction'
    import SplashPng from '_splashPng'

    // TODO: использовать keep-alive
    export default {
        name: 'navigator',
        components: {
            AlertConfirmHelper,
            ActionSheetFeedback
        },
        mixins: MixinNavigator,
        data: () => ({
            visibleActionSheetFeedback: false,
            swipeable: true,

            // build image to folder www
            SplashPng
        }),
        computed: {
            ...mapGetters({
                settings: constants.App.Getters.settings,
                pageStack: constants.App.Getters.navigator,
                navigatorAnimation: constants.App.Getters.navigatorAnimation,
                language: constants.App.Getters.language
            }),

            _supportMail() {
                if (this.supportMail) {
                    return this.supportMail
                }

                return {
                    email: '',
                    subject: '',
                    body: ''
                }
            },

            additionalActions() {
                return this.feedbackActions || []
            }
        },
        watch: {
            settings(data) {
                this._onUpdateSettings(data)
            },
            language(lang) {
                this.$polyglot.setLang({
                    lang
                })
                this._onUpdateSettings({ ...this.settings, lang })
                this.updateCountryList()
            }
        },
        async created() {
            console.log(`${this.$options.name} :created`)

            try {
                this._onUpdateSettings(this.settings)

                this.updateCountryList()

                if (_isFunction(this.onStartPage)) {
                    await this.onStartPage()
                }

                if (this.language) {
                    this.$polyglot.setLang({
                        lang: this.language
                    })
                }

                this.startApplication()
            } catch (e) {
                console.log(e)
            }
        },
        async mounted() {
            setTimeout(() => {
                this.$SplashScreen.Hide()
            }, this.settings.timeoutSplashScreen || 0)
        },
        methods: {
            ...mapActions({
                pushPage: constants.App.Actions.pushPage,
                startApplication: constants.App.Actions.startApplication,
                sendFeedbackLog: constants.App.Actions.sendFeedbackLog,
                updateCountryList: constants.PhoneMasks.Actions.updateCountryList
            }),

            _onUpdateSettings(data) {
                if (_isFunction(this.onUpdateSettings)) {
                    this.onUpdateSettings(data)
                }
            },

            async sendFeedback() {
                try {
                    await this.sendFeedbackLog()
                    this.$refs.actionSheetFeedback.initFormSendLog()
                } catch (error) {
                    console.log('Navigator:sendFeedback error:', error)
                    this.$Alert.Error(error)
                }
            },

            _onReportBug(errorAlertType) {
                console.log('Navigator:onReportBug')
                if (_isFunction(this.onReportBug)) {
                    this.onReportBug(errorAlertType)
                } else {
                    this.sendFeedback()
                }
            },

            onAdditionalAction(actionEvent) {
                const calledAction = this.feedbackActions.find(action => action.event === actionEvent)

                if (_isFunction(calledAction.handler)) {
                    calledAction.handler()
                }
            }
        }
    }

    // TODO: https://cordova.apache.org/docs/en/latest/cordova/events/events.html
</script>
