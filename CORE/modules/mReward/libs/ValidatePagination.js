import { store } from '_CORE/store'

export default (response, action) => {
    if (response._meta.currentPage < response._meta.pageCount) {
        const page = response._meta.currentPage + 1
        store.dispatch(action, { page }, { root: true })
    }
}
