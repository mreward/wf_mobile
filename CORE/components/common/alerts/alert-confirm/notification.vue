<template>
    <div class="notification-item">
        <div
            v-if="header"
            class="notification-item__header"
            @click="$emit('cancel')"
        >
            {{ $t('m_new_message') }}
        </div>
        <div class="notification-item__body">
            <div class="notification-item__content">
                <v-ons-icon
                    class="notification-item__icon"
                    :icon="icon"
                />
                <div class="notification-item__title-wrap">
                    <div class="notification-item__title">
                        {{ item.title || item.notification_title }}
                    </div>
                    <div class="notification-item__time">
                        {{ formatTime(item.data.date) }}
                    </div>
                </div>
                <div class="notification-item__text">
                    {{ item.body || item.notification_body }}
                </div>
            </div>
            <div
                class="alert__buttons"
                :class="{'is-length': cancelName.length || nextName.length >= 10}"
            >
                <div>
                    <v-ons-button
                        class="alert__button-primary"
                        @click="$emit('next')"
                    >
                        {{ nextName }}
                    </v-ons-button>
                </div>
                <div v-show="cancelName">
                    <v-ons-button
                        class="alert__button-cancel"

                        modifier="quiet"
                        @click="$emit('cancel')"
                    >
                        {{ cancelName }}
                    </v-ons-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'

    export default {

        name: 'alert-confirm-notification',
        props: {
            header: {
                type: String,
                default: ''
            },
            icon: {
                type: String,
                default: ''
            },
            img: {
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
            item: {
                type: Object,
                default: () => ({})
            },
            nextName: {
                type: String,
                default: ''
            },
            cancelName: {
                type: String,
                default: ''
            }
        },
        methods: {
            formatTime(date) {
                return moment(date).format('hh:mm')
            }
        }
    }
</script>
