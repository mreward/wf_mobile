<template>
    <layout
        :title="title"
        button-left="back"
        page="cake-designer-catalog"
    >
        <select-card-list
            v-model="item"
            :items="items"
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
        data () {
            return {
                item: {}
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
