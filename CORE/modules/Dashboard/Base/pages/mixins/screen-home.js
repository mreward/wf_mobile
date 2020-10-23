export default {
    data: () => ({
        currentPageTab: 'screen-home-tab'
    }),
    created() {
        this.$bus.$on('home:goToTab', this.setCurrentPageTab)
    },
    beforeDestroy() {
        this.$bus.$off('home:goToTab', this.setCurrentPageTab)
    },
    methods: {
        setCurrentPageTab(tab) {
            if (tab) {
                this.$bus.$emit('currentTab', tab)
                this.currentPageTab = tab
            }
        },
        classTab(classStyle) {
            if(typeof classStyle === 'string') {
                return classStyle ? `tabbar__item--${classStyle}` : ''
            } else {
                return classStyle || ''
            }
        },
        tabIcon(tab) {
            return this.currentPageTab === tab.key ? tab.iconActive || tab.icon : tab.icon
        },
        clickTab(tab) {
            this.$bus.$emit('currentTab', tab)
            this.currentPageTab = tab
        },
        goToPage(page) {
            this.$bus.$emit('goToPage', { page })
        }
    }
}
