import constants from '_vuex_constants'
import Vue from 'vue'

export const __processingBlockedUser = (dispatch) => (
    new Promise(() => {
        Vue.prototype.$bus.$emit(
            'goToPage',
            {
                page: 'contacts',
                methods: {
                    onShow: () => {
                        Vue.prototype.$Alert.Confirm({
                            title: Vue.prototype.$polyglot._translate('m_auth_blocked'),
                            text: Vue.prototype.$polyglot._translate('m_auth_blocked_text'),
                            nextName: Vue.prototype.$polyglot._translate('m_auth_blocked_button')
                        })
                    },
                    onBack: () => {
                        dispatch(constants.User.Actions.logout, {}, {root: true})
                    }
                }
            }
        )
    })
)
