<template>
    <div>
        <div
                ref="toolbar"
                class="toolbar-upper"
        >
            <div class="toolbar-upper__header">
                <div class="left">
                    <div
                            ref="avatar"
                            class="toolbar-upper__img"
                            :style="{ backgroundImage: `url(${ userProfile.is_avatar_uploaded ? userProfile.avatar : '' })` }"
                            @click="goToProfile"
                    >
                        <v-ons-icon
                                v-if="!userProfile.is_avatar_uploaded"
                                icon="no-avatar"
                        />
                    </div>
                </div>
                <div class="center">
                      <span
                              ref="userName"
                              class="toolbar-upper__text"
                              v-html="userName"
                      >
                    </span>
                </div>
                <div class="right">
                    <!--                    <notifications-toolbar-icon />-->

                    <div
                            ref="amount"
                            class="row-amount"
                    >
                        <amount
                                :show-currency="false"
                                :amount="currentBalance.amount"
                                :mask="maskAmount"
                        />

                        <v-dialog
                                v-model="dialog"
                                content-class="accounts--dialog"
                        >
                            <template
                                    v-slot:activator="{ on }"
                                    v-show="currentBalance.currency"
                            >
                                <span
                                        ref="btnCurrency"
                                        class="btn-currency"
                                >
                                    <v-btn
                                            v-if="accounts.length > 1"
                                            small
                                            class="v-btn-rounded--small margin-left--small-base"
                                            v-on="on"
                                    >
                                        {{ currentBalance.currency }}
                                        <i class="icon-next-page right currency-right "/>
                                    </v-btn>
                                    <span
                                            v-else
                                            class="amount--currency"
                                    >{{ currentBalance.currency }}</span>
                                </span>
                            </template>
                            <v-list
                                    flat
                            >
                                <div class="dialog-header">
                                    <v-subheader>{{ $t('m_dashboard_wallets') }}</v-subheader>
                                    <v-btn
                                            icon
                                            fab
                                            @click="dialog = false"
                                    >
                                        <i class="icon icon-close"/>
                                    </v-btn>
                                </div>
                                <v-list-item-group>
                                    <v-list-item
                                            v-for="(item, i) in accounts"
                                            :key="i"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                <div class="amount-item-balance">
                                                    <span>{{ item.amount }}</span>
                                                </div>
                                            </v-list-item-title>
                                        </v-list-item-content>
                                        <v-list-item-action>
                                            <v-btn
                                                    small
                                                    class="v-btn-rounded--white--small margin-left--small-base"
                                                    :class="currentBalance.currency === item.currency ? 'selected': ''"
                                                    @click="setCurrentBalance(item)"
                                            >
                                                {{ item.currency }}
                                            </v-btn>
                                        </v-list-item-action>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </v-dialog>
                    </div>
                </div>
            </div>

            <div
                    ref="toolbarContent"
                    class="toolbar-upper__content"
            >
                <div class="toolbar-upper__qr">
                    <v-ons-icon icon="bird"/>
                    <qr-code
                            ref="qrBlock"
                            class="qr-block"
                            :value="cardNumber || ''"
                            level="H"
                            :size="200"
                    />
                </div>
                <div class="toolbar-upper__hint">
                    {{ $t('m_dashboard_dresent_qr_code_the_employee') }}
                </div>
            </div>
        </div>

        <div
                ref="mask"
                class="toolbar-upper--mask"
                @click="toggleMenu"
        />

        <div
                ref="btnClose"
                class="row-btn-lose"
        >
            <v-btn
                    type="fab"

                    class="mt-12 toolbar-btn--close"
                    color="primary"
                    @click="toggleMenu"
            >
                <i class="icon icon-close"/>
            </v-btn>
        </div>
    </div>
</template>

<script>
    import Amount from '_CORE/components/common/amount.vue'
    import { mapGetters, mapActions } from 'vuex'
    import { maskAmount } from '_masks'
    import QrcodeVue from 'qrcode.vue'
    import { TimelineLite, TweenLite, Power4 } from 'gsap'
    import NotificationsToolbarIcon from '_notifications_toolbar_icon'
    import constants from '_vuex_constants'
    import { isEmpty } from 'lodash'
    const ScreenProfile = () => import('_tab_profile')
    import IllustrationPin from '_img_pin_illustration'
    import MaskPhone from '_PLUGINS/common/MaskPhone'
    const ScreenConfirmPin = () => import('_screen_confirm_pin')

    const typeAnim = Power4.easeOut
    const timeAnim = 0.5

    export default {
        name: 'dashboard-profile',
        components: {
            Amount,
            'qr-code': QrcodeVue,
            NotificationsToolbarIcon,
        },
        data () {
            return {
                maskAmount,
                open: false,
                startHeight: 112,
                currentBalance: {
                    amount: '0',
                    currency: '',
                },
                dialog: false,
            }
        },
        computed: {
            ...mapGetters({
                cards: constants.MrewardCard.Getters.cards,
                userProfile: constants.MrewardProfile.Getters.userProfile,
                profile: constants.MrewardProfile.Getters.userProfile,
                userName: constants.MrewardProfile.Getters.userName,
                accounts: constants.MrewardAccount.Getters.accounts,
                balanceData: constants.MrewardAccount.Getters.balance,
                selectedAccount: constants.MrewardAccount.Getters.selectedAccount,
                userConfig: constants.MrewardUser.Getters.userConfig,
            }),
            cardNumber () {
                if (this.userProfile.card_pan) {
                    return this.userProfile.card_pan
                }

                if (this.cards.length) {
                    return this.cards[0].number
                }

                return this.userProfile.first_name || ''
            },
            balance () {
                if (this.balanceData.balance) {
                    const arrBalance = this.balanceData.balance.replace('.', ',').split(',')
                    return [
                        arrBalance[0],
                        `.${arrBalance[1] || '00'}`,
                    ]
                }

                return [
                    '00',
                    '.00',
                ]
            },
            position () {
                if (this.currentPageTab === 'screen-home-tab') {
                    if (window.StatusBar) {
                        window.StatusBar.styleLightContent();
                    }

                    return 'vissible';
                }

                if (window.StatusBar) {
                    window.StatusBar.styleDefault();
                }
                return 'top'
            },
            defaultHeight () {
                if (this.$ons.platform.isIPhoneX()) {
                    return 136
                }

                return 112
            },
            defaultMaxHeight () {
                if (this.$ons.platform.isIPhoneX()) {
                    return 494
                }

                return 470
            },
        },
        watch: {
            position () {
                this.onChangeBar()
            },
            async accounts (newValue) {
                if (newValue.length && !isEmpty(this.selectedAccount)) {
                    const newCurrentBalance = newValue.find((item) => {
                        return item.account === this.selectedAccount.account
                    })
                    await this.saveSelectedAccount(newCurrentBalance)
                    this.currentBalance = this.selectedAccount
                }
            },
        },
        async created () {
            try {
                await Promise.all([
                    this.getProfile({networkFirst: true}).catch((e) => console.log(e)),
                    this.getInfoCard({networkFirst: true}).catch((e) => console.log(e)),
                    this.getAccounts({networkFirst: true}).catch((e) => console.log(e)),
                ])


                if(!this.userConfig.pin && !this.userConfig.showPinAlert) {
                    this.$Alert.Success({
                        img: IllustrationPin,
                        title: this.$t('m_auth_security_pin_title'),
                        text: this.$t('m_auth_security_pin_text'),
                        nextName: this.$t('m_auth_security_pin_next'),
                        cancelName: this.$t('m_auth_security_pin_cancel'),
                        nextEvent: () => {
                            this.setUserConfig({
                                usePin: true,
                            })
                            this.goToCreatePin()
                        },
                        cancelEvent: () => {
                            this.setUserConfig({
                                showPinAlert: true,
                            })
                        }
                    })
                }
            } catch (e) {
                console.error(e)
            }

            const selectedAccount = await this.getSelectedAccount()
            if (this.accounts.length) {
                if (isEmpty(selectedAccount)) {
                    this.setCurrentBalance(this.accounts[0])
                } else {
                    this.currentBalance = selectedAccount
                }
            }

            this.$bus.$on('dashboard-open-toolbar', this.toggleMenu)


            await this.loadSelectCountry()
        },
        mounted () {
            this.startHeight = this.defaultHeight
            this._setHeight(this.startHeight)
        },
        destroyed () {
            this.$bus.$off('dashboard-open-toolbar', this.toggleMenu)
        },
        methods: {
            ...mapActions({
                getProfile: constants.MrewardProfile.Actions.getProfile,
                getInfoCard: constants.MrewardCard.Actions.getInfo,
                getAccounts: constants.MrewardAccount.Actions.getAccounts,
                saveSelectedAccount: constants.MrewardAccount.Actions.saveSelectedAccount,
                getSelectedAccount: constants.MrewardAccount.Actions.getSelectedAccount,
                getRaffles: constants.MrewardRaffles.Actions.getRaffles,
                pushPage: constants.App.Actions.pushPage,
                setUserConfig: constants.MrewardUser.Actions.setUserConfig,
                loadSelectCountry: constants.MrewardShop.Actions.loadSelectCountry,
            }),
            positionLeft () {
                const {amount} = this.$refs

                const center = window.innerWidth / 2
                const centerAmount = amount.offsetWidth / 2

                return center - amount.offsetLeft - centerAmount - 16
            },
            setCurrentBalance (item) {
                if (this.dialog) {
                    this.dialog = false
                }
                this.currentBalance = item
                this.saveSelectedAccount(this.currentBalance)
            },
            onChangeBar () {
                if (this.position === 'top') {
                    this.startHeight = 0
                    this._setHeight(this.startHeight)
                } else {
                    this.startHeight = this.defaultHeight;
                    this._setHeight(this.startHeight)
                }
            },
            goToProfile () {
                if (!this.open) {
                    this.pushPage({
                        extends: ScreenProfile,
                        // options: {
                        //     animation: 'fade'
                        // },
                        props: {}
                    });

                    // this.$bus.$emit('home:goToTab', 'screen-profile-tab')
                }
            },
            toggleMenu () {
                if (this.open) {
                    this.closeMenu()
                    this.open = false

                    /**
                     * update bonuses and dibs balances with timeout 10/60 seconds when
                     * qr-code was closed
                     * (because push notification comes with delay ~2 minutes)
                     */
                    setTimeout(() => {
                        this.updateBalances()
                    }, 10 * 1000)
                    setTimeout(() => {
                        this.updateBalances()
                    }, 60 * 1000)
                } else {
                    this.openMenu()
                    this.open = true
                }
            },
            async updateBalances () {
                try {
                    await Promise.all([
                        this.getAccounts({networkFirst: true}),
                        this.getRaffles({networkFirst: true}),
                    ])
                } catch (e) {
                    this.$Alert.Error(e)
                }
            },
            openMenu () {
                const {toolbar, avatar, userName, toolbarContent, amount, btnClose, mask, btnCurrency} = this.$refs
                const timeline = new TimelineLite()

                TweenLite.set(toolbar, {height: `${this.startHeight}px`})
                TweenLite.set(toolbarContent, {opacity: `0`})
                TweenLite.set(mask, {opacity: `0`, y: 0})
                TweenLite.set(amount, {x: 0, y: 0, scale: 1})
                TweenLite.set(btnClose, {y: 200})

                if(this.currentBalance.currency) {
                    TweenLite.set(btnCurrency, {x: 0, y: 0, scale: 1})
                }

                timeline.to(toolbar, timeAnim, {height: `${this.defaultMaxHeight}px`, ease: typeAnim}, 0)
                timeline.to(toolbarContent, timeAnim, {opacity: `1`, ease: typeAnim}, 0)
                timeline.to(amount, timeAnim, {x: this.positionLeft(), y: 20, scale: 2, ease: typeAnim}, 0)
                timeline.to(btnClose, timeAnim, {y: 0}, 0)
                timeline.to(mask, timeAnim, {opacity: `1`}, 0)

                if(this.currentBalance.currency) {
                    timeline.to(btnCurrency, timeAnim, {y: -3, x: 0, scale: 0.50, ease: typeAnim}, 0)
                }

                if (this.startHeight) {
                    TweenLite.set([userName, avatar, toolbarContent], {opacity: `1`})
                    timeline.to([userName, avatar], 0.3, {opacity: `0`, ease: typeAnim}, 0)
                }

                if (window.StatusBar) {
                    window.StatusBar.styleLightContent();
                }
            },
            closeMenu () {
                const {toolbar, avatar, userName, toolbarContent, amount, btnClose, mask, btnCurrency} = this.$refs
                const timeline = new TimelineLite()

                // TweenLite.set(toolbar, {height: `${this.defaultMaxHeight}px`})
                // TweenLite.set(toolbarContent, {opacity: `1`})
                // TweenLite.set(amount, {x: this.positionLeft(), y: 10, scale: 2})
                // TweenLite.set(btnClose, {x: 0})
                // TweenLite.set(mask, {opacity: `1`, y: 0})
                // TweenLite.set(btnCurrency, {x: 0, y: 0, scale: 1})

                timeline.to(toolbar, timeAnim, {height: `${this.startHeight}px`, ease: typeAnim}, 0)
                timeline.to(toolbarContent, timeAnim, {opacity: `0`, ease: typeAnim}, 0)
                timeline.to(amount, timeAnim, {x: 0, y: 0, scale: 1, ease: typeAnim}, 0)
                timeline.to(btnClose, timeAnim, {y: 200}, 0)
                timeline.to(mask, timeAnim, {opacity: `0`}, 0).to(mask, timeAnim, {y: -1000}, 0.5)

                if(this.currentBalance.currency) {
                    timeline.to(btnCurrency, timeAnim, {x: 0, y: 0, scale: 1, ease: typeAnim}, 0)
                }

                if (this.startHeight) {
                    TweenLite.set([userName, avatar], {opacity: `0`})
                    timeline.to([userName, avatar], timeAnim, {opacity: `1`, ease: typeAnim}, 0)
                }

                if (window.StatusBar) {
                    if (this.currentPageTab !== 'screen-home-tab') {
                        window.StatusBar.styleDefault();
                    }
                }
            },
            _setHeight (h) {
                const {toolbar, userName, avatar, btnClose, mask} = this.$refs
                TweenLite.set(toolbar, {height: `${h}px`})
                TweenLite.set(btnClose, {y: 200})
                TweenLite.set(mask, {opacity: `0`, y: -1000})

                if (!this.startHeight) {
                    TweenLite.set([userName, avatar], {opacity: `0`})
                } else {
                    TweenLite.set([userName, avatar], {opacity: `1`})
                }
            },
            goToCreatePin() {
                const fullMobileNumber = `+${this.profile.mobile}`
                const clearPhoneNumber = MaskPhone.GetClearPhoneNumber(fullMobileNumber)
                const clearPhoneMask = fullMobileNumber.replace(clearPhoneNumber, '')

                this.pushPage({
                    extends: ScreenConfirmPin,
                    data: () => {
                        return {
                            mobile: clearPhoneNumber,
                            code: clearPhoneMask,
                        }
                    },
                    methods: {
                        callackNext() {
                            this.popPage()
                        }
                    }
                })
            }
        },
    }
</script>

<style lang="scss"
       scoped>
    .row-amount {
        line-height: 30px;
        /*position: absolute;*/
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .amount--currency {
        color: #fff;
        font-weight: 600;
        font-size: 15px;
        line-height: 15px;
        letter-spacing: -0.24px;
    }

    .amount--currency {
        padding-left: 5px;
    }

    .row-btn-lose {
        position: fixed !important;
        right: 0;
        bottom: 8px !important;
        left: 0;
        z-index: 999 !important;
        text-align: center;
    }

    .toolbar-btn--close {
        width: 46px !important;
        min-width: 46px !important;
        height: 46px !important;
        min-height: 46px !important;
        border-radius: 50% !important;

        i {
            font-size: 24px;
        }
    }

    .toolbar-upper {
        width: 100vw;
        &__header {
            position: relative;
        }

        &--mask {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 900 !important;
            background-color: rgba(32, 30, 38, 0.48);
            transform: translateY(-1000);
            opacity: 0;
        }

        &__text {
            font-weight: 600;
            font-size: 20px;
            line-height: 28px;
            letter-spacing: 0.2px;
        }
    }

    html[onsflag-iphonex-portrait] {
        .row-btn-lose {
            bottom: 42px !important;
        }
    }

    .amount-item-balance {
        font-size: 22px;
        font-weight: 600;
        letter-spacing: 0.2px;
        line-height: 28px;
        color: #000000;
        display: flex;
        align-items: baseline;
    }

    .dialog-header {
        display: flex;
        justify-content: space-between;

        .v-subheader {
            font-size: 22px;
            font-weight: 600;
            letter-spacing: 0.2px;
            line-height: 28px;
            color: #000000;
        }

        .v-btn {
            height: 36px;
            width: 36px;
            background-color: #F5F7FA;
            margin-right: 16px;
            margin-top: 5px;
        }

        .v-btn__content {
            font-size: 1rem;
        }
    }

    span.btn-currency {
        align-self: center;
        display: flex;
        margin-top: 6px;
    }
</style>
