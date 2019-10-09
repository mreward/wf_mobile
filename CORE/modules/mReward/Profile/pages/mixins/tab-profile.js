import constants from '_vuex_constants'
import { mapActions, mapGetters } from 'vuex'
import StringMask from 'string-mask'
import ImgDownloadPhoto from '_SRC_IMG_WALLET/download-photo.png'
import Camera from '_CORE/plugins/common/Camera'
import MaskPhone from '_CORE/plugins/common/MaskPhone'

export default {
    data() {
        return {
            ImgDownloadPhoto,
            cityName: '',
            countryPhoneMask: '+000 000 000 000',
            profileDataLength: 0
        }
    },
    computed: {
        ...mapGetters({
            settings: constants.App.Getters.settings,
            profile: constants.MrewardProfile.Getters.userProfile,
            loaderVisible: constants.App.Getters.loaderVisible,
            maskFromIso: constants.PhoneMasks.Getters.maskFromIso,
            countries: constants.MrewardGeo.Getters.countries
        }),
        formattedMobile() {
            return new StringMask(this.countryPhoneMask, { reverse: true }).apply(this.profile.mobile)
        },
        fullName() {
            const isNameDataFilledUp = this.profile.first_name && this.profile.last_name
            return isNameDataFilledUp ? `${this.profile.first_name} ${this.profile.last_name}` : ''
        },
        profileData() {
            const profileData = []

            if (this.profile.email) {
                profileData.push({
                    title: this.$t('m_profile_email'),
                    subtitle: this.profile.email
                })
            }

            if (this.profile.birth_day) {
                profileData.push({
                    title: this.$t('m_profile_birthday'),
                    subtitle: this.$options.filters.date(this.profile.birth_day, { formatTo: 'DD MMMM, YYYY' })
                })
            }

            if (this.cityName) {
                profileData.push({
                    title: this.$t('m_profile_city'),
                    subtitle: this.cityName
                })
            }

            return profileData
        }
    },
    watch: {
        'profile.id_city'() {
            this.setCityName()
        },
        'profileData.length'(newValue) {
            this.$nextTick(() => {
                this.profileDataLength = newValue
            })
        }
    },
    async created() {
        try {
            if (!this.countries.length) {
                await this.getCountries()
            }

            if (this.profile.id_city) {
                this.setCityName()
            }

            this.setCountryPhoneMask()
        } catch (e) {
            this.$Alert.Error(e)
        }
    },
    methods: {
        ...mapActions({
            uploadAvatarAction: constants.MrewardProfile.Actions.uploadAvatar,
            getCityById: constants.MrewardGeo.Actions.getCityById,
            getCountries: constants.MrewardGeo.Actions.getCountries
        }),
        async setCityName() {
            try {
                const {target: {city_name: name}} = await this.getCityById({
                    id: this.profile.id_city
                })
                this.cityName = name
            } catch (e) {
                this.$Alert.Error(e)
            }
        },
        setCountryPhoneMask() {
            const fullMobileNumber = `+${this.profile.mobile}`
            const countryCode = MaskPhone.GetCountryByPhoneNumber(fullMobileNumber)

            const country = this.countries.find(({ code }) => {
                return code === countryCode
            })

            const { phone_code: code, country_id: id, country_name: name, code: iso } = country
            const selectedCountry = {
                code,
                id,
                name,
                iso
            }

            const { mask } = this.maskFromIso(selectedCountry)
            this.countryPhoneMask = `${code} ${mask}`.replace(/[0-9x]/g, '0')
        },
        selectAvatar() {
            const $this = this
            let buttons = [this.$t('m_profile_from_gallery'), this.$t('m_profile_take_picture'), this.$t('m_profile_cancel')]
            this.$ons.openActionSheet({
                buttons,
                title: this.$t('m_profile_change_profile_picture'),
                cancelable: true,
                destructive: 2,
                class: 'alert--avatar',
                callback(buttonIndex) {
                    if (buttonIndex !== -1 && buttonIndex !== 2) {
                        let imageSource = 1 // Camera
                        if (buttonIndex === 0) {
                            imageSource = 0 // From Gallery
                        }
                        $this.uploadAvatar(imageSource)
                    }
                }
            })
        },
        async uploadAvatar(imageSource) {
            try {
                const picture = await Camera.GetPicture({ imageSource })
                const payload = await Camera.PreparePicture({
                    picture,
                    isHashFileName: false,
                    fileKey: 'profile_image'
                })

                await this.uploadAvatarAction({ ...payload })
            } catch (error) {
                console.log(error)
                this.$Alert.Error(error)
            }
        },
        goToEditProfile() {
            this.$bus.$emit('goToPage', { page: 'edit-profile' })
        }
    }
}
