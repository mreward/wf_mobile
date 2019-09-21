import moment from 'moment'

export default {
    props: {
        news: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        createdDate() {
            return moment(this.news.date, 'X').format('DD MMMM, YYYY')
        }
    }
}
