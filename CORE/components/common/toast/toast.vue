<template>
    <v-ons-toast
        :visible.sync="toastVisible"
        :animation="animation"
        @click="$bus.$emit('goToDetailsByType', typeData)"
    >
        <div class="toast-wrap">
            <div class="icon-wrap">
                <v-ons-icon
                    :icon="icon"
                />
            </div>
            <div>
                <div
                    v-show="title"
                    class="toast-title"
                >
                    {{ title }}
                </div>
                <div v-show="text">
                    {{ text }}
                </div>
                <div
                    v-if="time"
                    class="text--muted"
                >
                    {{ formatTime(time) }}
                </div>
            </div>
        </div>
    </v-ons-toast>
</template>

<script>
    import moment from 'moment'
    import VOnsIcon from '_CORE/components/onsenui/v-ons-icon'
    export default {
        name: 'toast',
        components: {VOnsIcon},
        props: {
            icon: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            text: {
                type: String,
                default: ''
            },
            time: {
                type: String,
                default: ''
            },
            animation: {
                type: String,
                default: 'fall'
            },
            toastVisible: {
                type: Boolean,
                default: false
            },
            typeData: {
                type: Object,
                default: () => ({})
            }
        },
        methods: {
            formatTime(date) {
                return moment(date).format('DD MMMM, HH:mm')
            }
        }
    }
</script>

<style scoped>

</style>
