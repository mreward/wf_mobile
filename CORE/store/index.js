import Vuex from 'vuex'
import Vue from 'vue'
import modules from '_vuex_modules'
import { plugin as hooksPlugin } from '_CORE/store/plugins/hooks'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        ...modules
    },
    plugins: [
        hooksPlugin
    ]
})

/**
 * Reset Vuex Store
 * TODO: Use it in logout without reloading
 */
const initialStateCopy = JSON.parse(JSON.stringify(store.state))

export function resetState() {
    store.replaceState(JSON.parse(JSON.stringify(initialStateCopy)))
}
