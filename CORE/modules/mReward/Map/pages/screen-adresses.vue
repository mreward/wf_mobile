<template>
    <layout
        :layout="layout"
        page="adresses"
    >
        <template slot="toolbar">
            <div class="toolbar toolbar--search">
                <div class="tabbar-button__wrapper">
                   <div class="tabbar-button">
                       <div class="tabbar-button__item"
                            :class="{'tabbar-button__item--active': tab === 'list'}"
                            @click="setActiveTab('list')">
                           <div class="tabbar-button__title">
                               {{$t('m_adresses_list')}}
                           </div>
                       </div>
                       <div class="tabbar-button__item"
                           :class="{'tabbar-button__item--active': tab === 'map'}"
                            @click="setActiveTab('map')">
                           <div class="tabbar-button__title">
                               {{$t('m_adresses_map')}}
                           </div>
                       </div>
                   </div>
                </div>
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
                        @focus="searchFocusEvent()"
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
        </template>

            <div
                ref="adress"
                class="list--wrapper list--fullpage"
                :class="{'list-address--type-list': tab === 'list'}"
            >
                <div class="adress-conteiner">
                    <div ref="adressListWrapper"
                         class="adress-conteiner__content"
                         :class="{'off-scroll': offScroll }"
                    >
                        <div
                            v-show="showAddress"
                        >
                            <adress-item
                                v-for="(marker, id) in filteredMarkers"
                                :key="id"
                                :item="marker"
                                :selected="tab === 'list' && selectedMarker && marker.branch === selectedMarker.branch"
                                @click="selectMarkerItem(marker)"
                            />
                            <not-found-items
                                v-if="!filteredMarkers.length"
                                slot="no-results"
                                :message="$t('m_adresses_not_found')"
                            />
                        </div>

                        <template v-if="selectedMarker && tab === 'map'">
                            <adress-item
                                    class="list-address-map--only-one"
                                :selected="true"
                                :item="selectedMarker"
                            />
                        </template>
                    </div>
                    <span
                        v-show=" tab === 'map'"
                        ref="listBage"
                        class="list--bage"
                        :class="extendedClass"
                    >
                        <span ref="listBage" class="list-bage__mask"></span>
                    </span>
                </div>
            </div>

            <template v-if="!isLoading && tab === 'map'">
                <div
                    ref="map"
                    v-map.disableDefaultUI="map"
                    class="page__background page__background--map"
                />
            </template>
            <template v-else>
                <not-found-items
                    :is-loading="isLoading"
                />
            </template>

            <v-btn
                    v-if="tab === 'map'"
                fab
                class="v-btn--nearby"
                @click="goToMyLocation"
            >
                <i class="icon-nearby"></i>
            </v-btn>
    </layout>
</template>

<script>
    import MixinsScreenAdresses from '_mixin_screen_adresses'
    import AdressItem from '_adress_item'
    import ButtonBase from '_CORE/components/common/buttons/button-base'

    export default {
        name: 'screen-adresses',
        components: {ButtonBase, AdressItem},
        mixins: [
            MixinsScreenAdresses
        ]
    }
</script>

<style lang="scss" scoped>
    .off-scroll {
        overflow: hidden !important;
    }
</style>
