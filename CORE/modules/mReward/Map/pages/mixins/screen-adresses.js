import { mapGetters, mapActions } from 'vuex'
import constants from '_vuex_constants'
import Geolocation from '_CORE/plugins/common/Geolocation'
import MyLocationImg from '_SRC_IMG_WALLET/me.png'
/* eslint-disable no-undef */
import locationImg from '_SRC_IMG_WALLET/location.png'

import { TimelineLite, TweenLite, Power4 } from 'gsap'

const typeAnim = Power4.easeOut
const timeAnim = 0.6

export default {
    data() {
        return {
            selectedMarker: null,
            search: '',
            layout: 'tab',
            showList: false,
            mapObject: {},
            myLocationMarker: '',
            isLoading: false,
            startHeight: 18,
            defaultHeight: 18,

            dragStart: 0,
            isDrag: false,
            isAnimation: false,
            locationImg,
            mapLoaded: false,

            tab: 'list',
        }
    },
    computed: {
        ...mapGetters({
            markers: constants.MrewardAdresses.Getters.adresses,
            totalCount: constants.MrewardAdresses.Getters.totalCount,
            loaderVisible: constants.App.Getters.loaderVisible,
            settings: constants.App.Getters.settings
        }),
        map() {
            return {
                native: false,
                showInfoWindow: false,
                setActiveAnimation: true,
                markers: [],
                zoom: 11,
                iconSize: {
                    width: 29,
                    height: 36
                },
                callbackClick: this.selectMarkerItem,
                callbackClickCancel: this.resetMarkersClickCancel,
                callbackReady: this.callbackMapReady,
                mapReady: false,
                apiKey: this.settings.googleApiKey
            }
        },
        filteredMarkers() {
            return this.markers.filter(item => ((item.name.toLowerCase().includes(this.search.toLowerCase()) ||
                    item.address.toLowerCase().includes(this.search.toLowerCase()))))
        },
        showCancelButton() {
            return this.search.length > 0
        },
        extendedClass() {
            return {
                'border-shadow': (this.isDrag || this.showList) && !this.selectedMarker && this.filteredMarkers.length,
            }
        },
        offScroll () {
            if (this.tab === 'list') {
                return false
            }

            return !this.showList
        },

        showAddress () {
            if (this.tab === 'list') {
                return true
            }

            return !this.selectedMarker && !this.isLoading
        },
    },
    watch: {
        search () {
            setTimeout(this.openList, 0)
        },
        markers () {
            this.addMarkers()
        }
    },
    async created() {
        try {
            this.isLoading = true
            await this.getAdresses({networkFirst: true})
        } catch (e) {
            this.$Alert.Error(e)
        } finally {
            this.isLoading = false
        }
    },
    mounted() {
        TweenLite.set(this.$refs.adress, {height: '24px'})

        this.$refs.listBage.addEventListener('touchstart', this.touchStart)
        this.$refs.listBage.addEventListener('touchend', this.touchEnd)
        this.$refs.listBage.addEventListener('touchmove', this.touchMove)

        this.$refs.adressListWrapper.addEventListener('scroll', this.scroll)
    },
    methods: {
        ...mapActions({
            getAdresses: constants.MrewardAdresses.Actions.getAdresses
        }),
        setActiveTab(name) {
            this.tab = name;

            if(name === 'map') {
                this.search = ''
                this.hideSelectedMarker();
                setTimeout(() => {
                    this.showList = false
                    this.closeList()
                })
            }
        },
        addMarkers() {
            if ((this.markers.length === this.totalCount) && this.mapLoaded) {
                const image = new google.maps.MarkerImage(
                    locationImg,
                    new google.maps.Size(29, 36),
                    new google.maps.Point(0, 0),
                    new google.maps.Point(17, 34),
                    new google.maps.Size(29, 36))

                this.markers.forEach((item) => {
                    setTimeout(() => {
                        const marker = new google.maps.Marker({
                            position: { lat: item.latitude, lng: item.longitude },
                            map: this.mapObject,
                            icon: image
                        })
                        google.maps.event.addListener(marker, 'click', () => {
                            this.selectMarkerItem(item)
                        })
                    }, 200)
                })
            }
        },
        resetMarkersClickCancel () {
            if (this.selectedMarker) {
                this.searchFocusEvent()
            }
        },
        hideSelectedMarker() {
            this.selectedMarker = null
        },
        cleareSearchField() {
            this.search = ''
        },
        selectMarkerItem(item) {
            if(this.tab === 'map') {
                this.showList = true
                this.selectedMarker = item
                this.mapObject.goTo({
                    latitude: item.latitude,
                    longitude: item.longitude
                })
                setTimeout(() => {
                    this.updateHeight()
                })
            } else {
                if(this.selectedMarker && this.selectedMarker.branch === item.branch) {
                    this.selectedMarker = null;
                } else {
                    this.selectedMarker = item
                }
            }
        },
        async callbackMapReady(map) {
            this.mapObject = map

            const { latitude, longitude } = await this.getMyLocation() || {
                latitude: 42.882004, // TODO move to config app settings - defaultGeolocation
                longitude: 74.582748
            }
            this.mapObject.goTo({ latitude, longitude })
            this.mapObject.setZoom(12)
            this.mapLoaded = true
            this.addMarkers()
        },
        searchFocusEvent() {
            this.showList = true
            this.hideSelectedMarker()

            setTimeout(() => {
                this.openList()
            })
        },
        updateHeight () {
            const { adress } = this.$refs
            const timeline = new TimelineLite()
            const height = this.$refs.adressListWrapper.offsetHeight
            timeline.to(adress, timeAnim, {height: `${height + 30}px`, ease: typeAnim}, 0)
        },

        openList () {
            const { adress } = this.$refs
            const timeline = new TimelineLite()
            const height = this.$refs.adressListWrapper.offsetHeight

            timeline.to(adress, timeAnim, {height: `${height + 30}px`, ease: typeAnim}, 0)
        },
        closeList () {
            const { adress } = this.$refs
            const timeline = new TimelineLite()

            timeline.to(adress, timeAnim, {height: '24px', ease: typeAnim}, 0).call(() => {
                this.hideSelectedMarker()
            })
        },
        async goToMyLocation() {
            const { latitude, longitude } = await this.getMyLocation()

            this.showList = false
            this.closeList()
            this.hideSelectedMarker()

            this.mapObject.goTo({ latitude, longitude })
        },

        async getMyLocation() {
            try {
                const { latitude, longitude } = await Geolocation.getCurrentPosition()

                const myLatlng = new google.maps.LatLng(latitude, longitude)

                if (this.myLocationMarker) {
                    this.myLocationMarker.setPosition(myLatlng)
                } else {
                    this.myLocationMarker = new google.maps.Marker({
                        position: myLatlng,
                        map: this.mapObject,
                        animation: google.maps.Animation.DROP,
                        icon: {
                            url: MyLocationImg,
                            size: new google.maps.Size(24, 24),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(0, 0),
                            scaledSize: new google.maps.Size(24, 24)
                        }
                    })
                }
                return { latitude, longitude }
            } catch (e) {
                this.$Alert.Error(e)
            }
        },

        touchStart(event) {
            if (!this.isDrag && !this.isAnimation) {
                this.dragStart = event.targetTouches[0].clientY
                this.isDrag = true
            }
        },

        touchEnd(event) {
            if (this.isDrag && !this.isAnimation) {
                this.isDrag = false
                const dragEnd = event.changedTouches[0].clientY
                const swipeLength = this.dragStart - dragEnd

                if (!swipeLength) {
                    return
                }

                if (this.showList) {
                    if (swipeLength > 0 && swipeLength < 50) {
                        this.showList = true
                        this.openList()
                    } else if (swipeLength > 0) {
                        this.showList = false
                        this.closeList()
                    }
                } else {
                    if (swipeLength < 0 && swipeLength > -50) {
                        this.showList = false
                        this.closeList()
                    } else if (swipeLength < 0) {
                        this.showList = true
                        this.openList()
                    }
                }
            }
        },

        touchMove(event) {
            if (this.isDrag && !this.isAnimation) {
                let newY = 0

                if (this.dragStart === false) {
                    this.dragStart = event.targetTouches[0].clientY
                }

                if (this.showList) {
                    newY = (this.dragStart - event.targetTouches[0].clientY) * -1
                } else {
                    const h = this.$refs.adressListWrapper.offsetHeight
                    newY = -h + event.targetTouches[0].clientY - this.dragStart
                }

                this.setPosition(newY)
            }
        },
        setPosition (y) {
            const {adress} = this.$refs
            const height = this.$refs.adressListWrapper.offsetHeight + 30
            const heightAdress = height + y

            if (heightAdress > height) {
                return
            }

            adress.style.height = `${heightAdress}px`
        },
        scroll() {
            this.$refs.inputSearch.blur()
        }
    }
}
