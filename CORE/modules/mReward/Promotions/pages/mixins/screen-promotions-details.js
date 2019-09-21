import moment from 'moment'

export default {
    props: {
        promotions: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        createdDate() {
            return moment(this.promotions.item.created, 'X').format('DD MMMM, YYYY')
        }
    }
}
