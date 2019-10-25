<template>
    <v-ons-page
        v-status-bar-fill
        shown
        class="layout-raffle-details"
    >
        <div class="page__content page__layout page__layout--cover">
            <back-button
                class="back-button"
                icon="back"
            />
            <div
                class="page__background--cover"
                :class="{ 'is-horizontal-bar': scrolledUp }"
            >
                <div
                    ref="toolbarContent"
                    class="toolbar-large"
                >
                    <div class="toolbar-large__header">
                        <i class="icon-k-symbol" />
                        <div class="text--top">
                            {{ raffleData.count }}
                        </div>
                        <div class="text--bottom">
                            {{ $t('m_raffles_my_dibs') }}
                        </div>
                    </div>
                    <div class="toolbar-large__footer">
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
                :style="`padding-top: ${scrolledUpContent || toolbarHeight}px`"
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
                touchInterval: 0,
                dragStart: 0,
                scrolledUp: false
            }
        },
        computed: {
            scrolledUpContent() {
                if (!this.scrolledUp) {
                    return false
                }
                return this.toolbarHeight
            }
        },
        mounted() {
            this.initialToolbarHeight = this.$refs.toolbarContent.clientHeight
            this.toolbarHeight = this.initialToolbarHeight
            this.touchInterval = this.initialToolbarHeight - minToolbarHeight

            this.$refs.pageContent.addEventListener('touchstart', this.touchStart)
            this.$refs.pageContent.addEventListener('touchend', this.touchEnd)
            this.$refs.pageContent.addEventListener('touchmove', this.touchMove)
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
                const dragEnd = event.changedTouches[0].clientY
                const swipeLength = this.dragStart - dragEnd

                const { toolbarContent, pageContent } = this.$refs
                console.log(pageContent)
                console.log(event)
                debugger
                if (swipeLength > this.touchInterval / 2) {
                    this.moorContentToTop()
                } else {
                    this.moorContentToBottom(swipeLength)
                }
            },
            setPosition (swipeY) {
                const { toolbarContent, pageContent } = this.$refs

                if (swipeY > this.touchInterval) {
                    this.scrolledUp = true
                } else {
                    this.scrolledUp = false
                }

                console.log(swipeY)
            },
            moorContentToTop() {
                this.scrolledUp = true
                this.toolbarHeight = minToolbarHeight
            },
            moorContentToBottom(swipeLength) {
                this.scrolledUp = false
                this.toolbarHeight = this.initialToolbarHeight
            }
        }
    }
</script>

