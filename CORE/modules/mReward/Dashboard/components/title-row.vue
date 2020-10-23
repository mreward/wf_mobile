<template>
    <div class="title-row">
        {{ title }}

        <slot name="action">
            <template v-if="action">
                <button-base
                    type="text"
                    @click="onClick($event)"
                >
                    {{ action }}
                </button-base>
            </template>
        </slot>
    </div>
</template>

<script>
    export default {
        name: 'title-row',

        props: {
            action: {
                type: [String, Boolean],
                default: ''
            },

            title: {
                type: String,
                default: ''
            }
        },
        methods: {
            onClick($event) {
                this.$emit('click', $event)
            }
        }
    }
</script>
