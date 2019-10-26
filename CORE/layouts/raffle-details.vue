<template>
    <v-ons-page
        v-status-bar-fill
        shown
        class="layout-raffle-details"
    >
        <div
            class="page__content page__layout"
            :class="{ 'is-scrolled-up': scrolledUp }"
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
                        v-show="!scrolledUp"
                        class="toolbar-large__footer"
                    >
                        {{ $t('m_raffles_for_next_dib') }}
                        <span class="text--ellipse">
                            {{ raffleData.dibsForNext }} {{ raffleData.currency }}
                        </span>
                    </div>
                </div>
            </div>
            <div
                ref="pageContent"
                class="page-content"
                :class="{ 'is-moor-animation': isMoorFunctionExecute }"
                :style="`padding-top: ${toolbarHeight}px`"
            >
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
                touchEndToolbarHeight: 0
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
                const startTouchToolbarHeight = this.touchEndToolbarHeight || this.initialToolbarHeight
                this.toolbarHeight = startTouchToolbarHeight - swipeY

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

