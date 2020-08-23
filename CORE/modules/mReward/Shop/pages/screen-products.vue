<template>
    <layout
            :title="$t('m_profile_settings')"
            page="products"
    >
        <div class="toolbar--search">
        <div class="toolbar__wrapper">
            <v-text-field
                    ref="inputSearch"
                    slot="title"
                    v-model="search"
                    solo
                    :label="$t('m_adresses_search')"
                    class="input--search"
                    prepend-inner-icon="icon-search"
                    hide-details
            />

            <transition name="slide-fade">
                <v-btn
                        v-show="showCancelButton"
                        text
                        depressed
                        @click="cleareSearchField"
                >
                    {{ $t('m_adresses_cancel') }}
                </v-btn>
            </transition>

            <v-btn
                    small
                    class="btn-filters"
            >
                <i class="icon-filters"/>
            </v-btn>
        </div>
        </div>

        <div class="content-wrap">
            <product-item v-for="(item, index) in listData"
                          :key="index"
                          :item="item"/>
        </div>

    </layout>

</template>

<script>
    import ProductItem from '../components/product-item'
    import { mapActions, mapGetters } from 'vuex'
    import constants from '_vuex_constants'

    export default {
        name: 'screen-shop-top',
        components: {
            ProductItem
        },
        data () {
            return {
                search: '',
                listData: [
                    {
                        name: 'Aссорти макаронс из девяти видов',
                        price: 180,
                        weight: '110 г',
                        top: true,
                        img: 'https://www.alizy.club/wp-content/uploads/2018/03/Retsept-pechenya-makarons.jpeg',
                    },
                    {
                        name: 'Aссорти макаронс из девяти видов',
                        price: 180,
                        weight: '110 г',
                        top: true,
                        img: 'https://smachno.ua/wp-content/uploads/2013/09/23/eaters-collective-219711.jpg',

                    },
                    {
                        name: 'Aссорти макаронс из девяти видов',
                        price: 180,
                        weight: '110 г',
                        top: true,
                        img: 'https://smachno.ua/wp-content/uploads/2013/09/23/eaters-collective-219711.jpg',
                    },
                    {
                        name: 'Aссорти макаронс из девяти видов',
                        price: 180,
                        weight: '110 г',
                        top: true,
                        img: 'https://www.alizy.club/wp-content/uploads/2018/03/Retsept-pechenya-makarons.jpeg',
                    },
                    {
                        name: 'Aссорти макаронс из девяти видов',
                        price: 180,
                        weight: '110 г',
                        top: true,
                        img: 'https://smachno.ua/wp-content/uploads/2013/09/23/eaters-collective-219711.jpg',

                    },
                    {
                        name: 'Aссорти макаронс из девяти видов',
                        price: 180,
                        weight: '110 г',
                        top: true,
                        img: 'https://smachno.ua/wp-content/uploads/2013/09/23/eaters-collective-219711.jpg',
                    }
                ]
            }
        },
        computed: {
            ...mapGetters({
            }),

            showCancelButton() {
                return this.search.length > 0
            },
        },

        async created () {
            try {
                await this.getProductsTop()
            } catch (e) {
                this.$Alert.Error(e)
            }
        },
        methods: {
            ...mapActions({
                popPage: constants.App.Actions.popPage,
                pushPage: constants.App.Actions.pushPage,
                popToPage: constants.App.Actions.popToPage,
                getCountries: constants.MrewardGeo.Actions.getCountries,
                getProductsTop: constants.MrewardShop.Actions.getProductsTop
            }),

            cleareSearchField() {
                this.search = ''
            },
        }
    }
</script>

<style lang="scss">
    .page[page="products"] {
        ons-toolbar {
            background: #fff !important;
        }

        .page__content {
           padding: 0 !important;
            flex: 1;
            display: flex;
            flex-direction: column;
        }

        .content-wrap {
            padding: 8px 16px;
            flex: 1;
            overflow: scroll;
        }

        .toolbar__wrapper {
            padding-right: 0 !important;
            padding-bottom: 12px;
        }
        .toolbar--search {

        }
    }
</style>
