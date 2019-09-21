export default {
    methods: {
        goToPage(page, data) {
            this.$bus.$emit('goToPage', { page, data })
        }
    }
}
