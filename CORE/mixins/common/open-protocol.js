import { get } from 'lodash'

export default {
    methods: {
        openProtocol(value, type) {
            let url = value
            if (!url) {
                return
            }

            if (type) {
                switch (type) {
                    case 'maps':
                        url = `http://maps.google.com/?q=${get(value, 'latitude')},${get(value, 'longitude')}`
                        window.open(url, '_system')
                        break
                    case 'email':
                        url = `mailto:${value}`
                        window.open(url, '_system')
                        break
                    case 'tel':
                        if (window.device && window.device.platform.toLowerCase() === 'ios') {
                            window.location.href = `tel://${value}`
                        } else {
                            window.open(`tel:${value}`, '_system')
                        }
                        break
                    default:
                        url = `${type}:${value}`
                        window.open(url, '_system')
                        break
                }
            } else {
                try {
                    this.$bus.$emit('goToPage', JSON.parse(url))
                } catch (e) {
                    window.open(url, '_system')
                }
            }
        }
    }
}
