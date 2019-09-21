import { isFunction } from 'lodash'

export default (fn) => {
    if (isFunction(fn)) {
        fn()
    } else {
        console.error('Param fn not function')
    }
}
