<template id="screen-home-tab">
    <layout
        layout="home"
    >
        <toolbar
            slot="toolbar"
            button-left="menu"
        >
            <img
                slot="title"
                :src="imgLogo"
            >
        </toolbar>

        <div class="grid grid--small child-width--1-2">
            <tile
                v-for="(item, i) in pages"
                :key="i"
                class="margin-horizontal--small"
                :icon="item.icon"
                :title="$t(item.text)"
                :badge="item.counter"
                @click="goTo(item.page)"
            />
        </div>
    </layout>
</template>

<script>
    import imgLogo from '_img_logo'
    import MixinScreenHomeTabHome from '_mixin_screen_home_tab'
    import MixinHomeWidgets from '_mixin_home_widgets'

    export default {
        name: 'screen-home-tab',
        mixins: [
            MixinScreenHomeTabHome,
            MixinHomeWidgets
        ],
        data() {
            return {
                imgLogo
            }
        }
    }
</script>
