export default {
    Mutations: {
        Balance: {
            name: 'BALANCE',
            nameGlobal: 'MrewardAccount/BALANCE'
        },
        Accounts: {
            name: 'ACCOUNTS',
            nameGlobal: 'MrewardAccount/ACCOUNTS'
        },
        SelectedAccount: {
            name: 'SELECTED_ACCOUNT',
            nameGlobal: 'MrewardAccount/SELECTED_ACCOUNT'
        }
    },
    Actions: {
        getBalance: 'MrewardAccount/getBalance',
        getAccounts: 'MrewardAccount/getAccounts',
        saveSelectedAccount: 'MrewardAccount/saveSelectedAccount',
        getSelectedAccount: 'MrewardAccount/getSelectedAccount'
    },
    Getters: {
        balance: 'MrewardAccount/balance',
        accounts: 'MrewardAccount/accounts'
    }
}
