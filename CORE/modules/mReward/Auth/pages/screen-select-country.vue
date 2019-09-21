<template>
    <layout
        layout="auth"
        button-left="back"
        icon-left="arrow"
        :title="$t('m_auth_select_country')"
    >
        <v-list
            :flat="true"
            class="country-list"
        >
            <v-list-item-group
                v-model="countryIndex"
                color="primary"
            >
                <v-list-item
                    v-for="(item, i) in countries"
                    :key="i"
                >
                    <v-list-item-content>
                        <img class="flag" :src="item.flag" alt="">
                        <v-list-item-title>

                            {{ item.country_name }} ({{ item.phone_code }})
                            <v-ons-icon
                                v-if="i === countryIndex"
                                icon="checkmark"
                            />
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </layout>
</template>

<script>
    import MixinScreenSelectCountry from '_mixin_screen_select_country'

    export default {
        name: 'screen-select-country',
        mixins: [MixinScreenSelectCountry]
    }
</script>
