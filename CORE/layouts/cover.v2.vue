<template>
    <v-ons-page
        v-status-bar-fill
        class="layout-cover"
        :page="page"
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
                <img :src="cover" ref="img">
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
                heightImg: 200
            }
        },
        mounted() {
            this.heightImg = this.$refs.img.height - 10
        }

    }
</script>

