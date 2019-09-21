<template>
    <layout
        page="profile"
        layout="tab-cover"
        :cover="profile.is_avatar_uploaded ? profile.avatar : ImgDownloadPhoto"
        :mobile="formattedMobile"
        :full-name="fullName"
        @clickBackgroundEvent="selectAvatar"
    >
        <div class="cover__content">
            <div class="page__background--text">
                <div class="page__background--text-title">
                    {{ fullName }}
                </div>
                <div class="page__background--text-sub">
                    {{ formattedMobile }}
                </div>
                <v-btn
                    fab
                    class="v-btn--edit"
                    @click="goToEditProfile"
                >
                    <i class="icon-edit"></i>
                </v-btn>
            </div>
            <v-list
                v-if="profileData.length"
                :two-line="true"
                :disabled="true"
                class="profile-list"
            >
                <v-list-item-group v-model="profileData.length">
                    <v-list-item
                        v-for="(item, i) in profileData"
                        :key="i"
                    >
                        <v-list-item-content>
                            <v-list-item-title v-html="item.title"></v-list-item-title>
                            <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>

            <v-btn
                v-else
                color="secondary"
                block
                class="v-btn--third v-btn--secondary"
                :disabled="!profile.mobile"
                @click="goToEditProfile"
            >
                {{ $t('m_profile_edit_profile') }}
                <i class="icon-next-page"></i>
            </v-btn>

            <v-btn
                color="secondary"
                block
                class="margin-top--small-base v-btn--third v-btn--secondary"
                @click="goToPage('settings')"
            >
                {{ $t('m_profile_settings') }}
                <i class="icon-next-page"></i>
            </v-btn>
            <v-btn
                color="secondary"
                block
                class="margin-top--small-base v-btn--third v-btn--secondary"
                @click="goToPage('contacts')"
            >
                {{ $t('m_profile_contacts') }}
                <i class="icon-next-page"></i>
            </v-btn>

            <v-btn
                color="secondary"
                block
                class="margin-top--small-base v-btn--third v-btn--secondary"
                @click="openProtocol(settings.termsUrl)"
            >
                {{ $t('m_profile_terms_loyalty') }}
            </v-btn>
        </div>

    </layout>
</template>

<script>
    import ScreenProfileMixin from '_tab_profile_mixin'
    import MixinOpenProtocol from '_CORE/mixins/common/open-protocol'

    export default {
        name: 'screen-profile-tab',
        mixins: [
            ScreenProfileMixin,
            MixinOpenProtocol
        ]
    }
</script>
