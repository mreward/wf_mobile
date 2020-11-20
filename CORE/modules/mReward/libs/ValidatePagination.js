import { store } from '_CORE/store'

export default async (response, action, payload) => {
    if (response._meta && (response._meta.currentPage < response._meta.pageCount)) {
        const page = response._meta.currentPage + 1
        await store.dispatch(action, {...payload, page}, { root: true })
    }
}
