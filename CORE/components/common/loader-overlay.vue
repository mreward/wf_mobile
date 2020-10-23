<template>
    <div
        class="loader-overlay"
        :disable="isLoading"
        :class="{'loader-overlay--mask' : hasOverlay}"
        :style="styleWrapper"
    >
        <template v-if="isLoading">
            <div
                v-if="loader"
                class="loader-overlay__loader"
            >
                <slot name="loader">
                    <ons-progress-circular
                        indeterminate
                    />
                </slot>
            </div>
        </template>
        <slot />
    </div>
</template>

<script>
    export default {
        name: 'loader-overlay',
        props: {
            isLoading: {
                type: Boolean,
                default: false
            },
            loader: {
                type: [Boolean],
                default: true
            },
            overlay: {
                type: [String, Boolean],
                default: 'rgba(0, 0, 0, .2)'
            }
        },
        computed: {
            hasOverlay() {
                return this.isLoading && this.overlay
            },
            styleWrapper() {
                if (this.hasOverlay) {
                    return { color: this.overlay }
                }
            }
        }
    }
</script>
