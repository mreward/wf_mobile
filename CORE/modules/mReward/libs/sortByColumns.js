import _cloneDeep from 'lodash/cloneDeep'

/**
 * sort list to render with css columns property
 * 1 5      1 2
 * 2 6 ---> 3 4
 * 3 7      5 6
 * 4        7
 * @param list
 */
export default (list) => {
    const listCopy = _cloneDeep(list)
    const halfLength = Math.ceil(listCopy.length / 2) - 1

    const sortedList = []
    listCopy.forEach((item, index) => {
        if (index % 2 === 1) {
            sortedList[halfLength + Math.ceil(index / 2)] = listCopy[index]
        } else if (index % 2 === 0) {
            sortedList[index / 2] = listCopy[index]
        }
    })
    return sortedList
}
