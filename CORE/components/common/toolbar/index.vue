<template>
    <v-ons-toolbar
        class="toolbar-main toolbar--base"
        align="center"
    >
        <div class="left toolbar-main__left">
            <slot name="left">
                <toolbar-left
                    v-if="buttonLeft"
                    :icon="iconLeft"
                    :button="buttonLeft"
                />
            </slot>
        </div>
        <div class="center toolbar-main__center">
            <slot name="title">
                <toolbar-title
                    v-if="title"
                    :title="title"
                />
            </slot>
        </div>
        <div class="right toolbar-main__right">
            <slot name="right">
                <toolbar-right
                    v-if="buttonRight"
                    :label="labelRight"
                    :button-event="buttonRight"
                />
                <toolbar-right
                    v-else-if="iconRight"
                    :icon="iconLeft"
                />
            </slot>
        </div>
        <slot/>
    </v-ons-toolbar>
</template>

<script>
    import ToolbarLeft from './left'
    import ToolbarTitle from './title'
    import ToolbarRight from './right'

    export default {
        name: 'toolbar',
        components: {
            ToolbarLeft,
            ToolbarTitle,
            ToolbarRight
        },
        props: {
            buttonLeft: {
                type: [String, Boolean],
                default: ''
            },
            buttonRight: {
                type: [Function, Boolean],
                default: false
            },
            labelRight: {
                type: [String],
                default: ''
            },
            iconLeft: {
                type: String,
                default: 'arrow'
            },
            title: {
                type: [String, Boolean],
                default: ''
            },
            iconRight: {
                type: Boolean,
                default: false
            },
            onBack: {
                type: [Boolean, Function],
                default: false
            }
        },
        provide() {
            return {
                onBack: this.onBack
            }
        }
    }
</script>
