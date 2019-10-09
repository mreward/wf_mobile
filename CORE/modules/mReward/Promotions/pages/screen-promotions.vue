<template>
    <layout
        :layout="layout"
    >
        <template v-if="partnerPromotions.length && !loading">
            <pull-to-wrapper
                :update-action="updatePromotions"
            >
                <div class="grid--masonry">
                    <product-card
                        :item="item"
                        v-for="(item, index) in partnerPromotions"
                        :key="index"
                        @click.native="goToPromotionsDetails(item)"
                    />
                </div>
            </pull-to-wrapper>
        </template>

        <v-progress-circular
            v-else-if="loading"
            :width="7"
            :size="70"
            indeterminate
        />

        <not-found-items
            v-else
            :message="$t('m_promotions_not_found_promotions')"
        >
            <pull-to-wrapper
                :update-action="updatePromotions"
            >
            </pull-to-wrapper>
        </not-found-items>
    </layout>
</template>

<script>
    import ScreenPromotionsMixin from '_screen_promotions_mixin'

    export default {
        name: 'screen-promotions',
        mixins: [
            ScreenPromotionsMixin
        ]
    }
</script>
