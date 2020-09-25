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
                Выбрать
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
    }
</style>
