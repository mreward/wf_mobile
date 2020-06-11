<template>
    <layout
        :layout="layout"
        :title="$t('m_shop_title')"
        buttonLeft="none"
        page="shop"
    >
       <div class="shop-content" :style="{
                    backgroundImage: `url(${img})`,
                }" >
           <not-found-items
                   :message="$t('m_shop_title_soon')"
           >
           </not-found-items>
       </div>






    </layout>
</template>

<script>
    import ScreenShopMixin from '_screen_shop_mixin'
    import ShopIllustration from '_screen_shop_img/shop-illustration.svg'

    export default {
        name: 'screen-shop',
        mixins: [
            ScreenShopMixin
        ],
        data() {
            return {
                img: ShopIllustration,
            }
        }
    }
</script>

<style lang="scss">
    .page[page="shop"] {
        .page__content {
            padding: 0;
            padding-bottom: 34px;

            .not-found-items {
                height: 30px;
                min-height: 30px;
                margin: -62px;
            }
        }

        .toolbar-main__left {
            width: 0px;
        }

    }
.shop-content {
    height: calc(100vw * 1.24);
    justify-content: center;
    align-items: flex-end;
    overflow: visible;
    background-size: contain;
    display: flex;
}
</style>
