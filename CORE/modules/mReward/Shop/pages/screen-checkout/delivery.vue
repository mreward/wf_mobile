<template>
    <div>
        <div class="will-change--helper">
            <v-text-field
                    v-model="city.name"
                    readonly
                    :label="$t('m_auth_city', '', {required: '*'})"
                    type="text"
                    :error-messages="errorMessages['id_city']"
                    @focus="goToSelectCity"
            />


            <v-text-field
                    v-model="address"
                    :label="'Адрес'"
                    :error-messages="errorMessages['address']"
                    :hint="'sdsd'"
                    type="text"
                    @focus="$emit('hideError')"
            />

            <datepicker-custom
                    :date.sync="date"
                    :min-date="minDate"
                    :max-date="maxDate"
                    mockDate="2019-02-21"
            >
                <v-text-field
                        v-model="date"
                        :label="'label'"
                        :error-messages="errorMessages['date']"
                        :hint="'field.hint'"
                        type="text"
                        readonly
                        @change="$emit('hideError')"
                />
            </datepicker-custom>


            <div class="delivery__comment__title">Комментарий к заказу</div>
            <input-base
                    class="delivery__comment"
                    type="textarea"
                    :value="comment"
                    placeholder="Введите текст"
            ></input-base>

            <div class="delivery__total_amount">
                <div class="delivery__total_amount__title">Стоимость доставки курьером</div>
                <div class="delivery__total_amount__price">15 c.</div>
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

            <v-checkbox
                    v-model="checkbox"
                    :label="'Запомнить адрес, что бы не вводить в следующий раз'"
                    :error-messages="errorMessages['checkbox']"
                    @change="$emit('hideError')"
            />
        </div>

        <div class="delivery__btn-pay">
            <v-btn
                    block
                    depressed
                    color="primary"
                    type="main"
            >
                {{ $t('m_next') }}
            </v-btn>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import MixinChooseCity from '_mixin_choose_city'
    import { mapActions, mapGetters } from 'vuex'
    import constants from '_vuex_constants'
    import MaskPhone from '_PLUGINS/common/MaskPhone'
    import InputBase from '_CORE/components/common/inputs/input-base'

    export default {
        name: 'delivery',
        components: {InputBase},
        mixins: [
            MixinChooseCity,
        ],
        data () {
            return {
                checkbox: false,
                city: {
                    name: '',
                },
                address: '',
                date: '',
                comment: '',
                minDate: moment().format('YYYY-MM-DD'),
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
            }),
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

            } catch (e) {
                this.$Alert.Error(e)
            }

            this.loading = false
        },
        methods: {
            ...mapActions({
                getCountries: constants.MrewardGeo.Actions.getCountries,
                getCityById: constants.MrewardGeo.Actions.getCityById,
            }),
            setActiveTab (name) {
                this.tab = name
            },
            async setCityName () {
                try {
                    const {target: {city_name: name}} = await this.getCityById({
                        id: this.profile.id_city,
                    })
                    this.city.name = name
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
        },
    }
</script>

<style lang="scss">
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
    }
</style>
