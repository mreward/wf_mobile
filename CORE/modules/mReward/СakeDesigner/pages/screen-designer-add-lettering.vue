<template>
    <layout
        :title="$t('m_cake_designer_add_lettering_title')"
        button-left="back"
        page="cake-designer-add-lettering"
    >
        <p class="add-lettering__subtitle">
            {{ $t('m_cake_designer_add_lettering_text') }}
        </p>

        <div
            class="add-lettering__image"
        >
            <img :src="imgPhoto">
        </div>
        <div class="add-lettering__text__title">
            {{ $t('m_cake_designer_add_lettering_message') }}
        </div>
        <input-base
            v-model="form.text"
            :textarea-default-rows="3"
            :max-length="30"
            class="add-lettering__text"
            type="textarea"
            :placeholder="$t('m_cake_designer_add_lettering_message_text')"
        />

        <div class="designer__btn-submit">
            <v-btn
                block
                depressed
                color="primary"
                type="main"
                :disabled="isDisabledAdd"
                @click="goToBack"
            >
                {{ $t('m_cake_designer_add') }}
            </v-btn>
        </div>
    </layout>
</template>

<script>
    import { mapActions } from 'vuex'
    import constants from '_vuex_constants'

    import { isEmpty } from 'lodash'

    import SelectCardList from '../components/select-card-list'

    import imgPhoto from '../img/photo.png'

    export default {
        name: 'screen-designer-add-lettering',
        components: {
            SelectCardList
        },
        data () {
            return {
                imgPhoto,
                form: {
                    text: ''
                }
            }
        },
        computed: {
            isDisabledAdd() {
                return isEmpty(this.form.text)
            }
        },
        methods: {
            ...mapActions({
                popPage: constants.App.Actions.popPage,
                setOrderLettering: constants.MrewardСakeDesigner.Actions.setOrderLettering
            }),
            async goToBack() {
                await this.setOrderLettering({
                    item: this.lettering,
                    custom: {
                        ...this.form
                    }
                })

                this.form.text = ''

                this.popPage()
            }
        }
    }
</script>

<style lang="scss">
    .page[page="cake-designer-add-lettering"] {
        &> .toolbar, &> .page__background {
            background-color: #fff !important;
        }

        .add-lettering {
            &__subtitle {
                font-size: 13px;
                line-height: 18px;
                text-align: center;
                letter-spacing: -0.078px;
                color: rgba(60, 60, 67, 0.6);
                margin: 16px 0;
            }

            &__image {
                text-align: center;
                line-height: 0;
                margin-bottom: 16px;
            }

            &__text {
                max-height: unset;
                padding: 16px !important;
                border: 1px solid #CECED2;
                box-sizing: border-box;
                border-radius: 6px;
                min-height: 60px;

                &__title {
                    font-size: 12px;
                    line-height: 16px;
                    color: rgba(60, 60, 67, 0.6);
                    margin-bottom: 4px;
                    margin-top: 16px;
                }
            }
        }
    }
</style>
