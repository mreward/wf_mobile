<template>
    <v-ons-page
        v-status-bar-fill
        shown
        class="layout-raffle-details"
    >
        <div
            class="page__content page__layout"
            :class="{ 'is-scrolled-up': scrolledUp, 'muted': raffleData.isExpired }"
        >
            <back-button
                class="back-button"
                icon="back"
            />
            <div
                class="page__background--cover"
            >
                <div
                    ref="toolbarContent"
                    class="toolbar-large"
                >
                    <div class="toolbar-large__header">
                        <i class="icon-active" />
                        <div class="text--top">
                            {{ raffleData.count }}
                        </div>
                        <div
                            v-show="!scrolledUp"
                            class="text--bottom"
                        >
                            {{ $t('m_raffles_my_dibs') }}
                        </div>
                    </div>
                    <div
                        v-show="!scrolledUp && !raffleData.isExpired"
                        class="toolbar-large__footer"
                    >
                        {{ $t('m_raffles_for_next_dib_start') }}
                        <span class="text--ellipse">
                            {{ raffleData.dibsForNext }} {{ raffleData.currency }}
                        </span>
                        {{ $t('m_raffles_for_next_dib_finish') }}
                    </div>
                </div>
            </div>
            <div
                ref="pageContent"
                class="page-content"
                :class="{ 'is-moor-animation': isMoorFunctionExecute }"
                :style="`transform: translate3d(0, ${toolbarHeight}px, 0)`"
            >
                <div
                    v-show="scrolledUp"
                    class="top-blur"
                    :style="`transform: translate3d(0, ${topBlurMargin}px, 0)`"
                />
                <slot />
            </div>
        </div>
    </v-ons-page>
</template>

<script>
    // TODO move this layout to mreward/raffle module
    import BackButton from '_CORE/components/common/toolbar/back-button.vue'

    const minToolbarHeight = 52 // TODO iphoneX

    export default {
        name: 'layout-raffle-details',
        components: {
            BackButton
        },
        props: {
            raffleData: {
                type: Object,
                default: () => ({})
            }
        },
        data() {
            return {
                initialToolbarHeight: minToolbarHeight,
                toolbarHeight: minToolbarHeight,
                dragStart: 0,
                scrolledUp: false,
                isMoorFunctionExecute: false,
                touchEndToolbarHeight: 0,
                lastSettedPosition: 0,
                pageAdditionalPadding: this.$ons.platform.isIPhoneX() ? 40 : 16
            }
        },
        computed: {
            topBlurMargin() {
                return minToolbarHeight - this.toolbarHeight
            }
        },
        mounted() {
            this.initialToolbarHeight = this.$refs.toolbarContent.clientHeight
            this.toolbarHeight = this.initialToolbarHeight

            this.$refs.pageContent.addEventListener('touchstart', this.touchStart)
            this.$refs.pageContent.addEventListener('touchend', this.touchEnd)
            this.$refs.pageContent.addEventListener('touchmove', this.touchMove)
        },
        beforeDestroy() {
            this.$refs.pageContent.removeEventListener('touchstart', this.touchStart)
            this.$refs.pageContent.removeEventListener('touchend', this.touchEnd)
            this.$refs.pageContent.removeEventListener('touchmove', this.touchMove)
        },
        methods: {
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
                if (this.toolbarHeight > this.initialToolbarHeight / 2) {
                    this.moorContentToBottom()
                } else if (this.toolbarHeight < this.initialToolbarHeight / 2 && this.toolbarHeight > minToolbarHeight) {
                    this.moorContentToTop()
                }

                this.touchEndToolbarHeight = this.toolbarHeight
            },
            setPosition (swipeY) {
                /**
                 * return if initial page content height less than window inner height
                 */
                const initialContentHeight = this.$refs.pageContent.clientHeight + this.initialToolbarHeight + this.pageAdditionalPadding
                if (initialContentHeight < window.innerHeight) {
                    return
                }

                /**
                 * page scrolling - changing page-content margin-top
                 */
                const startTouchToolbarHeight = this.touchEndToolbarHeight || this.initialToolbarHeight
                const contentHeight = this.$refs.pageContent.clientHeight + this.toolbarHeight + this.pageAdditionalPadding
                if (this.lastSettedPosition > swipeY || // change swipe direction from top to bottom
                    contentHeight > window.innerHeight || // page content > than window height
                    this.toolbarHeight > minToolbarHeight // no scrolled up page toolbar
                ) {
                    this.toolbarHeight = startTouchToolbarHeight - swipeY
                    this.lastSettedPosition = swipeY
                }

                /**
                 * set toolbar state - scrolledUp
                 */
                if (this.toolbarHeight < minToolbarHeight) {
                    this.scrolledUp = true
                } else {
                    this.scrolledUp = false
                }
            },
            moorContentToTop() {
                this.isMoorFunctionExecute = true
                this.scrolledUp = true
                this.toolbarHeight = minToolbarHeight

                setTimeout(() => {
                    this.isMoorFunctionExecute = false
                }, 500)
            },
            moorContentToBottom() {
                this.isMoorFunctionExecute = true
                this.scrolledUp = false
                this.toolbarHeight = this.initialToolbarHeight

                setTimeout(() => {
                    this.isMoorFunctionExecute = false
                }, 500)
            }
        }
    }
</script>

