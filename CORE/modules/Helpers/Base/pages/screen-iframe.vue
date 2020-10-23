<template>
    <layout
        :title="pageTitle"
        :page="'iframe'"
        :on-back="onBack"
    >
        <iframe
            :src="url"
            frameborder="0"
            style="width: 100%; height: 100%;"
            @load="load"
        />
    </layout>
</template>

<script>
    import MixinIframe from '_mixin_screen_iframe'

    export default {
        name: 'screen-iframe',
        mixins: [MixinIframe]
    }
</script>
