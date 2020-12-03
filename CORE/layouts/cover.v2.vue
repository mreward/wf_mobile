<template>
    <v-ons-page
        v-status-bar-fill
        class="layout-cover"
        :page.sync="page"
        @show="onShowPage"
        @deviceBackButton.prevent="onDeviceBackPressed"
    >
        <slot name="toolbar">
            <toolbar
                class="toolbar--transparent"
                :title="title"
                :on-back="onBack"
                :button-left="buttonLeft === '' ? 'back' : buttonLeft"
            />
        </slot>
        <div class="page__content page__layout page__layout--cover">
            <div class="page__background--cover">
                <img
                    ref="img"
                    :class="{ 'img-animation--linear': isImgLoaded }"
                    :src="cover"
                >
            </div>
            <div class="page-content" :style="`padding-top: ${heightImg}px`">
                <slot/>
            </div>
        </div>
    </v-ons-page>
</template>

<script>
    import Default from '_layout_default'

    export default {
        name: 'layout-cover',
        extends: Default,
        props: {
            cover: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                heightImg: this.$ons.platform.isIPhoneX() ? 88 : 64,
                isImgLoaded: false
            }
        },
        mounted() {
            if (this.$refs.img.height) {
                this.setImageHeight(this.$refs.img)
                return
            }

            this.$refs.img.onload = (item) => {
                this.setImageHeight(item.srcElement)
            }
        },
        methods: {
            setImageHeight(item) {
                this.isImgLoaded = true
                this.heightImg = item.clientHeight - 10
            }
        }

    }
</script>

