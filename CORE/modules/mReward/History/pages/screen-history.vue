<template>
    <layout
        :title="$t('m_history')"
        page="history"
    >

        <history-header />

        <div>
            <template
                v-for="(el, key) in historyList"
            >
                <div
                    class="card card--default"
                    :key="key"
                    v-if="Array.isArray(el)"
                >
                    <v-ons-list class="list--vertical list--indentation">
                        <history-item
                            v-for="(item, index) in el"
                            :key="index"
                            :item="item"
                            @click.native="goToHistoryDetails(item)"
                        />
                    </v-ons-list>
                </div>
                <div
                    v-if="el.type === 'header'"
                    v-text="el.date"
                    :key="key"
                    class="row--text"
                />
            </template>
        </div>
    </layout>
</template>

<script>
    import HistoryItem from '_history_item'
    import HistoryHeader from '_history_header'
    import ScreenHistoryMixin from '_screen_history_mixin'

    export default {
        name: 'screen-history',
        components: {
            HistoryItem,
            HistoryHeader
        },
        mixins: [
            ScreenHistoryMixin
        ]
    }
</script>
