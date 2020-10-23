<template>
    <v-ons-page
        v-status-bar-fill
        shown
        class="layout-tab"
    >
        <slot name="toolbar">
            <toolbar
                v-if="title"
                :title="title"
                :button-left="buttonLeft"
                :on-back="onBack"
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
        </div>
    </v-ons-page>
</template>

<script>
    import { mapGetters } from 'vuex'
    import constants from '_vuex_constants'

    export default {
        name: 'layout-tab',
        props: {
            title: {
                type: String,
                default: ''
            },
            buttonLeft: {
                type: String,
                default: 'back'
            },
            onBack: {
                type: [Boolean, Function],
                default: false
            },
            showLoader: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            ...mapGetters({
                loaderVisible: constants.App.Getters.loaderVisible
            })
        }
    }
</script>
