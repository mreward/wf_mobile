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
                    :label="'Город'"
                    :error-messages="'Введите address'"
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
                        :error-messages="'errorMessages'"
                        :hint="'field.hint'"
                        type="text"
                        readonly
                        @change="$emit('hideError')"
                />
            </datepicker-custom>




        <v-checkbox
                v-model="checkbox"
                :label="'Запомнить адрес, что бы не вводить в следующий раз'"
                :error-messages="'чикабум'"
                @change="$emit('hideError')"
        />
        </div>

        <div class="shop-cart__btn-pay">
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
    import constants from '_CORE/__configs.generate__/store/constants'
    import MaskPhone from '_PLUGINS/common/MaskPhone'

    export default {
        name: 'delivery',
        mixins: [
            MixinChooseCity
        ],
        data () {
            return {
                checkbox: false,
                city: {
                    name: ''
                },
                address: '',
                date: '',

                minDate: moment().format('YYYY-MM-DD'),
                maxDate: '',
                errorMessages: {
                    'id_city': '',
                }
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
                getCityById: constants.MrewardGeo.Actions.getCityById
            }),
            setActiveTab(name) {
                this.tab = name;
            },
            async setCityName() {
                try {
                    const {target: {city_name: name}} = await this.getCityById({
                        id: this.profile.id_city
                    })
                    this.city.name = name
                } catch (e) {
                    this.$Alert.Error(e)
                }
            },
            setCountry() {
                const fullMobileNumber = `+${this.profile.mobile}`
                const countryCode = MaskPhone.GetCountryByPhoneNumber(fullMobileNumber)

                const country = this.countries.find(({ code }) => {
                    return code === countryCode
                })

                const { phone_code: code, country_id: id, country_name: name, code: iso } = country
                this.selectedCountry = {
                    code,
                    id,
                    name,
                    iso
                }
            },
        }
    }
</script>

<style scoped>

</style>
