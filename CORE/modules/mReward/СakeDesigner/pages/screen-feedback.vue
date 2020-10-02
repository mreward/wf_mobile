<template>
    <layout
        :title="$t('m_cake_designer_feedback_title')"
        button-left="back"
        page="cake-designer-feedback"
    >
        <div class="feedback__form">
            <mobile-number
                v-model="form.mobile"
                :country="selectedCountry"
            />

            <div class="feedback__text__title">
                {{ $t('m_cake_designer_feedback_message') }}
            </div>
            <input-base
                v-model="form.text"
                :textarea-default-rows="3"
                class="feedback__text"
                type="textarea"
                :placeholder="$t('m_cake_designer_feedback_text')"
            />

            <selected-item
                v-for="(item, index) in images"
                :key="index"
                class="bordered"
                :value="item"
                :default-name="$t('m_cake_designer_without_name')"
                @select="onDelete(item)"
            />

            <select-list-item
                class="bordered"
                :value="{}"
                :with-price="false"
                :disabled="true"
                icon="icon-plus"
                icon-direction="left"
                :default-name="$t('m_cake_designer_feedback_add_photo')"
                :selected="true"
                @select="goToAddImage"
            />

            <div class="designer__btn-submit">
                <v-btn
                    block
                    depressed
                    color="primary"
                    type="main"
                    :disabled="isDisabledAdd"
                    @click="sendFeedback"
                >
                    {{ $t('m_send') }}
                </v-btn>
            </div>
        </div>
    </layout>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import constants from '_vuex_constants'

    import MixinChooseCounty from '_mixin_choose_country'
    import MobileNumber from '_mobile_number'

    import SelectListItem from '../components/select-list-item'
    import SelectedItem from '../components/selected-item'

    import { isEmpty, filter } from 'lodash'

    import * as libphonenumber from 'libphonenumber-js'

    export default {
        name: 'screen-feedback',
        components: {
            MobileNumber,
            SelectListItem,
            SelectedItem
        },
        mixins: [
            MixinChooseCounty
        ],
        data () {
            return {
                form: {
                    mobile: '',
                    text: ''
                },
                images: []
            }
        },
        computed: {
            ...mapGetters({
                profile: constants.MrewardProfile.Getters.userProfile
            }),
            isDisabledAdd() {
                return isEmpty(this.form.text) || isEmpty(this.form.mobile)
            }
        },
        mounted() {
            let parsedPhone = libphonenumber.parsePhoneNumber(`+${this.profile.mobile}`)

            const country = this.countries.find(({ code }) => {
                return code === parsedPhone.country
            })

            if (country && !isEmpty(country)) {
                this.chooseCountry(country)
                this.form.mobile = parsedPhone.nationalNumber
            }
        },
        methods: {
            ...mapActions({
                popPage: constants.App.Actions.popPage,
                uploadFeedbackImage: constants.MrewardСakeDesigner.Actions.uploadFeedbackImage,
                feedback: constants.MrewardСakeDesigner.Actions.feedback
            }),
            onDelete(item) {
                this.images = filter(this.images, image => image.id !== item.id)
            },
            goToAddImage() {
                // TODO: create upload images
            },
            async sendFeedback() {
                try {
                    await this.feedback({
                        ...this.form,
                        phone: `${this.selectedCountry.code}${this.form.mobile}`
                    })

                    this.popPage()

                    this.$Toast.Success(this.$t('m_cake_designer_feedback_success_text'))
                } catch (e) {
                    this.$Alert.Error(e)
                }
            }
        }
    }
</script>

<style lang="scss">
    .page[page="cake-designer-feedback"] {
        &> .toolbar, &> .page__background {
            background-color: #fff !important;
        }

        .bordered {
            &.selected-item, .select-list__item {
                border: 1px solid #CECED2;
                box-shadow: none;
            }

             .select-list__item {
                 margin-top: 16px;
             }
        }

        .feedback {
            &__form {
                padding-top: 16px;
            }

            &__text {
                max-height: unset;
                padding: 16px !important;
                border: 1px solid #CECED2;
                box-sizing: border-box;
                border-radius: 6px;
                min-height: 60px;
                margin-bottom: 16px;

                &__title {
                    font-size: 12px;
                    line-height: 16px;
                    color: rgba(60, 60, 67, 0.6);
                    margin-bottom: 4px;
                    margin-top: 14px;
                }
            }
        }
    }
</style>
