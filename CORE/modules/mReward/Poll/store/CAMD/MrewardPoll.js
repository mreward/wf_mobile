export default {
    Mutations: {
        Polls: {
            name: 'POLLS',
            nameGlobal: 'MrewardPoll/POLLS'
        }
    },
    Actions: {
        getPolls: 'MrewardPoll/getPolls',
        setAnswer: 'MrewardPoll/setAnswer'
    },
    Getters: {
        polls: 'MrewardPoll/polls'
    }
}
