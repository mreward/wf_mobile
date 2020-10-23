<template>
    <div class="toolbar-main__title">
        {{ title }}
    </div>
</template>

<script>
    export default {
        name: 'toolbar-title',
        props: {
            title: {
                type: String,
                default: ''
            }
        }
    }
</script>
