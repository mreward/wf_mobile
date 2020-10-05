<template>
    <layout
        :title="title"
        :show-loader="false"
        button-left="back"
        page="cake-designer-catalog"
    >
        <v-progress-circular
            v-if="loading"
            :width="7"
            :size="70"
            indeterminate
        />
        <template v-else>
            <select-card-list
                v-model="item"
                :items="items"
                :not-found-message="notFoundMessage"
            />

            <div class="designer__btn-submit">
                <v-btn
                    block
                    depressed
                    color="primary"
                    type="main"
                    :disabled="isDisabledSelect"
                    @click="goToBack"
                >
                    {{ $t('m_cake_designer_select') }}
                </v-btn>
            </div>
        </template>
    </layout>
</template>

<script>
    import { mapActions } from 'vuex'
    import constants from '_vuex_constants'

    import { isEmpty } from 'lodash'

    import SelectCardList from '../components/select-card-list'

    export default {
        name: 'screen-designer-catalog',
        components: {
            SelectCardList
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
            isDisabledSelect() {
                return isEmpty(this.item)
            }
        },
        methods: {
            ...mapActions({
                popPage: constants.App.Actions.popPage
            }),
            goToBack() {
                this.popPage()
            }
        }
    }
</script>

<style lang="scss">
    .page[page="cake-designer-catalog"] {
        &> .toolbar, &> .page__background {
            background-color: #fff !important;
        }

        .select-card-list {
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
