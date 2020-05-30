<template>
    <layout
        page="profile"
        layout="tab-cover"
        :cover="profile.is_avatar_uploaded ? profile.avatar : ImgDownloadPhoto"
        :content-height="profileDataLength"
        @clickBackgroundEvent="selectAvatar"
    >
        <!-- dont remove this div, need for page scroll -->

        <div>
            <v-list
                v-if="profileData.length"
                :two-line="true"
                :disabled="true"
                class="profile-list"
            >

                <v-list-item-group v-model="profileData.length">
                    <v-list-item class="profile-name">
                        <v-list-item-content>
                            <v-list-item-title v-html="userName" />
                            <v-list-item-subtitle v-html="formattedMobile" />
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item
                        v-for="(item, i) in profileData"
                        :key="i"
                    >
                        <v-list-item-content>
                            <v-list-item-title v-html="item.title" />
                            <v-list-item-subtitle v-html="item.subtitle" />
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>

                <v-btn
                    fab
                    class="v-btn--edit"
                    @click="goToEditProfile"
                >
                    <i class="icon-edit" />
                </v-btn>
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
                <i class="icon-next-page" />
            </v-btn>

            <v-btn
                    color="secondary"
                    block
                    class="margin-top--small-base v-btn--third v-btn--secondary"
                    @click="goToPage('history')"
            >
                {{ $t('m_dashboard_latest_charges') }}
                <i class="icon-next-page" />
            </v-btn>

            <v-btn
                color="secondary"
                block
                class="margin-top--small-base v-btn--third v-btn--secondary"
                @click="goToPage('contacts')"
            >
                {{ $t('m_profile_contacts') }}
                <i class="icon-next-page" />
            </v-btn>

            <v-btn
                    color="secondary"
                    block
                    class="margin-top--small-base v-btn--third v-btn--secondary"
                    @click="goToPage('settings')"
            >
                {{ $t('m_profile_settings') }}
                <i class="icon-next-page" />
            </v-btn>

            <v-btn
                    color="secondary"
                    block
                    class="margin-top--small-base v-btn--third v-btn--secondary"
                    @click="goToRecoveryPassword"
            >
                {{ $t('m_profile_change_password') }}
            </v-btn>

            <v-btn
                color="secondary"
                block
                class="margin-top--small-base v-btn--third v-btn--secondary"
                @click="openProtocol(settings.termsUrl)"
            >
                {{ $t('m_profile_terms_loyalty') }}
            </v-btn>

            <v-btn
                color="secondary"
                block
                class="margin-top--small-base v-btn--third v-btn--secondary"
                @click="logoutUserAction"
            >
                {{ $t('m_profile_logout') }}
            </v-btn>

            <div class="profile--min-text">
                {{ $t('m_profile_version') }} {{ `${settings.version}.${settings.versionCode}` }}
            </div>
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
