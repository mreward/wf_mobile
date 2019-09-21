import { get, isArray, isObject, merge, isString } from 'lodash'

export default (context, customData) => {
    const {
        data: { class: classes, nativeOn, ...data } = { class: [], nativeOn: [] },
        props
    } = context

    const { defaultClass, ...custom } = customData

    const defaults = { class: {}, on: { ...nativeOn }, props }

    if (isArray(classes)) {
        defaults.class = merge(...classes)
    } else if (isObject(classes)) {
        defaults.class = classes
    } else if (isString(classes)) {
        defaults.class[classes] = true
    }

    if (defaultClass) {
        defaults.class[defaultClass] = true

        const modifier = get(props, 'modifier') || get(data, 'attrs.modifier')
        defaults.modifier = modifier

        if (modifier) {
            defaults.class[`${defaultClass}--${modifier}`] = true
        }
    }

    return merge(data, defaults, custom)
}
