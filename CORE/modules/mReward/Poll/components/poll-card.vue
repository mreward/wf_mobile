<template>
    <div
        class="card card--vertical"
        :class="{ 'is-muted': isContainsAnswer }"
        @click="clickOnCard"
    >
        <div
            class="card__image"
            :style="{ backgroundImage: `url(${ poll.image })` }"
        />

        <div class="card__wrapper card__wrapper--modifier">
<!--            <div class="card__title">-->
<!--                {{ poll.question | capitalize }}-->
<!--            </div>-->
            <div class="card__range">
                <div class="range__ruler">
                    <div
                        v-for="n in 10"
                        :key="n"
                        :class="[{ selected: n === parseInt(sliderValueFormat) }, selectedClass(n)]"
                    >
                        {{ n }}
                    </div>
                </div>
                <div ref="range">
                    <v-ons-range
                        v-model="sliderValue"
                        min="10"
                        max="100"
                        step="1"
                        height="2"
                        class="range__slider"

                    />
                </div>

            </div>
            <v-btn
                v-if="!isContainsAnswer"
                depressed
                block
                color="primary"
                type="main"
                @click.native.prevent="giveAnAnswer"
            >
                {{ $t('m_poll_estimate') }}
            </v-btn>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import constants from '_vuex_constants'
    import round from 'lodash/round'

    export default {
        name: 'poll-card',
        props: {
            poll: {
                type: Object,
                default: () => ({})
            }
        },
        data() {
            return {
                sliderValue: '80'
            }
        },
        computed: {
            isContainsAnswer() {
                return this.poll.answer
            },
            sliderValueFormat() {
                return round(this.sliderValue / 10)
            }
        },
        watch: {
            'poll.answer': {
                handler () {
                    this.sliderValue = this.poll.answer ? this.poll.answer * 10 : 80
                },
                immediate: true
            }
        },
        mounted() {
            this.$refs.range.addEventListener('touchend', this.touchEnd)
        },
        methods: {
            ...mapActions({
                setAnswer: constants.MrewardPoll.Actions.setAnswer,
                getPolls: constants.MrewardPoll.Actions.getPolls
            }),
            selectedClass(n) {
                return n < 5 ? 'selected--red' : n < 8 ? 'selected--orange' : 'selected--green'
            },
            async giveAnAnswer () {
                try {
                    const typeObject = this.poll.communication_type
                    const type = Object.keys(typeObject).map(i => typeObject[i])

                    await this.setAnswer({
                        pollId: this.poll.id,
                        answer: parseInt(this.sliderValueFormat),
                        type: type.includes('mobile') ? 'mobile' : type[0]
                    })
                    this.$bus.$emit(
                        'showStatusPopover',
                        {
                            status: 1,
                            title: this.$t('m_poll_thank'),
                            nextEvent: this.updatePolls
                        }
                    )
                } catch (e) {
                    this.$Alert.Error(e)
                }
            },
            async updatePolls() {
                try {
                    await this.getPolls({
                        networkFirst: true
                    })
                } catch (e) {
                    this.$Alert.Error(e)
                }
            },
            clickOnCard() {
                if (this.isContainsAnswer) {
                    this.$bus.$emit('showStatusPopover', { status: 2, title: this.$t('m_poll_you_have_voted') })
                }
            },
            touchEnd() {
                this.sliderValue = this.sliderValueFormat * 10
            }
        }
    }
</script>
