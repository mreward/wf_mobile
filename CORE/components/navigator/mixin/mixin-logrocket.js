import LogRocket from 'logrocket'

export default {
    watch: {
        user: {
            immediate: true,
            handler(data) {
                console.log('LogRocket.identify')
                if (!data || !data.profile) return
                // This is an example script - don't forget to change it!
                LogRocket.identify(data.profile.account_id, {
                    name: `${data.profile.fname} ${data.profile.lname}`,
                    email: data.profile.email,
                    accountId: data.profile.account_id,
                    mobile: data.profile.mobile
                })
            }
        }
    }
}
