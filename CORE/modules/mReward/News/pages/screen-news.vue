<template>
    <layout
        :layout="layout"
    >
        <template v-if="partnerNews.length">
            <div class="grid--masonry">
                <product-card
                    v-for="(item, index) in partnerNews"
                    :item="item"
                    :key="index"
                    @click.native="goToNewsDetails(item.item)"
                />
            </div>
        </template>
        <not-found-items
            v-else
            :message="$t('m_news_not_found_promotions')"
        />
    </layout>
</template>

<script>
    import ScreenNewsMixin from '_screen_news_mixin'

    export default {
        name: 'screen-news',
        mixins: [
            ScreenNewsMixin
        ]
    }
</script>

<style scoped>

</style>
