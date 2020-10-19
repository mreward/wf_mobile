<template>
    <layout
        :title="title"
        :show-loader="false"
        button-left="back"
        page="cake-designer-categories"
    >
        <v-progress-circular
            v-if="loading"
            :width="7"
            :size="70"
            indeterminate
        />
        <template v-else>
            <select-list
                v-model="item"
                :items="items"
                icon=""
                :with-price="false"
                :currency="country.config.currency"
                :not-found-message="notFoundMessage"
                @input="goToDecorCatalog"
            />
        </template>
    </layout>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import constants from '_vuex_constants'
    import { get, isEmpty } from 'lodash'

    import SelectDesignerCatalog from '_screen_designer_catalog'

    import SelectList from '../components/select-list'

    export default {
        name: 'screen-designer-categories',
        components: {
            SelectList
        },
        props: {
            decor: {
                type: Object,
                default: () => ({})
            },
            title: {
                type: String,
                default: ''
            },
            notFoundMessage: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                item: {},
                loading: true
            }
        },
        computed: {
            ...mapGetters({
                items: constants.MrewardСakeDesigner.Getters.decorCategories,
                country: constants.MrewardShop.Getters.country
            }),

            isDisabledSelect() {
                return isEmpty(this.item)
            }
        },
        async created () {
            try {
                await this.getDecorImageCategories({
                    partnerId: get(this.country, 'config.id')
                })
            } catch (e) {
                this.$Alert.Error(e)
            } finally {
                this.loading = false
            }
        },
        methods: {
            ...mapActions({
                popPage: constants.App.Actions.popPage,
                pushPage: constants.App.Actions.pushPage,
                getDecorImageCategories: constants.MrewardСakeDesigner.Actions.getDecorImageCategories
            }),
            goToDecorCatalog(item) {
                this.pushPage({
                    extends: SelectDesignerCatalog,
                    props: {
                        decor: {
                            type: Object,
                            default: () => {
                                return this.decor
                            }
                        },
                        title: {
                            type: String,
                            default: () => {
                                return get(item, 'name')
                            }
                        },
                        notFoundMessage: {
                            type: String,
                            default: () => {
                                return this.$t('m_cake_designer_not_found_decors')
                            }
                        }
                    },
                    computed: {
                        ...mapGetters({
                            items: constants.MrewardСakeDesigner.Getters.decorGallery,
                            country: constants.MrewardShop.Getters.country
                        })
                    },
                    async created () {
                        try {
                            await this.getDecorGallery({
                                partnerId: get(this.country, 'config.id'),
                                decorId: get(this.decor, 'id'),
                                categoryId: get(item, 'id')
                            })
                        } catch (e) {
                            this.$Alert.Error(e)
                        } finally {
                            this.loading = false
                        }
                    },
                    methods: {
                        ...mapActions({
                            getDecorGallery: constants.MrewardСakeDesigner.Actions.getDecorGallery,
                            setOrderDecor: constants.MrewardСakeDesigner.Actions.setOrderDecor,
                            popToPage: constants.App.Actions.popToPage,
                            popPage: constants.App.Actions.popPage
                        }),
                        async goToBack() {
                            await this.setOrderDecor({
                                item: this.decor,
                                gallery: this.item
                            })
                            this.popToPage('screen-designer')
                        }
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    .page[page="cake-designer-categories"] {
        .toolbar {
            background: #fff;
            padding-bottom: 8px;
        }

        .select-list {
            margin-top: 24px;
            margin-bottom: 80px;
        }

        .designer__btn-submit {
            position: fixed;
            bottom: 0;
            right: 0;
            left: 0;

            padding: 16px;
            padding-bottom: 34px;

            background-color: #fff;
        }
    }
</style>
