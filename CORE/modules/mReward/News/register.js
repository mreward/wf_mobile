/**
 * @param dirname
 * @returns {{}}
 */
module.exports = (dirname) => {
    const PATH = `${dirname}/CORE/modules/mReward/News`

    return {
        // layout
        _layout_cover: `${dirname}/CORE/layouts/cover.v2.vue`,

        // mixins
        _screen_news_mixin: `${PATH}/pages/mixins/screen-news.js`,
        _screen_news_details_mixin: `${PATH}/pages/mixins/screen-news-details.js`,

        // pages
        _screen_news: `${PATH}/pages/screen-news.vue`,
        _screen_news_details: `${PATH}/pages/screen-news-details.vue`
    }
}
