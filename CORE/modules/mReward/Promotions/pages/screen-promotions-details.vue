<template>
    <layout
        layout="cover"
        :cover="promotions.img"
    >
        <div class="cover__content">
            <div class="promotions__title">
                {{ promotions.title }}
            </div>
            <div class="promotions__date">
                <div>
                    {{ $t('m_promotions_offer_valid') }}:
                </div>
                <span>{{ promotions.data }}</span>
            </div>
            <div class="promotions__separator">
            </div>
            <div
                class="promotions__content"
                v-html="promotions.item.content"
            >
            </div>
            <div class="promotions__created">
                {{ createdDate() }}
            </div>
        </div>
    </layout>
</template>

<script>
    import ScreenPromotionsDetailsMixin from '_screen_promotions_details_mixin'

    export default {
        name: 'screen-promotions-details',
        mixins: [
            ScreenPromotionsDetailsMixin
        ]
    }
</script>

<style scoped>

</style>
