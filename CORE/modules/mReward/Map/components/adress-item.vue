<template>
    <v-ons-list class="list--transparent list--vertical margin-top--middle">
        <v-ons-list-item>
            <div class="left">
                {{ item.name }}
            </div>
            <div class="center">
                {{ item.address }}
            </div>
            <div class="right text--primary">
                {{ convertToKm(item.distance) }}
                <div class="status">
                    {{ getOpenStatus(item.time_from, item.time_to) }}
                </div>
            </div>
        </v-ons-list-item>

        <v-ons-list-item
            v-if="selected"
            class="list-item--adress"
        >
            <div class="left">
                <v-ons-icon icon="time" />

                {{ $t('m_adresses_from') }} {{ item.time_from }} {{ $t('m_adresses_to') }} {{ item.time_to }}
            </div>
            <div
                v-if="item.phones.length"
                class="center"
            >
                <v-ons-icon icon="phone" />

                <span
                    v-for="(phone, index) in item.phones"
                    :key="index"
                    @click="openProtocol(phone, 'tel')"
                >
                    {{ phone }}
                </span>
            </div>

            <div class="right">
                <v-btn
                    class="margin-vertical--small-base"
                    depressed
                    color="primary"
                    type="main"
                    block
                    @click="openLinkMapUrl"
                >
                    {{ $t('m_adresses_get_route') }}
                </v-btn>
            </div>
        </v-ons-list-item>
    </v-ons-list>
</template>

<script>
    import MixinOpenProtocol from '_CORE/mixins/common/open-protocol'
    import moment from 'moment'
    import Geolocation from '_CORE/plugins/common/Geolocation'

    export default {
        name: 'adress-item',
        mixins: [
            MixinOpenProtocol
        ],
        props: {
            item: {
                type: Object,
                default: () => {}
            },
            selected: {
                type: Boolean,
                default: false
            },
        },
        methods: {
            convertToKm(num) {
                if (num) {
                    if (num >= 1000) {
                        return `${(num / 1000).toFixed(1)} ${this.$t('m_adresses_km')}`
                    }
                    return `${num.toFixed(1)} ${this.$t('m_adresses_m')}`
                }
            },
            getOpenStatus(timeFrom, timeTo) {
                const currentTime = new moment().format('HH:mm')
                if (moment(currentTime, 'HH:mm').isAfter(moment(timeFrom, 'HH:mm')) && moment(currentTime, 'HH:mm').isBefore(moment(timeTo, 'HH:mm'))) {
                    return this.$t('m_adresses_now_open')
                }
                return this.$t('m_adresses_closed')
            },
            async openLinkMapUrl() {
                try {
                    if (window.cordova) {
                        const { latitude: latitudeStart, longitude: longitudeStart } = await Geolocation.getCurrentPosition()
                        const addresStart = `${latitudeStart},${longitudeStart}`

                        const { latitude: latitudeEnd, longitude: longitudeEnd } = this.item
                        const addresEnd = `${latitudeEnd},${longitudeEnd}`

                        this.openProtocol(`https://www.google.com/maps?saddr=${addresStart}&daddr=${addresEnd}&dirflg=d`)
                    }
                } catch (e) {
                    this.$Alert.Error(e)
                }
            }
        }
    }
</script>

<style scoped>

</style>
