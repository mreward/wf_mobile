import constants from '_vuex_constants'
import { get } from 'lodash'
import asyncForEach from '_CORE/utils/promise/forEach'

export const plugin = async (store) => {
    await asyncForEach(Object.keys(constants), async module => {
        const action = get(constants, `${module}.Actions.initHook`)
        if (action) {
            await store.dispatch(action)
        }
    })
}
