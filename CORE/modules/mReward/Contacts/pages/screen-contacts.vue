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
                        v-for="(item, index) in general"
                        :key="index"
                        class="list-item"
                        @click="item.click()"
                >
                    <div class="left list-item__left list-item__icon">
                        <img
                                :src="item.img"
                                alt=""
                        >
                    </div>
                    <div class="center list-item__center">
                        {{ item.name }}
                    </div>
                </div>
            </div>
        </div>

<!--        <div class="main-website" @click="goToSite">-->
<!--            <span>www.kulikov.com</span>-->
<!--        </div>-->
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
                testData: [
                    {
                        'partner_id': 0,
                        'partner_name': 'General',
                        'general': 1,
                        code: '',
                        'contacts': [
                            {
                                'type_contact': 'website',
                                'name_contact': 'Online chat',
                                'text_contact': 'https://bitrix.kulikov.com/online/contact-centr',
                                'image_url_origin': 'https://storage-devkdk.kulikov.com/storage/partner_contact/0/1/1/1_origin_1.png',
                                'image_url_800_600': 'https://storage-devkdk.kulikov.com/storage/partner_contact/0/1/1/1_main_1.png',
                                'image_url_300_300': 'https://storage-devkdk.kulikov.com/storage/partner_contact/0/1/1/1_mobile_1.png',
                                'image_url_100_80': 'https://storage-devkdk.kulikov.com/storage/partner_contact/0/1/1/1_thumbnail_1.png',
                                'image_url_40_40': 'https://storage-devkdk.kulikov.com/storage/partner_contact/0/1/1/1_icon_1.png',
                            }, {
                                'type_contact': 'instagram',
                                'name_contact': 'Insta',
                                'text_contact': 'kulikov_kg',
                                'image_url_origin': 'https://storage-devkdk.kulikov.com/storage/partner_contact/0/1/1/1_origin_1.png',
                                'image_url_800_600': 'https://storage-devkdk.kulikov.com/storage/partner_contact/0/1/1/1_main_1.png',
                                'image_url_300_300': 'https://storage-devkdk.kulikov.com/storage/partner_contact/0/1/1/1_mobile_1.png',
                                'image_url_100_80': 'https://storage-devkdk.kulikov.com/storage/partner_contact/0/1/1/1_thumbnail_1.png',
                                'image_url_40_40': 'https://storage-devkdk.kulikov.com/storage/partner_contact/0/1/1/1_icon_1.png',
                            },{
                                'type_contact': 'email',
                                'name_contact': 'Insta',
                                'text_contact': 'service@kulikov.com',
                                'image_url_origin': 'https://storage-devkdk.kulikov.com/storage/partner_contact/0/1/1/1_origin_1.png',
                                'image_url_800_600': 'https://storage-devkdk.kulikov.com/storage/partner_contact/0/1/1/1_main_1.png',
                                'image_url_300_300': 'https://storage-devkdk.kulikov.com/storage/partner_contact/0/1/1/1_mobile_1.png',
                                'image_url_100_80': 'https://storage-devkdk.kulikov.com/storage/partner_contact/0/1/1/1_thumbnail_1.png',
                                'image_url_40_40': 'https://storage-devkdk.kulikov.com/storage/partner_contact/0/1/1/1_icon_1.png',
                            }],
                    },
                    {
                        'partner_id': 1,
                        'partner_name': 'Куликовский Кыргызстан',
                        'general': 0,
                        code: 'KG',
                        'contacts': [
                            {
                                'type_contact': 'website',
                                'name_contact': 'Online chat',
                                'text_contact': 'https://bitrix.kulikov.com/online/contact-centr',
                                'image_url_origin': 'https://storage-devkdk.kulikov.com/storage/partner_contact/0/1/1/1_origin_1.png',
                                'image_url_800_600': 'https://storage-devkdk.kulikov.com/storage/partner_contact/0/1/1/1_main_1.png',
                                'image_url_300_300': 'https://storage-devkdk.kulikov.com/storage/partner_contact/0/1/1/1_mobile_1.png',
                                'image_url_100_80': 'https://storage-devkdk.kulikov.com/storage/partner_contact/0/1/1/1_thumbnail_1.png',
                                'image_url_40_40': 'https://storage-devkdk.kulikov.com/storage/partner_contact/0/1/1/1_icon_1.png',
                            }, {
                                'type_contact': 'instagram',
                                'name_contact': 'Insta',
                                'text_contact': 'kulikov_kg',
                                'image_url_origin': 'https://storage-devkdk.kulikov.com/storage/partner_contact/0/1/1/1_origin_1.png',
                                'image_url_800_600': 'https://storage-devkdk.kulikov.com/storage/partner_contact/0/1/1/1_main_1.png',
                                'image_url_300_300': 'https://storage-devkdk.kulikov.com/storage/partner_contact/0/1/1/1_mobile_1.png',
                                'image_url_100_80': 'https://storage-devkdk.kulikov.com/storage/partner_contact/0/1/1/1_thumbnail_1.png',
                                'image_url_40_40': 'https://storage-devkdk.kulikov.com/storage/partner_contact/0/1/1/1_icon_1.png',
                            },{
                                'type_contact': 'email',
                                'name_contact': 'Insta',
                                'text_contact': 'service@kulikov.com',
                                'image_url_origin': 'https://storage-devkdk.kulikov.com/storage/partner_contact/0/1/1/1_origin_1.png',
                                'image_url_800_600': 'https://storage-devkdk.kulikov.com/storage/partner_contact/0/1/1/1_main_1.png',
                                'image_url_300_300': 'https://storage-devkdk.kulikov.com/storage/partner_contact/0/1/1/1_mobile_1.png',
                                'image_url_100_80': 'https://storage-devkdk.kulikov.com/storage/partner_contact/0/1/1/1_thumbnail_1.png',
                                'image_url_40_40': 'https://storage-devkdk.kulikov.com/storage/partner_contact/0/1/1/1_icon_1.png',
                            }],
                    },
                    {
                        'partner_id': 3,
                        'partner_name': 'Куликовский Россия',
                        'general': 0,
                        code: 'RU',
                        'contacts': [
                            {
                                'name_contact': 'Tel',
                                'text_contact': '+78382021029',
                                'image_url_origin': 'https://storage-devkdk.kulikov.com/storage/placeholder.jpg',
                                'image_url_800_600': 'https://storage-devkdk.kulikov.com/storage/placeholder.jpg',
                                'image_url_300_300': 'https://storage-devkdk.kulikov.com/storage/placeholder.jpg',
                                'image_url_100_80': 'https://storage-devkdk.kulikov.com/storage/placeholder.jpg',
                                'image_url_40_40': 'https://storage-devkdk.kulikov.com/storage/placeholder.jpg',
                            }],
                    },
                    {
                        'partner_id': 2,
                        'partner_name': 'Куликовский Казахстан',
                        'general': 0,
                        code: 'KZ',
                        'contacts': [
                            {
                                'name_contact': 'Tel',
                                'text_contact': '+77273647777',
                                'image_url_origin': 'https://storage-devkdk.kulikov.com/storage/placeholder.jpg',
                                'image_url_800_600': 'https://storage-devkdk.kulikov.com/storage/placeholder.jpg',
                                'image_url_300_300': 'https://storage-devkdk.kulikov.com/storage/placeholder.jpg',
                                'image_url_100_80': 'https://storage-devkdk.kulikov.com/storage/placeholder.jpg',
                                'image_url_40_40': 'https://storage-devkdk.kulikov.com/storage/placeholder.jpg',
                            }],
                    }],
            }
        },
        computed: {
            ...mapGetters({
                settings: constants.App.Getters.settings,
                countries: constants.MrewardGeo.Getters.countries,
                contactsList: constants.MrewardContacts.Getters.contacts
            }),
            contacts() {
                // const contacts = this.settings.contacts
                const $this = this

                const list = []

                this.contactsList.forEach((item) => {
                    if (item.partner_id !== 0) {
                        const country = this.countries.find(i => i.code === item.code)

                        if (country) {
                            list.push({
                                name: item.partner_name,
                                flag: country.flag,
                                list: item.contacts.map(contact => {
                                    return {
                                        name: contact.name_contact,
                                        value: contact.text_contact,
                                        img: contact.image_url_300_300,
                                        click: () => {
                                            switch (contact.type_contact) {
                                                case 'phone':
                                                    $this.openProtocol(contact.text_contact, 'tel')
                                                    break
                                                case 'email':
                                                    $this.openProtocol(contact.text_contact, 'email')
                                                    break
                                                case 'telegram':
                                                case 'whatsapp':
                                                case 'instagram':
                                                    $this.openMessenger(contact.type_contact, contact.text_contact)
                                                    break
                                                default:
                                                    $this.openProtocol(contact.text_contact)
                                                    break
                                            }
                                        }
                                    }
                                })
                            })
                        }
                    }
                })

                return list
            },

            general() {
                const data = this.contactsList.find((item) => item.partner_id === 0);
                const $this = this

                if(data) {
                    return data.contacts.map(contact => {
                        return {
                            name: contact.name_contact,
                            value: contact.text_contact,
                            img: contact.image_url_300_300,
                            click: () => {
                                switch (contact.type_contact) {
                                    case 'phone':
                                        $this.openProtocol(contact.text_contact, 'tel')
                                        break
                                    case 'email':
                                        $this.openProtocol(contact.text_contact, 'email')
                                        break
                                    case 'telegram':
                                    case 'whatsapp':
                                    case 'instagram':
                                        $this.openMessenger(contact.type_contact, contact.text_contact)
                                        break
                                    default:
                                        $this.openProtocol(contact.text_contact)
                                        break
                                }
                            }
                        }
                    })
                }
                return [];
            }
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
        mounted() {
            window.StatusBar && window.StatusBar.styleDefault();
        },
        beforeDestroy() {
            // window.StatusBar && window.StatusBar.styleLightContent();
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
