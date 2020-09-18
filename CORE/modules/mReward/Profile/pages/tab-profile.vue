<template>
    <v-ons-page
            v-status-bar-fill
            shown
            :page="'profile'"
            class="layout-tab"
    >
        <div class="page__background">
            <div ref="pageBackground"
                 class="page-background">
                <div
                        class="page__background--cover"
                        :style="{
                        backgroundImage: `url(${profile.is_avatar_uploaded ? profile.avatar : ImgDownloadPhoto})`,
                    }"
                        @click="selectAvatar"
                />
            </div>
        </div>
        <div class="page__content page__layout">
            <div class="page-background"
                 @click="selectAvatar">
            </div>
            <v-btn
                    fab
                    class="v-btn--edit toolbar__back-button"
                    @click="popPage"
            >
                <i class="icon-back"/>
            </v-btn>

            <div class="content-profile"
                 ref="content">
                <v-list
                        v-if="profileData.length"
                        :two-line="true"
                        :disabled="true"
                        class="profile-list"
                >

                    <v-list-item-group v-model="profileData.length">
                        <v-list-item class="profile-name">
                            <v-list-item-content>
                                <v-list-item-title v-html="userName"/>
                                <v-list-item-subtitle v-html="formattedMobile"/>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item
                                v-for="(item, i) in profileData"
                                :key="i"
                        >
                            <v-list-item-content>
                                <v-list-item-title v-html="item.title"/>
                                <v-list-item-subtitle>
                                <span>
                                    <span v-if="item.type === 'city'">
                                        {{$t(`country_${(country.code || '').toLowerCase()}`)}},
                                    </span>
                                    {{item.subtitle}}
                                </span>
                                    <img v-if="item.type === 'city'"
                                         class="flag"
                                         :src="country.flag"
                                         alt="">
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>

                    <v-btn
                            fab
                            class="v-btn--edit"
                            @click="goToEditProfile()"
                    >
                        <i class="icon-edit"/>
                    </v-btn>
                </v-list>

                <v-btn
                        v-else
                        color="secondary"
                        block
                        class="v-btn--third v-btn--secondary"
                        :disabled="!profile.mobile"
                        @click="goToEditProfile()"
                >
                    {{ $t('m_profile_edit_profile') }}
                    <i class="icon-next-page"/>
                </v-btn>

                <v-btn
                        color="secondary"
                        block
                        class="margin-top--small-base v-btn--third v-btn--secondary"
                        @click="goToPage('history')"
                >
                    {{ $t('m_dashboard_latest_charges') }}
                    <i class="icon-next-page"/>
                </v-btn>

                <v-btn
                        color="secondary"
                        block
                        class="margin-top--small-base v-btn--third v-btn--secondary"
                        @click="goToPage('contacts')"
                >
                    {{ $t('m_profile_contacts') }}
                    <i class="icon-next-page"/>
                </v-btn>

                <v-btn
                        color="secondary"
                        block
                        class="margin-top--small-base v-btn--third v-btn--secondary"
                        @click="goToPage('settings')"
                >
                    {{ $t('m_profile_settings') }}
                    <i class="icon-next-page"/>
                </v-btn>

                <v-btn
                        color="secondary"
                        block
                        class="margin-top--small-base v-btn--third v-btn--secondary"
                        @click="goToPage('orders')"
                >
                    {{ $t('m_profile_orders') }}
                    <i class="icon-next-page"/>
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
        </div>
    </v-ons-page>
</template>

<script>
    import ScreenProfileMixin from '_tab_profile_mixin'
    import MixinOpenProtocol from '_CORE/mixins/common/open-protocol'

    export default {
        name: 'screen-profile-tab',
        mixins: [
            ScreenProfileMixin,
            MixinOpenProtocol,
        ],
    }
</script>

<style scoped
       lang="scss">
    .flag {
        position: absolute;
        right: 16px;
        height: 20px;
    }
</style>
