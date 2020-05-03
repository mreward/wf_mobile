<template>
    <layout
        :title="$t('m_profile_settings')"
        page="settings"
    >
        <v-list
            flat
            class="muted-list"
        >
            <v-subheader>{{ $t('m_profile_language') }}</v-subheader>
            <v-list-item-group
                v-model="languagesList.length"
                :color="listBackgroundAnimationColor"
            >
                <v-list-item
                    v-for="(item, i) in languagesList"
                    :key="i"
                    @click="selectLanguage(item.lang)"
                >
                    <v-list-item-content>
                        <v-list-item-title v-html="item.label"></v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon v-if="item.lang === selectedLanguage">
                        <i class="icon-checkmark"></i>
                    </v-list-item-icon>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </layout>
</template>

<script>
    import ScreenSettingsMixin from '_screen_settings_mixin'

    export default {
        name: 'screen-settings',
        mixins: [ScreenSettingsMixin]
    }
</script>
