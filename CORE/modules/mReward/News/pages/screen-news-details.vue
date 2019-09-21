<template>
    <layout
        layout="cover"
        :cover="news.img_path"
    >
        <div class="cover__content">
            <div class="news__title">
                {{ news.name }}
            </div>
            <div
                class="news__content"
                v-html="news.description"
            >
            </div>
            <div class="news__created">
                {{ createdDate() }}
            </div>
        </div>
    </layout>
</template>

<script>
    import ScreenNewsDetailsMixin from '_screen_news_details_mixin'

    export default {
        name: 'screen-news-details',
        mixins: [
            ScreenNewsDetailsMixin
        ]
    }
</script>

<style scoped>

</style>
