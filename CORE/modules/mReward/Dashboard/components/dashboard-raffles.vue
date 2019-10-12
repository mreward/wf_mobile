<template>
    <div>
        <title-row
            :action="true ? $t('m_dashboard_all') : ''"
            :title="$t('m_dashboard_raffles')"
            @click="$bus.$emit('home:goToTab', 'screen-interesting-tab')"
        />

        <div
            class="card-container--raffles"
            v-if="promoItems.length && !loading"
        >
            <div>

            </div>
        </div>
    </div>
</template>

<script>
    import TitleRow from '_title_row'

    export default {
        name: 'dashboard-raffles',
        components: {
            TitleRow
        }
    }
</script>

<style scoped>

</style>
