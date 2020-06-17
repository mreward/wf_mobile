import localforage from "localforage"
<template>
    <layout
        layout="home"
        :show-loader="false"
        page="home"
    >
        <div slot="toolbar">
            <!--<dashboard-profile />-->
        </div>

        <pull-to-wrapper
                class="pull-to-wrapper"
                ref="pullToWrapper"
                :update-action="updateDashboardContent"
        >
            <dashboard-news-board ref="newsBoard"/>
        </pull-to-wrapper>

<!--        <status-popover />-->


        <div class="button-phone" ref="btnCall" @click="goToPage('contacts')" >
            <i class="icon-phone" />
        </div>
    </layout>
</template>

<script>
    import constants from '_vuex_constants'
    import { mapActions } from 'vuex'
    import DashboardNewsBoard from '_dashboard_news_board'
    import MixinPushNotificationHandler from '_mixin_push_notification_handler_extend'
    import PullToWrapper from '_pull_to_wrapper'
    import localforage from 'localforage'

    export default {
        name: 'screen-home-tab',
        components: {
            PullToWrapper,
            DashboardNewsBoard,
        },
        mixins: [
            MixinPushNotificationHandler
        ],
        data() {
            return {
                dragStartX: 0,
                dragStartY: 0,
                positionX: 0,
                positionY: 0,
                isDrag: false,
            }
        },
        computed: {
            heightToolbar () {
                if (this.$ons.platform.isIPhoneX()) {
                    return 136
                }

                return 112
            },
            heightTabbar () {
                if (this.$ons.platform.isIPhoneX()) {
                    return 83
                }

                return 49
            },
        },
        async created () {
            if (window.StatusBar) {
                StatusBar.styleLightContent()
            }

            const position = await localforage.getItem('button-call')
            if (position) {
                this.positionX = position.x
                this.positionY = position.y

                this.$refs.btnCall.style.transform = `translate3d(${this.positionX}px, ${this.positionY}px, 0)`
            }
        },
        mounted() {
            this.$refs.btnCall.addEventListener('touchstart', this.touchStart)
            this.$refs.btnCall.addEventListener('touchend', this.touchEnd)
            this.$refs.btnCall.addEventListener('touchmove', this.touchMove)
        },
        methods: {
            ...mapActions({
                getAccounts: constants.MrewardAccount.Actions.getAccounts,
                getPromotions: constants.MrewardPromotions.Actions.getPromotions,
                getRaffles: constants.MrewardRaffles.Actions.getRaffles,
                getPolls: constants.MrewardPoll.Actions.getPolls,
                getNews: constants.MrewardNews.Actions.getNews,
                getNotifications: constants.MrewardNotifications.Actions.getNotifications,
            }),
            async updateDashboardContent(loaded) {
                try {
                    await Promise.all([
                        this.getPromotions({ networkFirst: true }),
                        this.getAccounts({ networkFirst: true }),
                        this.getRaffles({ networkFirst: true }),
                        this.getPolls({ networkFirst: true }),
                        this.getNews({ networkFirst: true }),
                        this.getNotifications({ networkFirst: true})
                    ])
                } catch (e) {
                    this.$Alert.Error(e)
                } finally {
                    setTimeout(() => {
                        loaded('done')
                    }, 300)
                }
            },

            touchStart(event) {
                if (!this.isDrag) {
                    this.dragStartY = event.targetTouches[0].clientY
                    this.dragStartX = event.targetTouches[0].clientX
                    this.isDrag = true
                    this.$refs.newsBoard.$el.parentElement.parentElement.style.overflow = 'hidden'
                    this.$refs.newsBoard.$el.classList.add('pull-to-wrapper--swipe');
                }
            },
            touchEnd(event) {
                if (this.isDrag) {
                    this.isDrag = false
                    let newY = this.positionY + event.changedTouches[0].clientY - this.dragStartY
                    let newX = this.positionX + event.changedTouches[0].clientX - this.dragStartX
                    this.$refs.newsBoard.$el.parentElement.parentElement.style.overflow = 'scroll';
                    this.$refs.newsBoard.$el.classList.remove("pull-to-wrapper--swipe");

                    const maxHeight = this.$refs.newsBoard.$el.parentElement.parentElement.clientHeight - 60

                    if (newY > 16) {
                        newY = 16
                    } else if (newY < -maxHeight) {
                        newY = -maxHeight
                    }

                    if (newX > 16) {
                        newX = 16
                    } else if (newX < -(window.innerWidth - 62)) {
                        newX = -(window.innerWidth - 62)
                    }


                    this.positionX = newX
                    this.positionY = newY

                    localforage.setItem('button-call', {
                        x: this.positionX,
                        y: this.positionY,
                    })
                }
            },

            touchMove(event) {
                if (this.isDrag) {
                    let newY = this.positionY + event.targetTouches[0].clientY - this.dragStartY
                    let newX = this.positionX + event.targetTouches[0].clientX - this.dragStartX

                    const maxHeight = this.$refs.newsBoard.$el.parentElement.parentElement.clientHeight - 60

                    if (newY > 16) {
                        newY = 16
                    } else if (newY < -maxHeight) {
                        newY = -maxHeight
                    }

                    if (newX > 16) {
                        newX = 16
                    } else if (newX < -(window.innerWidth - 62)) {
                        newX = -(window.innerWidth - 62)
                    }

                    // console.log(maxHeight, newY);

                    this.$refs.btnCall.style.transform = `translate3d(${newX}px, ${newY}px, 0)`
                }
            },
        }
    }
</script>
