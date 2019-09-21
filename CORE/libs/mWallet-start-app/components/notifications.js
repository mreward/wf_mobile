import Vue from 'vue'
import get from 'lodash/get'
import moment from 'moment'

export default {
    init() {
        // Firebase notifications
        function _successInit() {
            function _getToken() {
                FirebasePlugin.getToken((token) => {
                    // save this server-side and use it to push notifications to this device
                    console.log('FirebasePlugin getToken', token)
                    const payload = {
                        pushKey: token,
                        os: device.platform
                    }
                    // TODO: переделать в событие и контроль пушкея пернести на приложение / навигатор

                    Vue.prototype.$bus.$emit('VUEX:setPushToken', payload)
                }, (error) => {
                    console.error('FirebasePlugin getToken Error: ', error)
                })
            }
            if (device.platform.toLowerCase() === 'ios' && FirebasePlugin.grantPermission && FirebasePlugin.hasPermission) {
                window.FirebasePlugin.hasPermission((hasPermission) => {
                    if (!hasPermission || !hasPermission.isEnabled) {
                        FirebasePlugin.grantPermission(() => {
                            console.log('FirebasePlugin: Permission granted true')
                            _getToken()
                        }, (error) => {
                            console.error('FirebasePlugin: unable to grant permission', error)
                        })
                    }
                })
            } else {
                _getToken()
            }

            window.FirebasePlugin.setBadgeNumber(0)

            const onNotificationOpenSuccess = (notification) => {
                console.log(notification)

                const push = {
                    ...notification,
                    ...get(notification, 'aps.alert', {}),
                    data: get(notification, 'data', {
                        date: moment()
                    })
                }

                Vue.prototype.$bus.$emit('pushNotification', push)
                window.FirebasePlugin.setBadgeNumber(0)
            }

            const onNotificationOpenError = (error) => {
                console.error('FirebasePlugin onNotificationOpen Error: ', error)
            }

            if (window.FirebasePlugin.onNotificationOpen) {
                window.FirebasePlugin.onNotificationOpen(onNotificationOpenSuccess, onNotificationOpenError)
            } else if (window.FirebasePlugin.onMessageReceived) {
                window.FirebasePlugin.onMessageReceived(onNotificationOpenSuccess, onNotificationOpenError)
            }

            let _pushData = null

            function _pushNotification(push) {
                _pushData = push
            }

            function _initPushNotification() {
                Vue.prototype.$bus.$off('pushNotification', _pushNotification)
                if (_pushData) {
                    const push = {
                        ..._pushData,
                        ...get(_pushData, 'aps.alert', {}),
                        data: get(_pushData, 'data', {
                            date: moment()
                        })
                    }

                    Vue.prototype.$bus.$emit('pushNotification', push)
                    _pushData = null
                }
            }

            Vue.prototype.$bus.$on('pushNotification', _pushNotification)
            Vue.prototype.$bus.$on('initPushNotification', _initPushNotification)
        }

        if (window.FirebasePlugin) {
            if (typeof FirebasePlugin.initFirebase === 'function') {
                FirebasePlugin.initFirebase(_successInit, (error) => {
                    console.error('FirebasePlugin initFirebase Error: ', error)
                })
            } else {
                _successInit()
            }
        }
    }

}
