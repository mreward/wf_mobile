<template id="screen-home">
    <v-ons-page>
        <v-ons-tabbar class="tabbar-home">
            <template slot="pages">
                <transition
                    name="fade"
                    mode="out-in"
                >
                    <keep-alive exclude="screen-adresses">
                        <component :is="currentPageTab" />
                    </keep-alive>
                </transition>
            </template>

            <template
                v-for="tab in childTabs"
            >
                <v-ons-tab
                    v-if="tab.button"
                    :key="tab.key"
                    :icon="tab.icon"
                    :class="classTab(tab.class)"
                    @click.prevent="goToPage(tab.key)"
                />

                <v-ons-tab
                    v-else
                    :key="tab.key"
                    :active="currentPageTab === tab.key"
                    :icon="tabIcon(tab)"
                    :label="$t(tab.label)"
                    :class="classTab(tab.class)"
                    @click.prevent="clickTab(tab.key)"
                />
            </template>
        </v-ons-tabbar>
    </v-ons-page>
</template>
<script>
    import MixinScreenIndex from '_mixin_screen_home'
    import MixinHomeTabs from '_mixin_home_tabs'

    export default {
        name: 'screen-home',
        mixins: [
            MixinScreenIndex,
            MixinHomeTabs
        ]
    }
</script>
