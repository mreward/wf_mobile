<template>
    <layout
        layout="default"
        :title="$t('m_profile_contacts')"
        page="contacts"
    >
        <div class="contacts-wrapper">

            <v-ons-list
                    v-for="(item, index) in contacts"
                    :key="index"
                    class="dropdown-list"
            >
                <v-ons-list-item
                        ref="dropdownList"
                        class="dropdown-list__item"
                        expandable
                >
                    <div class="center">
                        <img class="flag" v-show="item.flag" :src="item.flag" alt="">
                        {{ item.name }}
                    </div>
                    <div class="dropdown-list__content expandable-content">
                        <div
                                v-for="(listItem, indexItem) in item.list"
                                :key="indexItem"
                                class="contacts-info"
                                @click="listItem.click"
                        >
                            <div class="contacts-info-sub">
                                <span class="contacts-subtitle">{{ listItem.name }}</span>
                                <div>
                                    <span class="contacts-lined-info">{{ listItem.value }}</span>
                                    <span v-if="listItem.subtitle"
                                          class="contacts-work-ours"> {{ listItem.subtitle }}</span>
                                </div>
                            </div>
                            <div class="contacts-icon">
                                <v-btn
                                        fab
                                >
                                    <i v-if="listItem.icon" :class="listItem.icon" />
                                    <img
                                            v-if="listItem.img"
                                            :src="listItem.img"
                                            alt=""
                                    >
                                </v-btn>
                            </div>
                        </div>
                    </div>
                </v-ons-list-item>
            </v-ons-list>
        </div>





        <div class="contacts-bottom">
            <div class="header-contacts">
                <span>{{$t('m_contact_us')}}</span>
            </div>
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
            </div>
            <div class="list list--card">
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

                <div
                        style="visibility: hidden"
                        class="list-item"
                >

                </div>
            </div>
        </div>

        <div class="main-website" @click="goToSite">
            <span>www.kulikov.com</span>
        </div>
    </layout>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
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
                imgOnlineChat,
            }
        },
        computed: {
            ...mapGetters({
                settings: constants.App.Getters.settings,
                countries: constants.MrewardGeo.Getters.countries,
                contactsList: constants.MrewardContacts.Getters.contacts
            }),
            contacts() {
                const contacts = this.settings.contacts;
                const $this = this;

                const flagKG = this.countries.find(i => i.code === 'KG');
                const flagKZ = this.countries.find(i => i.code === 'KZ');
                const flagRU = this.countries.find(i => i.code === 'RU');

                return [
                    {
                        name: this.$t('m_contacts_kurguzstan'),
                        flag: flagKG ? flagKG.flag : '',
                        list: [
                            {
                                name: this.$t('m_contacts_email'),
                                value: contacts.country_1.email,
                                icon: 'icon-email',
                                click: () => {
                                    $this.openProtocol(contacts.country_1.email, 'email')
                                },
                            }, {
                                name: this.$t('m_contacts_phone'),
                                subtitle: this.$t('m_contacts_work_hours'),
                                value: contacts.country_1.phone,
                                icon: 'icon-phone',
                                click: () => {
                                    $this.openProtocol(contacts.country_1.phone, 'tel')
                                },
                            }, {
                                name: this.$t('m_contacts_instagram'),
                                value: contacts.country_1.instagram,
                                img: $this.imgInstagram,
                                click: () => {
                                    $this.openMessenger('instagram', contacts.country_1.instagram)
                                },
                            }],
                    },
                    {
                        name: this.$t('m_contacts_kazahstan'),
                        flag: flagKZ ? flagKZ.flag : '',
                        list: [
                           {
                                name: this.$t('m_contacts_phone'),
                                subtitle: this.$t('m_contacts_work_hours'),
                                value: contacts.country_2.phone,
                                icon: 'icon-phone',
                                click: () => {
                                    $this.openProtocol(contacts.country_2.phone, 'tel')
                                },
                            }, {
                                name: this.$t('m_contacts_instagram'),
                                value: contacts.country_2.instagram,
                                img: $this.imgInstagram,
                                click: () => {
                                    $this.openMessenger('instagram', contacts.country_2.instagram)
                                },
                            },  {
                                name: this.$t('m_contacts_site'),
                                value: contacts.site,
                                icon: 'icon-web',
                                click: () => {
                                    $this.openProtocol(contacts.site)
                                },
                            },
                        ],
                    },{
                        name: this.$t('m_contacts_russia'),
                        flag: flagRU ? flagRU.flag : '',
                        list: [
                            {
                                name: this.$t('m_contacts_phone'),
                                subtitle: this.$t('m_contacts_work_hours_9_22'),
                                value: contacts.country_3.phone,
                                icon: 'icon-phone',
                                click: () => {
                                    $this.openProtocol(contacts.country_3.phone, 'tel')
                                },
                            }, {
                                name: this.$t('m_contacts_instagram'),
                                value: contacts.country_3.instagram,
                                img: $this.imgInstagram,
                                click: () => {
                                    $this.openMessenger('instagram', contacts.country_3.instagram)
                                },
                            },
                        ],
                    },
                ]
            },

        },
        async created() {
            try {
                if (!this.countries.length) {
                    await this.getCountries()
                }

                await this.getContacts()

            } catch (e) {
                this.$Alert.Error(e)
            }
        },
        methods: {
            ...mapActions({
                getCountries: constants.MrewardGeo.Actions.getCountries,
                getContacts: constants.MrewardContacts.Actions.getContacts
            }),
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
            },
            goToSite() {
                window.open('https://kulikov.com', '_system')
            }
        }
    }
</script>

<style scoped>

</style>
