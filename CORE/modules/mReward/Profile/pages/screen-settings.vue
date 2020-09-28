<template>
    <layout
        :title="$t('m_profile_settings')"
        page="settings"
    >

        <div class="header-contacts">
            <span>{{ $t('m_profile_language') }}</span>
        </div>
        <v-ons-list class="dropdown-list">
            <v-ons-list-item
                    ref="dropdownList"
                    class="dropdown-list__item"
                    expandable
            >
                <div class="center">
                    {{currentLang.label}}
                </div>
                <div class="dropdown-list__content expandable-content">
                    <div
                            v-for="(item, i) in languagesList"
                            :key="i"
                            class="contacts-info"
                            @click="selectLanguage(item.lang)"
                    >
                        <div class="contacts-info-sub">
                            <span class="contacts-subtitle">{{ item.label }}</span>
                        </div>
                        <div class="contacts-icon">
                            <v-list-item-icon v-if="item.lang === selectedLanguage">
                                <i class="icon-checkmark"></i>
                            </v-list-item-icon>
                        </div>
                    </div>
                </div>
            </v-ons-list-item>
        </v-ons-list>

        <template v-if="addressYou">
            <div class="header-contacts">
                <span>{{ addressYou.name }}</span>
            </div>
            <v-ons-list class="dropdown-list">
                <v-ons-list-item
                        ref="dropdownList"
                        class="dropdown-list__item"
                        expandable
                >
                    <div class="center">
                        {{currentAddressYou.value}}
                    </div>
                    <div class="dropdown-list__content expandable-content">
                        <div
                                v-for="(item, i) in addressYou.items"
                                :key="i"
                                class="contacts-info"
                                @click="saveAddressYou(item.id)"
                        >
                            <div class="contacts-info-sub">
                                <span class="contacts-subtitle">{{ item.value }}</span>
                            </div>
                            <div class="contacts-icon">
                                <v-list-item-icon v-if="item.id == profile.address_you">
                                    <i class="icon-checkmark"></i>
                                </v-list-item-icon>
                            </div>
                        </div>
                    </div>
                </v-ons-list-item>
            </v-ons-list>
        </template>

        <template v-if="country.country_name">
            <div class="header-contacts">
                <span>{{ $t('m_shop_delivery_country') }}</span>
            </div>
            <v-ons-list class="dropdown-list">
                <v-ons-list-item
                        ref="dropdownList"
                        class="dropdown-list__item"
                        expandable
                >
                    <div class="center">
                        <img class="flag" :src="country.flag" alt="">
                        {{country.country_name}}
                    </div>
                    <div class="dropdown-list__content expandable-content">
                        <div
                                v-for="(item, i) in countries"
                                :key="i"
                                class="contacts-info"
                                @click="onSelectCountry(item)"
                        >
                            <div class="contacts-info-sub">
                                <img class="flag" :src="item.flag" alt="">
                                <span class="contacts-subtitle">{{ item.country_name }}</span>
                            </div>
                            <div class="contacts-icon">
                                <v-list-item-icon v-if="item.country_id === country.country_id">
                                    <i class="icon-checkmark"></i>
                                </v-list-item-icon>
                            </div>
                        </div>
                    </div>
                </v-ons-list-item>
            </v-ons-list>
        </template>

        <div class="header-contacts">
            <span>{{ $t('m_profile_security') }}</span>
        </div>

        <v-btn
                color="secondary"
                block
                class="margin-top--small-base v-btn--third v-btn--secondary"
        >
            <span class="icon-and-label">
                <i class="icon-pin-code"/>
                {{ $t('m_profile_use_pin') }}
            </span>
            <v-ons-switch
                    v-model="usePin"
            />
        </v-btn>

        <v-btn
                v-if="usePin && userConfig.pin"
                color="secondary"
                block
                class="margin-top--small-base v-btn--third v-btn--secondary"
        >
            <span v-if="$ons.platform.isIPhoneX()" class="icon-and-label">
                <i class="icon-face-id"/>
                {{ $t('m_profile_use_face_id') }}
            </span>
            <span v-else class="icon-and-label">
                <i class="icon-touch-id"/>
                {{ $t('m_profile_use_touch_id') }}
            </span>
            <v-ons-switch

                    v-model="useBiometric"
            />
        </v-btn>



        <v-btn
                v-if="usePin && !this.userConfig.pin"
                color="secondary"
                block
                class="margin-top--small-base v-btn--third v-btn--secondary"
                @click="goToCreatePin()"
        >
            {{ $t('m_profile_create_pin') }}

        </v-btn>

        <v-btn
                color="secondary"
                block
                class="margin-top--small-base v-btn--third v-btn--secondary"
                @click="goToRecoveryPassword()"
        >
            {{ $t('m_profile_change_password') }}

            <i class="icon-next-page"/>
        </v-btn>



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


<style lang="scss">
    .page[page="settings"] {
        .toolbar,
        .page__background {
            background: #F5F7FA;
        }

        .page__content {
            padding: 16px !important;
            padding-bottom: 32px !important;
        }

        .contacts-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-style: normal;
            font-weight: normal;
            font-size: 15px;
            line-height: 20px;
            letter-spacing: -0.24px;
            color: #000000;
            padding: 8px 0;

            .v-list-item__icon {
                margin: 0 !important;
                justify-content: center;
                align-items: center;

                i {
                    font-size: 14px;
                    color: #6D0978;
                }
            }
        }

        .header-contacts {
            padding-bottom: 0;
        }

        ons-list.dropdown-list.list {
            margin: 6px 0px 16px;

            img {
                width: 30px;
                height: 20px;
                max-width: 30px;
                margin-right: 12px;
            }
        }

        .contacts-info-sub {
            display: flex;
            align-items: center;
        }

        .dropdown-list__content {
            padding-top: 24px !important;
        }


        :checked + .switch__toggle > .switch__handle {
            left: 27px;
            box-shadow: unset;
        }

        .switch__handle {
            height: 20px;
            width: 20px;
            background-color: white;
            left: 4px;
            top: 4px;
            box-shadow: unset;
        }

        :checked + .switch__handle {
            left: 27px;
            top: 4px;
        }

        .switch__toggle {
            background: #CECED2;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
        }
        :checked + .switch__toggle {
            background-color: #6D0978;
            box-shadow: inset 0 0 0 2px #6D0978;
        }

        .v-btn--secondary {
            span.v-btn__content {
                display: flex;
                justify-content: space-between;
            }

            .icon-and-label i{
                font-size: 20px;
                color: #000;
                margin-right: 10px;
            }
        }

        .switch {
            height: 28px;
        }

        .v-btn--third i {
            position: unset !important;
        }
    }
</style>
