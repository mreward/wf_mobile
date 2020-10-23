/**
 * SplashScreen plugin shows or hides custom 'SplashScreen' which is to be in index.html
 *
 * @example
 * <caption>-----</caption>
 * import SplashScreen from '_CORE/plugins/common/SplashScreen';
 *
 * Vue.prototype.$SplashScreen = SplashScreen;
 *
 * this.$SplashScreen.Show();
 * this.$SplashScreen.Hide();
 */
export default {
    Show() {
        const splashScreen = document.getElementById('splashScreen')
        if (splashScreen) {
            splashScreen.style.display = 'flex'
        }
    },
    Hide() {
        const splashScreen = document.getElementById('splashScreen')
        if (splashScreen) {
            splashScreen.style.display = 'none'
        }
    }
}
