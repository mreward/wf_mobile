<template>
    <v-ons-page
        v-status-bar-fill
        shown
        class="layout-tab-cover"
        :page="page"
        @show="onShowPage"
        @deviceBackButton.prevent="onDeviceBackPressed"
    >
        <slot name="toolbar">
            <toolbar
                v-if="title !== ''"
                :title="title"
                :on-back="onBack"
                :button-left="buttonLeft === '' ? 'back' : buttonLeft"
            />
        </slot>
        <div
            class="page__background page__background--color"
        >
            <div
                ref="pageBackground"
                class="page__background--cover"
                :style="{
                    backgroundImage: `url(${cover})`,
                    height: `${backgroundImageSize}vw`
                }"
                @click="$emit('clickBackgroundEvent')"
            />
            <div class="page__background--text">
                <div class="page__background--text-title">
                    {{ fullName }}
                </div>
                <div class="page__background--text-sub">
                    {{ mobile }}
                </div>
            </div>
        </div>
        <div
            ref="pageContent"
            class="page__content page__layout page__layout--cover"
            :style="{ marginTop: `calc(${backgroundImageSize}vw - ${toolbarMargin})` }"
        >
            <v-btn
                    fab
                    class="v-btn--edit toolbar__back-button"
                    @click="popPage"
            >
                <i class="icon-back" />
            </v-btn>

            <slot />
        </div>
    </v-ons-page>
</template>

<script>
    import Default from '_layout_default'
    import { mapActions } from 'vuex'
    import constants from '_CORE/__configs.generate__/store/constants'

    export default {
        name: 'layout-tab-cover',
        extends: Default,
        props: {
            cover: {
                type: String,
                default: ''
            },
            mobile: {
                type: String,
                default: ''
            },
            fullName: {
                type: String,
                default: ''
            },
            contentHeight: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                backgroundImageSize: 65,
                maxBackgroundSize: 65,
                minBackgroundSize: 55,
                oldSwipeValue: 0,
                toolbarMargin: this.$ons.platform.isIPhoneX() ? '24px' : '44px'
            }
        },
        watch: {
            contentHeight(newValue, oldValue) {
                if (newValue !== oldValue) {
                    this.setScrollEventListeners()
                }
            }
        },
        methods: {
            ...mapActions({
                popPage: constants.App.Actions.popPage,
            }),
            setScrollEventListeners() {
                this.$refs.pageContent.removeEventListener('touchstart', this.touchStart)
                this.$refs.pageContent.removeEventListener('touchend', this.touchEnd)
                this.$refs.pageContent.removeEventListener('touchmove', this.touchMove)
                /**
                 * listen scroll events if page content too high
                 */
                if (this.$refs.pageContent.offsetHeight < this.$refs.pageContent.scrollHeight) {
                    this.$refs.pageContent.addEventListener('touchstart', this.touchStart)
                    this.$refs.pageContent.addEventListener('touchend', this.touchEnd)
                    this.$refs.pageContent.addEventListener('touchmove', this.touchMove)
                }
            },

            setPosition (swipeY) {
                const { pageBackground, pageContent } = this.$refs
                const currentSwipeValue = this.backgroundImageSize - this.convertToViewportWidth(swipeY)

                if (currentSwipeValue <= this.maxBackgroundSize && currentSwipeValue >= this.minBackgroundSize) {
                    pageBackground.style.height = `calc(${this.backgroundImageSize}vw - ${swipeY}px)`
                    pageContent.style.marginTop = `calc(${this.backgroundImageSize}vw - ${this.toolbarMargin} - ${swipeY}px)`
                } else if (currentSwipeValue > this.maxBackgroundSize) {
                    this.backgroundImageSize = this.maxBackgroundSize
                } else {
                    this.backgroundImageSize = this.minBackgroundSize
                }

                this.oldSwipeValue = swipeY
            },

            touchMove (event) {
                let newY = 0

                if (this.dragStart === false) {
                    this.dragStart = event.targetTouches[0].clientY
                }

                newY = (this.dragStart - event.targetTouches[0].clientY)

                this.setPosition(newY)
            },

            touchStart (event) {
                this.dragStart = event.targetTouches[0].clientY
            },

            touchEnd (event) {
                const dragEnd = event.changedTouches[0].clientY
                const swipeLength = this.convertToViewportWidth(this.dragStart - dragEnd)
                const futureSwipeValue = this.backgroundImageSize - swipeLength

                if (futureSwipeValue <= this.maxBackgroundSize && futureSwipeValue >= this.minBackgroundSize) {
                    this.backgroundImageSize = futureSwipeValue
                } else if (futureSwipeValue > this.maxBackgroundSize) {
                    this.backgroundImageSize = this.maxBackgroundSize
                } else {
                    this.backgroundImageSize = this.minBackgroundSize
                }
            },

            convertToViewportWidth(value) {
                return value / window.innerWidth * 100
            }
        }
    }
</script>

