<template>
    <v-ons-page shown page="delivery">
        <div class="page__content">
            <div class="will-change--helper">
                <v-text-field
                        v-model="form.city.name"
                        readonly
                        :label="$t('m_auth_city', '', {required: ' '})"
                        type="text"
                        :error-messages="errorMessages['id_city']"
                        @focus="goToSelectCity"
                />

<!--                <v-text-field-->
<!--                        v-model="form.address"-->
<!--                        :label="$t('m_shop_address')"-->
<!--                        type="text"-->
<!--                        :error-messages="addressErrors"-->
<!--                        @input="$v.form.address.$touch()"-->
<!--                        @blur="$v.form.address.$touch()"-->
<!--                />-->

<!--                <v-select-->
<!--                        v-model="form.address"-->
<!--                        :items="address"-->
<!--                        class="tile-selected"-->
<!--                        :label="$t('m_shop_address')"-->
<!--                        item-text="address"-->
<!--                        item-value="address"-->
<!--                        :menu-props="{maxHeight: 400}"-->
<!--                        @change="$emit('hideError')"-->
<!--                />-->

                <v-combobox
                        v-model="form.address"
                        :items="address"
                        item-text="address"
                        item-value="address"
                        :label="$t('m_shop_address')"
                        :return-object="false"
                        class="combobox-address"
                        :error-messages="addressErrors"
                        @input="$v.form.address.$touch()"
                        @blur="$v.form.address.$touch()"
                >
                    <template v-slot:item="{ index, item }">
                        {{ item.address }}
                        <v-spacer></v-spacer>

                        <v-list-item-action @click.stop>
                            <v-btn
                                    icon
                                    @click.stop.prevent="onDelete(item.id)"
                            >
                                <ons-icon icon="close" />
                            </v-btn>
                        </v-list-item-action>
                    </template>
                </v-combobox>

                <div class="date-time__wrap">
                    <v-dialog
                            ref="dialogDate"
                            v-model="modalDate"
                            :return-value.sync="form.date"
                            persistent
                            width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                    v-model="form.date"
                                    :label="$t('m_shop_date')"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    class="delivery__date"

                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="form.date"
                                       scrollable
                                       :locale="selectedLanguage"
                                       :min="minDate">
                            <v-spacer></v-spacer>
                            <v-btn text
                                   color="primary"
                                   @click="modalDate = false">{{$t('m_cancel')}}
                            </v-btn>
                            <v-btn text
                                   color="primary"
                                   @click="$refs.dialogDate.save(form.date)">{{$t('m_confirm')}}
                            </v-btn>
                        </v-date-picker>
                    </v-dialog>

                    <v-dialog
                            ref="dialogTime"
                            v-model="modalTime"
                            :return-value.sync="form.time"
                            persistent
                            width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                    v-model="form.time"
                                    :label="$t('m_shop_time')"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"

                            ></v-text-field>
                        </template>
                        <v-time-picker
                                v-model="form.time"
                                full-width
                                format="24hr"
                                :min="minTime"
                                :locale="selectedLanguage"
                        >
                            <v-spacer></v-spacer>
                            <v-btn text
                                   color="primary"
                                   @click="modalTime = false">{{$t('m_cancel')}}
                            </v-btn>
                            <v-btn text
                                   color="primary"
                                   @click="$refs.dialogTime.save(form.time)">{{$t('m_confirm')}}
                            </v-btn>
                        </v-time-picker>
                    </v-dialog>
                </div>


                <div class="delivery__comment__title">{{$t('m_shop_comments_for_order')}}</div>
                <input-base
                        class="delivery__comment"
                        type="textarea"
                        v-model="form.comment"
                        placeholder="Введите текст"
                ></input-base>

                <div class="delivery__total_amount">
                    <div class="delivery__total_amount__title">{{$t('m_shop_delivery_price')}}</div>
                    <div class="delivery__total_amount__price">{{delivery.price}} {{country.config.currency}}</div>
                </div>

                <div class="delivery__info">
                    <div class="delivery__info__icon">
                        <i class="icon-info"/>
                    </div>
                    <div class="delivery__info__text">
                        Дорогой друг, хотим тебя предупредить: если твой адрес доставки не входит в зону со стандартной
                        суммой оплаты доставки, то тебе нужно будет совершить доплату наличными курьеру.
                    </div>
                </div>

                <!--            <v-checkbox-->
                <!--                    v-model="checkbox"-->
                <!--                    :label="'Запомнить адрес, что бы не вводить в следующий раз'"-->
                <!--                    :error-messages="errorMessages['checkbox']"-->
                <!--                    @change="$emit('hideError')"-->
                <!--            />-->
            </div>

            <div class="delivery__btn-pay">
                <v-btn
                        block
                        depressed
                        color="primary"
                        type="main"
                        @click="nextPage"
                >
                    {{ $t('m_next') }}
                </v-btn>
            </div>
        </div>
    </v-ons-page>
</template>

<script>
    import moment from 'moment'
    import MixinChooseCity from '_mixin_choose_city'
    import { mapActions, mapGetters } from 'vuex'
    import constants from '_vuex_constants'
    import MaskPhone from '_PLUGINS/common/MaskPhone'
    import InputBase from '_CORE/components/common/inputs/input-base'
    import ValidationHelpers from '_plugins_validation_helpers';
    import { required, email, minLength, validPassword, isTrue } from '_plugins_validators';
    import Illustration from '../../img/delete-address-illustration.svg';

    export default {
        name: 'delivery',
        components: {InputBase},
        mixins: [
            MixinChooseCity,
            ValidationHelpers,
        ],
        data () {
            return {
                checkbox: false,
                modalDate: false,
                modalTime: false,
                form: {
                    city: {
                        name: '',
                    },
                    address: '',
                    date: '',
                    time: '',
                    comment: '',
                },
                minDate: moment().add(1, 'days').format('YYYY-MM-DD'),
                minTime: '',
                maxDate: '',
                errorMessages: {
                    'id_city': '',
                },
            }
        },
        computed: {
            ...mapGetters({
                deliveryList: constants.MrewardShop.Getters.deliveryList,
                profile: constants.MrewardProfile.Getters.userProfile,
                countries: constants.MrewardGeo.Getters.countries,
                country: constants.MrewardShop.Getters.country,
                address: constants.MrewardShop.Getters.address,
                selectedLanguage: constants.App.Getters.language,
            }),
            delivery () {
                return this.deliveryList[0] || {}
            },
            addressErrors() {
                const errors = [];
                if (!this.$v.form.address.$dirty) {
                    return errors;
                }

                if (!this.$v.form.address.required) {
                    errors.push(this.$t('m_shop_address_required'));
                }

                return errors;
            },
            dateErrors() {
                const errors = [];
                if (!this.$v.form.date.$dirty) {
                    return errors;
                }

                if (!this.$v.form.date.required) {
                    errors.push(this.$t('m_shop_date_required'));
                }

                return errors;
            },
            timeErrors() {
                const errors = [];
                if (!this.$v.form.time.$dirty) {
                    return errors;
                }

                if (!this.$v.form.time.required) {
                    errors.push(this.$t('m_shop_time_required'));
                }

                return errors;
            },
        },
        watch: {
            'city.name'(value) {
                this.form.city.name = value;
            }
        },
        async created () {
            try {
                if (!this.countries.length) {
                    await this.getCountries()
                }

                if (this.profile.id_city) {
                    this.setCityName()
                }

                this.setCountry()

                await this.listDeliveryAddress()

            } catch (e) {
                this.$Alert.Error(e)
            }

            this.loading = false
        },
        methods: {
            ...mapActions({
                getCountries: constants.MrewardGeo.Actions.getCountries,
                getCityById: constants.MrewardGeo.Actions.getCityById,
                listDeliveryAddress: constants.MrewardShop.Actions.listDeliveryAddress,
                removeDeliveryAddress: constants.MrewardShop.Actions.removeDeliveryAddress,
            }),
            // sds() {
            //     this.dateFrom = await this.pickDate({
            //         maxDate: moment(),
            //         date: this.dateFrom
            //     })
            // },
            async setCityName () {
                try {
                    const {target: {city_name: name}} = await this.getCityById({
                        id: this.profile.id_city,
                    })
                    this.form.city.name = name
                } catch (e) {
                    this.$Alert.Error(e)
                }
            },
            setCountry () {
                const fullMobileNumber = `+${this.profile.mobile}`
                const countryCode = MaskPhone.GetCountryByPhoneNumber(fullMobileNumber)

                const country = this.countries.find(({code}) => {
                    return code === countryCode
                })

                const {phone_code: code, country_id: id, country_name: name, code: iso} = country
                this.selectedCountry = {
                    code,
                    id,
                    name,
                    iso,
                }
            },
            nextPage () {
                if (this.$v && this.$v.$touch) {
                    this.$v.$touch();
                }

                if (this.validationInvalid({ startFromFirst: true })) {
                    return true;
                }



                this.$bus.$emit('goToTabCheckout', 'Pay', this.form)
            },
            onDelete(id) {
                this.$Alert.Confirm({
                    img: Illustration,
                    title: this.$t('m_shop_delete_address_title'),
                    nextName: this.$t('m_shop_yes'),
                    cancelName: this.$t('m_shop_no'),
                    nextEvent: async () => {

                        await this.removeDeliveryAddress({
                            id: id,
                        })
                        await this.listDeliveryAddress()
                    }
                })
            }
        },
        validations() {
            const validations = {
                form: {
                    address: {
                        required,
                        $params: {
                            order: 1,
                        },
                    },
                    $params: {
                        order: 100,
                    },
                },
            };
            return validations;
        },
    }
</script>

<style lang="scss">
    .page[page="delivery"] {
        .page__content {
            padding-top: 16px;
        }
    }
    .delivery {
        &__info {
            background: #F5F7FA;
            border-radius: 8px;
            padding: 16px;
            display: flex;
            margin: 16px 0;

            &__icon {
                color: #6D0978;
            }

            &__text {
                font-style: normal;
                font-weight: normal;
                font-size: 12px;
                line-height: 16px;
                color: #000000;
                padding-left: 10px;
            }
        }

        &__total_amount {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 16px;

            &__title {
                font-size: 13px;
                line-height: 18px;
                letter-spacing: -0.078px;
                color: #000000;
            }

            &__price {
                ont-weight: 600;
                font-size: 15px;
                line-height: 20px;
                text-align: right;
                letter-spacing: -0.24px;
                color: #000000;
            }
        }

        &__comment {
            max-height: unset;
            padding: 16px;
            border: 1px solid #CECED2;
            box-sizing: border-box;
            border-radius: 6px;

            &__title {
                font-style: normal;
                font-weight: normal;
                font-size: 12px;
                line-height: 16px;
                color: rgba(60, 60, 67, 0.6);
                margin-bottom: 4px;
                margin-top: 16px;
            }

            textarea {
                padding: 12px 16px;
                font-size: 15px;
                line-height: 20px;
                /* identical to box height, or 133% */

                letter-spacing: -0.24px;
            }
        }

        &__btn-pay {
            padding-bottom: 50px;
        }

        &__date {
            padding-right: 16px;
        }
    }

    .date-time__wrap {
        display: flex;
    }

    .v-application .primary {
        background-color: #6D0978 !important;
        border-color: #6D0978 !important;
    }

    .v-date-picker-table--date .v-btn {
        min-height: 32px !important;
    }

    .v-application .accent {
        background-color: #6D0978 !important;
        border-color: #6D0978 !important;
    }

    .v-date-picker-table .v-btn.v-btn--active {
        .v-btn__content {
            color: #fff !important;
        }
    }

    .v-date-picker-table .v-btn--disabled {
        .v-btn__content {
            color: #949494;
        }
    }

    .v-autocomplete__content {
        .v-list .v-list-item {
            height: 42px;
        }

        .v-btn {
            height: 48px;
            width: 48px;
        }
        ons-icon {
            color: #6D0978;
        }
    }
</style>
