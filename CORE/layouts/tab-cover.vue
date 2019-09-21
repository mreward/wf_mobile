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
            class="page__content page__layout page__layout--cover"
        >
            <div class="page__background--cover">
                <img
                    ref="img"
                    :src="cover"
                    @click="$emit('clickBackgroundEvent')"
                >
            </div>

            <div
                class="page-content"
                :style="`padding-top: ${heightImg}px`"
            >
                <slot />
            </div>
        </div>
    </v-ons-page>
</template>

<script>
    import Default from '_layout_default'

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
            }
        },
        data() {
            return {
                heightImg: 200
            }
        },
        mounted() {
            this.heightImg = this.$refs.img.height - 60
        }
    }
</script>

