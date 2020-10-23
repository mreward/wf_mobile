<template>
    <layout
        page="city"
    >
        <toolbar
            slot="toolbar"
            button-left="back"
            icon-left="arrow"
            :button-right="cancelFind"
            :label-right="$t('m_auth_cancel')"
        >
            <v-text-field
                ref="search"
                solo
                slot="title"
                :label="$t('m_auth_search_city')"
                class="input--search"
                hide-details
                prepend-inner-icon="icon-search"
                v-model="search"
            ></v-text-field>
        </toolbar>

        <v-list
            :flat="true"
            v-if="search.length"
        >
            <v-list-item-group
                v-model="cityIndex"
                color="primary"
                class="list--feature"
            >
                <v-list-item
                    v-for="(item, i) in cities"
                    :key="i"
                    class="padding-horizontal--none"
                >
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ item.city_name }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </layout>
</template>

<script>
    import MixinScreenSelectCity from '_mixin_screen_select_city'

    export default {
        name: 'screen-select-city',
        mixins: [MixinScreenSelectCity]
    }
</script>
