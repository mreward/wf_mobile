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


            <template v-if="addressYou">
                <v-subheader>{{ addressYou.name }}</v-subheader>
                <v-list-item-group
                        v-model="profile.address_you"
                        :color="listBackgroundAnimationColor"
                >
                    <v-list-item
                            v-for="(item, i) in addressYou.items"
                            :key="i"
                            @click="saveAddressYou(item.id)"
                    >
                        <v-list-item-content>
                            <v-list-item-title v-html="item.value"></v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-icon v-if="item.id == profile.address_you">
                            <i class="icon-checkmark"></i>
                        </v-list-item-icon>
                    </v-list-item>
                </v-list-item-group>
            </template>
        </v-list>
    </layout>
</template>


<script>
    import ScreenSettingsMixin from '_screen_settings_mixin'
// data_type:2
//     field_type:1
//     hint:"Enter your password. Minimum 6 characters."
//     items:Array[3]
//     0:Object
//     1:Object
//     2:Object
//     key:"address_you"
//     name:"Как к вам обращаться?"
//     required:0
//     sort:2
    export default {
        name: 'screen-settings',
        mixins: [ScreenSettingsMixin]
    }
</script>
