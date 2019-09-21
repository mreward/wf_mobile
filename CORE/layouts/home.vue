<template>
    <v-ons-page
        v-status-bar-fill
        shown
        class="layout-home"
    >
        <slot name="toolbar">
            <toolbar
                v-if="title"
                :title="title"
                :button-left="buttonLeft"
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
        name: 'layout-home',
        props: {
            title: {
                type: String,
                default: ''
            },
            buttonLeft: {
                type: String,
                default: 'back'
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
