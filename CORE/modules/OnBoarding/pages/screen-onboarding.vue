<template>
    <v-ons-page class="onboarding">
        <div
            id="background"
            ref="background"
            class=" page__background"
        />
        <div class="page__content">

            <transition name="slide-fade-right">
                <button-base
                    v-show="!lastScreen"
                    type="text"
                    class="close"
                    @click="goToNext"
                >
                    <v-ons-icon icon="close" v-if="!moduleOptions('OnBoarding').closeTitle"></v-ons-icon>
                    <template v-else>
                        {{ $t('m_onboarding_close') }}
                    </template>
                </button-base>
            </transition>
            <v-ons-carousel
                fullscreen
                swipeable
                auto-scroll
                overscrollable
                centered
                auto-scroll-ratio="0.1"
                :index.sync="carouselIndex"
            >
                <v-ons-carousel-item
                    v-for="(item, key) in items"
                    :key="key"
                    class="intro"
                >

                    <div class="intro--wrapper">
                        <div
                            class="intro-image"
                        >
                            <img :src="getImage(item)">
                        </div>

                        <div class="intro-text">
                            <div
                                v-if="item.title"
                                class="intro-text__title"
                            >
                                {{ $t(item.title) }}
                            </div>
                            <div class="intro-text__desc">
                                {{ $t(item.text) }}
                            </div>
                        </div>
                    </div>
                </v-ons-carousel-item>
            </v-ons-carousel>
        </div>

        <v-ons-bottom-toolbar class="info-button">
            <v-ons-row v-show="!lastScreen">
                <div class="dots">
                    <span
                        v-for="dotIndex in Object.keys(items).length"
                        :key="dotIndex"
                        :index="dotIndex - 1"
                        :class="{'active': carouselIndex === dotIndex - 1}"
                        @click="carouselIndex = dotIndex - 1"
                    />
                </div>

                <!-- <ons-toolbar-button
                        v-show="!lastScreen"
                        class="toolbar-button__next"
                        @click="carouselIndex = carouselIndex + 1">
                        {{$t('m_project_next')}}
                    </ons-toolbar-button>-->
            </v-ons-row>

            <button-base
                v-if="moduleOptions('OnBoarding').skipAction && !lastScreen"
                type="text"
                class="skip"
                @click="goToNext"
            >
                {{ $t('m_onboarding_skip') }}
            </button-base>

            <button-base
                v-if="moduleOptions('OnBoarding').nextAction && !lastScreen"
                type="text"
                class="next"
                @click="carouselIndex++"
            >
                {{ $t('m_onboarding_next') }}
            </button-base>

            <transition name="slide-fade-down">
                <button-base
                    v-show="lastScreen"
                    type="auth"
                    @click="goToNext"
                >
                    {{ $t('m_onboarding_start') }}
                </button-base>
            </transition>
        </v-ons-bottom-toolbar>
    </v-ons-page>
</template>

<script>
    import MixinOnboarding from '_mixin_onboarding'
    import MixinScreenOnboarding from '_mixin_screen_onboarding'

    export default {
        name: 'screen-onboarding',
        mixins: [
            MixinScreenOnboarding,
            MixinOnboarding
        ]
    }
</script>
