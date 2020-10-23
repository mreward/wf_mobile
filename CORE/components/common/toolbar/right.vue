<template>
    <div>
        <template v-if="icon">
            <v-ons-icon :icon="icon" />
        </template>
        <template v-else>
            <v-ons-button
                @click="buttonEvent"
            >
                {{ label }}
            </v-ons-button>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'toolbar-right',
        props: {
            icon: {
                type: String,
                default: ''
            },
            buttonEvent: {
                type: Function,
                default: () => {}
            },
            label: {
                type: String,
                default: ''
            }
        }
    }
</script>
