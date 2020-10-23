<template>
    <div class="card card--vertical">
        <div
            class="card__image"
            :style="{ backgroundImage: `url(${ item.img })` }"
        />

        <div class="card__wrapper">
            <template v-if="!$slots.content">
                <div class="card__title">
                    {{ item.title }}
                </div>
                <div class="card__subtext">
                    {{ item.data }}
                </div>
            </template>

            <slot
                name="content"
            />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'product-card',
        props: {
            item: {
                type: Object,
                default: () => ({})
            }
        }
    }
</script>
