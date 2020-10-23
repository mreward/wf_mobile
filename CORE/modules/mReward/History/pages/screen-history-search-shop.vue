<template>
    <layout layout="default" page="search-shop">

            <toolbar
                    slot="toolbar"
                    button-left="back"
            >
                    <div slot="title" class="toolbar--search">
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
                        </div>
                    </div>
            </toolbar>


        <div
                ref="adress"
                class="list--wrapper list--fullpage"
        >
            <div class="adress-conteiner">
                <div ref="adressListWrapper"
                     class="adress-conteiner__content"
                >
                    <div
                            v-show="!isLoading"
                    >
                        <adress-item
                                v-for="(marker, id) in filteredMarkers"
                                :key="id"
                                :item="marker"
                                :distanceShow="false"
                                :checked="filterAddresses.branch === marker.branch"
                                @click.native="selectedAddress(marker, id)"
                        />
                        <not-found-items
                                v-if="!filteredMarkers.length"
                                slot="no-results"
                                :message="$t('m_adresses_not_found')"
                        />
                    </div>
                </div>
            </div>
        </div>
    </layout>
</template>

<script>
    import locationImg from '_SRC_IMG_WALLET/location.png'
    import { mapActions, mapGetters } from 'vuex'
    import constants from '_CORE/__configs.generate__/store/constants'
    import AdressItem from '_history_address_item'
    import union from 'lodash/union';

    export default {
        name: 'screen-history-search-shop',
            components: {AdressItem},
        data() {
            return {
                search: '',
                layout: 'tab',
                isLoading: false,

                locationImg,
                filterAddresses: {
                    name: this.$t('m_history_all_shop'),
                    address: '',
                    branch: 'all',
                },
            }
        },
        computed: {
            ...mapGetters({
                settings: constants.App.Getters.settings,
                adresses: constants.MrewardAdresses.Getters.adresses
            }),
            listAddresses () {
                return [
                    {
                        name: this.$t('m_history_all_shop'),
                        address: '',
                        branch: 'all',
                    },
                    ...this.adresses,
                ]
            },
            filteredMarkers () {
                if(!this.search) {
                    return this.listAddresses;
                }

                return this.listAddresses.filter(item => ((item.name.toLowerCase().includes(this.search.toLowerCase()) ||
                  item.address.toLowerCase().includes(this.search.toLowerCase()))))
            },
            showCancelButton() {
                return this.search.length > 0
            },
        },
        watch: {
        },
        async created() {
            try {
                this.isLoading = true
                await this.getAddresses({networkFirst: true})
            } catch (e) {
                this.$Alert.Error(e)
            } finally {
                this.isLoading = false
            }
        },
        mounted() {
            if(this.select) {
                this.filterAddresses = this.select;
            }
        },
        beforeDestroy () {
            if(this.onSelected) {
                this.onSelected(this.filterAddresses);
            }
        },
        methods: {
            ...mapActions({
                getAddresses: constants.MrewardAdresses.Actions.getAdresses
            }),
            cleareSearchField() {
                this.search = ''
            },
            selectedAddress(item, index) {
                this.filterAddresses = item;
                // if(this.filterAddresses.includes(item)) {
                //     this.filterAddresses.splice(index, 1);
                // }
                //
                // this.filterAddresses.push(item)

            }
        }
    }
</script>

<style lang="scss">
    .list--fullpage {
        display: flex;
        flex: 1;
        top: 0;
    }

    .adress-conteiner {
        width: 100%;
    }
</style>
