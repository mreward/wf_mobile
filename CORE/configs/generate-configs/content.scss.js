module.exports = function(scss) {
    let styleImport = ''

    scss.forEach((item) => {
        styleImport += `@import "~${item}";\n`
    })

    return styleImport
}
