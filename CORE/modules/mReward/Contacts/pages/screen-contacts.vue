<template>
    <layout
        layout="default"
        :title="$t('m_profile_contacts')"
        page="contacts"
    >
        <div class="contacts-wrapper">
            <div class="contacts-title">
                {{ $t('m_contacts_kurguzstan') }}
            </div>
            <div
                class="contacts-info"
                @click="openProtocol(contacts.country_1.email, 'email')"
            >
                <div class="contacts-info-sub">
                    <span class="contacts-subtitle">{{ $t('m_contacts_email') }}</span>
                    <span class="contacts-lined-info">{{ contacts.country_1.email }}</span>
                </div>
                <div class="contacts-icon">
                    <v-btn
                        fab
                    >
                        <i class="icon-email" />
                    </v-btn>
                </div>
            </div>
            <div
                class="contacts-info"
                @click="openProtocol(contacts.country_1.phone, 'tel')"
            >
                <div class="contacts-info-sub">
                    <span class="contacts-subtitle">{{ $t('m_contacts_phone') }}</span>
                    <div>
                        <span class="contacts-lined-info">{{ contacts.country_1.phone }}</span>
                        <span class="contacts-work-ours"> {{ $t('m_contacts_work_hours') }}</span>
                    </div>
                </div>
                <div class="contacts-icon">
                    <v-btn
                        fab
                    >
                        <i class="icon-phone" />
                    </v-btn>
                </div>
            </div>
            <div
                class="contacts-info"
                @click="openMessenger('instagram', contacts.country_1.instagram )"
            >
                <div class="contacts-info-sub padding-bottom">
                    <span class="contacts-subtitle">{{ $t('m_contacts_instagram') }}</span>
                    <span class="contacts-lined-info contacts-link">@{{ contacts.country_1.instagram }}</span>
                </div>
                <div class="contacts-icon">
                    <img
                        :src="imgInstagram"
                        alt=""
                    >
                </div>
            </div>

            <div class="contacts-title">
                {{ $t('m_contacts_kazahstan') }}
            </div>
            <div
                class="contacts-info"
                @click="openProtocol(contacts.country_2.phone, 'tel')"
            >
                <div class="contacts-info-sub">
                    <span class="contacts-subtitle">{{ $t('m_contacts_phone') }}</span>
                    <div>
                        <span class="contacts-lined-info">{{ contacts.country_2.phone }}</span>
                        <span class="contacts-work-ours"> {{ $t('m_contacts_work_hours') }}</span>
                    </div>
                </div>
                <div class="contacts-icon">
                    <v-btn
                        fab
                    >
                        <i class="icon-phone" />
                    </v-btn>
                </div>
            </div>
            <div
                class="contacts-info"
                @click="openMessenger('instagram', contacts.country_2.instagram )"
            >
                <div class="contacts-info-sub padding-bottom">
                    <span class="contacts-subtitle">{{ $t('m_contacts_instagram') }}</span>
                    <span class="contacts-lined-info contacts-link">@{{ contacts.country_2.instagram }}</span>
                </div>
                <div class="contacts-icon">
                    <img
                        :src="imgInstagram"
                        alt=""
                    >
                </div>
            </div>
        </div>
        <div class="contacts-bottom">
            <div class="list list--card">
                <div
                    class="list-item"
                    @click="openMessenger('telegram', contacts.telegram )"
                >
                    <div class="left list-item__left list-item__icon">
                        <img
                            :src="imgTelegram"
                            alt=""
                        >
                    </div>
                    <div class="center list-item__center">
                        {{ $t('m_contacts_telegram') }}
                    </div>
                </div>
                <div
                    class="list-item"
                    @click="openMessenger('whatsapp', contacts.whatsapp )"
                >
                    <div class="left list-item__left list-item__icon">
                        <img
                            :src="imgWhatsapp"
                            alt=""
                        >
                    </div>
                    <div class="center list-item__center">
                        {{ $t('m_contacts_whatsapp') }}
                    </div>
                </div>
                <div
                    class="list-item"
                    @click="openProtocol(contacts.onlinechat)"
                >
                    <div class="left list-item__left list-item__icon">
                        <img
                            :src="imgOnlineChat"
                            alt=""
                        >
                    </div>
                    <div class="center list-item__center">
                        {{ $t('m_contacts_online_chat') }}
                    </div>
                </div>
            </div>
        </div>
    </layout>
</template>

<script>
    import { mapGetters } from 'vuex'
    import constants from '_vuex_constants'
    import imgInstagram from '_CORE/img/mreward/instagram.svg'
    import imgTelegram from '_CORE/img/mreward/telegram.svg'
    import imgWhatsapp from '_CORE/img/mreward/whatsapp.svg'
    import imgOnlineChat from '_CORE/img/mreward/online-chat.svg'
    import MixinOpenProtocol from '_CORE/mixins/common/open-protocol'
    import Messengers from '_PLUGINS/common/Messengers'
    export default {
        name: 'screen-contacts',
        mixins: [
            MixinOpenProtocol
        ],
        data() {
            return {
                imgInstagram,
                imgTelegram,
                imgWhatsapp,
                imgOnlineChat
            }
        },
        computed: {
            ...mapGetters({
                settings: constants.App.Getters.settings
            }),
            contacts() {
                return this.settings.contacts
            }
        },
        methods: {
            openMessenger(messenger, account) {
                switch (messenger) {
                    case 'telegram':
                        Messengers.OpenTelegram(account)
                        break
                    case 'whatsapp':
                        Messengers.OpenWhatsApp(account)
                        break
                    case 'instagram':
                        Messengers.OpenInstagram(account)
                        break
                    default:
                        break
                }
            }
        }
    }
</script>

<style scoped>

</style>
