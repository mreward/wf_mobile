import { mapActions, mapGetters } from 'vuex'
import constants from '_vuex_constants'
import { TweenLite } from 'gsap/TweenMax'

export default {
    data: () => ({
        carouselIndex: 0,
        lengthSteps: 5,
        dots: {

            textAlign: 'center',
            fontSize: '30px',
            color: '#fff',
            position: 'absolute',
            bottom: '40px',
            left: 0,
            right: 0
        },
        heightDot: -1000,
    }),
    computed: {
        ...mapGetters({
            moduleOptions: constants.App.Getters.moduleOptions
        }),

        lastScreen() {
            return this.items.length - 1 === this.carouselIndex
        },
    },
    watch: {
        carouselIndex(index) {
            const background = this.$refs.background

            TweenLite.to(background, 0.7, {
                background: this.items[index].background
            })
        }
    },
    mounted() {
        const background = this.$refs.background

        TweenLite.set(background, {
            background: this.items[0].background
        });

        if(this.$refs['intro0']) {
            const a  = this.$refs['intro0']
        }
    },
    methods: {
        ...mapActions({
            pushPage: constants.App.Actions.pushPage,
            setOnBoarding: constants.OnBoarding.Actions.setOnBoarding
        }),
        async goToNext() {
            this.$bus.$emit('goToPage', { page: 'auth' })

            await this.setOnBoarding()
        },

        getImage(item) {
            if (window.device && device.platform.toLowerCase() === 'android') {
                return item.imgAndroid
            }

            return item.imgIos
        }
    }
}
