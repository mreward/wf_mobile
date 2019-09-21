<template functional>
    <component
        :is="`layout-${props.layout || 'default'}`"
        v-bind="props"
        v-on="listeners"
    >
        <template slot="toolbar">
            <slot
                name="toolbar"
                v-bind="props"
            />
        </template>
        <slot />
        <template slot="content">
            <slot name="content" />
        </template>
    </component>
</template>

<script>
    export default {
        name: 'layout'
        // props: {
        //     layout: {
        //         type: String,
        //         default: 'default'
        //     },
        //     title: {
        //         type: String,
        //         default: ''
        //     },
        //     buttonLeft: {
        //         type: [String, Boolean],
        //         default: ''
        //     },
        //     onBack: {
        //         type: [Boolean, Function],
        //         default: false
        //     },
        //     onShow: {
        //         type: [Boolean, Function],
        //         default: false
        //     },
        //     page: {
        //         type: String,
        //         default: 'screen'
        //     },
        //     showLoader: {
        //         type: Boolean,
        //         default: true
        //     }
        // }
    }
</script>
