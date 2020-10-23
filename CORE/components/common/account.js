import maskPhone from '_CORE/utils/maskPhone'
import maskCard from '_CORE/filters/maskCard'
import parseAccount from '_CORE/utils/parseAccount'
import provideData from '../utils/provideData'

export default {
    name: 'account',
    functional: true,
    props: {
        account: {
            type: [String, Number],
            default: ''
        },
        type: {
            type: [String, Boolean],
            default: ''
        }
    },
    render(createElement, context) {
        const account = `${parseAccount(context.props.account)}`
        const data = provideData(context, {
            defaultClass: 'account'
        })

        const defaultSlot = (data, children) => {
            return createElement('span', data, [children])
        }

        if (!account) {
            return defaultSlot(data, context.props.account)
        }

        const isCard = card => card.length === 16
        let type = context.props.type
        if (type !== false && (type !== 'card' || type !== 'mobile')) {
            if (isCard(account)) {
                type = 'card'
            }

            const isPhoneNumber = !!parseInt(account, 10)
            if (isPhoneNumber && account.length < 16) {
                type = 'mobile'
            }
        }
        let children

        switch (type) {
            case 'mobile':
                data.props.account = account
                children = maskPhone(account)
                // return createElement('account-phone', data, account)
                break
            case 'card':
                children = maskCard(account)
                break
            default:
                children = context.props.account
                break
        }

        return defaultSlot(data, children)
    }
}
