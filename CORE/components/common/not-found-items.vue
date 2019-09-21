<template>
    <div class="not-found-items">
        <template v-if="isLoading">
            <ons-progress-circular indeterminate />
        </template>
        <template v-else>
            <div class="not-found-items__icon">
                <v-ons-icon
                    v-if="icon"
                    :icon="icon"
                />
            </div>
        </template>
        <div
            v-if="message"
            class="not-found-items__text"
        >
            {{ message }}
        </div>
        <slot
            v-if="$slots.name"
            name="content"
        />
        <v-ons-row
            class="not-found-items__action-button"
        >
            <slot
                name="action"
            >
                <v-ons-button
                    v-if="action"
                    class="button--primary"
                    @click="$emit('click', $event)"
                >
                    {{ action }}
                </v-ons-button>
            </slot>
        </v-ons-row>
    </div>
</template>

<script>
    export default {
        name: 'not-found-items',
        props: {
            icon: {
                type: String,
                default: ''
            },
            message: {
                type: String,
                default: ''
            },
            action: {
                type: String,
                default: ''
            },
            isLoading: {
                type: Boolean,
                default: false
            }
        }
    }
</script>
