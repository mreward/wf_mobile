<template>
    <div class="form__item">
        <v-ons-list-header v-if="label">
            {{ label }}
            <span v-if="required">
                *
            </span>
        </v-ons-list-header>
        <v-ons-list-item>
            <slot />
        </v-ons-list-item>
    </div>
</template>
<script>
    export default {
        name: 'form-item',
        props: {
            label: {
                type: String,
                default: ''
            },
            required: {
                type: Boolean,
                default: false
            }
        }
    }
</script>
