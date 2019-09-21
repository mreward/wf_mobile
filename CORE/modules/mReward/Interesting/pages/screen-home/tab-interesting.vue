<template>
    <layout-tabs
        :title="$t('m_interesting')"
        button-left=""
        :layout="layout"
        :tabs="tabs"
        swipeable
        :position="position"
        :current.sync="current"
        shown
    >
        <template slot="pages">
            <tab-promotions class="tab--extend tab--actions" />
            <tab-news class="tab--extend tab--news" />
            <tab-poll />
        </template>
    </layout-tabs>
</template>

<script>
    import TabInterestingMixin from '_tab_interesting_mixin'

    export default {
        name: 'tab-interesting',
        mixins: [
            TabInterestingMixin
        ]
    }
</script>

<style scoped>

</style>
