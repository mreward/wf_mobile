<template>
    <form
        class="form"
        @submit.prevent="submitEvent"
    >
        <form-list>
            <slot />
        </form-list>
    </form>
</template>

<script>
    export default {
        name: 'form-base',
        props: {
            submitEvent: {
                type: Function,
                default: event => event
            }
        }
    }
</script>
