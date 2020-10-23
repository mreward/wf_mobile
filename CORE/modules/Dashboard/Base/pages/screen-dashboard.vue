<template id="screen-dashboard">
    <screen-home />
</template>
<script>
    import ScreenHome from '_screen_home'
    import MixinsScreenDashboard from '_mixins_screen_dashboard'

    export default {
        name: 'screen-dashboard',
        components: {
            ScreenHome
        },
        mixins: MixinsScreenDashboard
    }
</script>
