<template>
    <v-ons-page
        v-status-bar-fill
        class="layout-default"
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
                :icon-left="iconLeft"
            />
        </slot>
        <div class="page__content page__layout">
            <template
                v-if="showLoader"
            >
                <ons-progress-bar
                    v-show="loaderVisible"
                    indeterminate
                />
            </template>
            <slot />
            <slot name="content" />
        </div>
    </v-ons-page>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import constants from '_vuex_constants'
    import isFunction from 'lodash/isFunction'

    export default {
        name: 'layout-default',
        props: {
            title: {
                type: [String, Boolean],
                default: ''
            },
            buttonLeft: {
                type: String,
                default: 'back'
            },
            iconLeft: {
                type: String,
                default: 'arrow'
            },
            onBack: {
                type: [Boolean, Function],
                default: false
            },
            onShow: {
                type: [Boolean, Function],
                default: false
            },
            page: {
                type: String,
                default: 'screen'
            },
            showLoader: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                isBackEventFired: false
            }
        },
        computed: {
            ...mapGetters({
                loaderVisible: constants.App.Getters.loaderVisible
            })
        },
        methods: {
            ...mapActions({
                popPage: constants.App.Actions.popPage
            }),
            onDeviceBackPressed() {
                if (isFunction(this.onBack)) {
                    this.onBack()
                } else if (!this.isBackEventFired) {
                    this.isBackEventFired = true
                    this.popPage()
                }
            },
            onShowPage() {
                if (isFunction(this.onShow)) {
                    this.onShow()
                }
            }
        }
    }
</script>
