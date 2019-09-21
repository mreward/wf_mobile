<template>
    <v-ons-page
        v-status-bar-fill
        class="layout-tabs"
    >
        <slot name="toolbar">
            <toolbar
                v-if="title"
                :title="title"
                :button-left="buttonLeft"
            />
        </slot>
        <div class="page__content page__layout">
            <ons-progress-bar
                v-show="loaderVisible"
                indeterminate
            />
            <v-ons-tabbar
                :position="position"
                :swipeable="swipeable"
                :index.sync="index"
                :hide-tabs="tabs.length === 1"
                @postchange="postChange"
            >
                <template slot="pages">
                    <slot name="pages">
                        <component
                            :is="currentTab.page"
                            v-if="currentTab"
                            v-bind.sync="currentTab.props"
                        />
                    </slot>
                    <slot />
                </template>
                <v-ons-tab
                    v-for="tab in tabs"
                    :key="tab.key"
                    :icon="tab.icon"
                    :label="$t(tab.label)"
                    :badge="tab.badge || null"
                    :active="current === tab.key"
                    :data-test="tab.testData"
                    @click="$emit('update:current', tab.key)"
                />
            </v-ons-tabbar>
        </div>
    </v-ons-page>
</template>

<script>
    import { mapGetters } from 'vuex'
    import constants from '_vuex_constants'

    export default {
        name: 'layout-tabs',
        props: {
            title: {
                type: String,
                default: ''
            },
            buttonLeft: {
                type: String,
                default: 'back'
            },
            position: {
                type: String,
                default: 'top'
            },
            tabs: {
                type: Array,
                default: () => ([])
            },
            current: {
                type: String,
                required: true
            },
            swipeable: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                index: 0
            }
        },
        computed: {
            ...mapGetters({
                loaderVisible: constants.App.Getters.loaderVisible
            }),
            currentTab() {
                return this.tabs.find(tab => tab.key === this.current)
            }
        },
        watch: {
            current(current) {
                this.index = this.tabs.findIndex(tab => tab.key === current)
            },
            index(index) {
                const tab = this.tabs[index] || {}

                if (tab) {
                    this.$emit('update:current', tab.key)
                }
            }
        },
        methods: {
            postChange() {
                this.$bus.$emit('hideExpansion')
            }

        }
    }
</script>
