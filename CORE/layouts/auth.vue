<template>
    <v-ons-page
        v-status-bar-fill
        class="layout-auth"
        @deviceBackButton="deviceBackButton"
    >
        <div class="page__content">
            <slot name="toolbar">
                <toolbar
                    inline
                    :button-left="buttonLeft"
                    :icon-left="iconLeft"
                    :button-right="buttonRight"
                    :label-right="labelRight"
                    :title="title"
                    class="toolbar--auth"
                >
                    <img
                        v-if="!title"
                        slot="title"
                        :src="imgLogo"
                        class="layout-auth__logo"
                    >
                </toolbar>
            </slot>
            <ons-progress-bar
                v-show="loaderVisible"
                indeterminate
            />
            <div class="page__layout">
                <slot />
            </div>
        </div>
    </v-ons-page>
</template>

<script>
    import { mapGetters } from 'vuex'
    import constants from '_vuex_constants'
    import imgLogo from '_img_logo'

    export default {
        name: 'layout-auth',
        props: {
            title: {
                type: String,
                default: ''
            },
            buttonLeft: {
                type: [String, Boolean],
                default: false
            },
            buttonRight: {
                type: [Function, Boolean],
                default: false
            },
            iconLeft: {
                type: String,
                default: ''
            },
            labelRight: {
                type: [String],
                default: ''
            },
            deviceBackButton: {
                type: Function,
                default: event => event
            }
        },
        data () {
            return {
                imgLogo
            }
        },
        computed: {
            ...mapGetters({
                loaderVisible: constants.App.Getters.loaderVisible
            })
        }
    }
</script>
