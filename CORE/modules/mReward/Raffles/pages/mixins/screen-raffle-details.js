import _get from 'lodash/get'

export default {
    data() {
        return {
            showAllDibs: false
        }
    },
    computed: {
        dibsView() {
            const dibsView = []

            for (let index = 0; index < this.raffleData.dibs.length; index += 2) {
                let dibsRow = `${this.raffleData.dibs[index].number}`

                const isNextDibReal = _get(this.raffleData, `dibs[${index + 1}]`, false)
                if (isNextDibReal) {
                    dibsRow += `, ${isNextDibReal.number}`
                }

                dibsView.push(dibsRow)

                if (!this.showAllDibs && dibsView.length === 3) {
                    break
                }
            }

            return dibsView
        }
    }
}
