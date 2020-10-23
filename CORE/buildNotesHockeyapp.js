const isArray = require('lodash/isArray')

/**
 * Release Note (CHANGELOG)
 * @param changelog
 */
const changelogCore = require('../CORE/CHANGELOG')

function buildNotesHockeyapp(changelog) {
    const titleNewFeatures = 'New Features'
    const titleBugFixes = 'Bug Fixes'

    let releaseNote = ''
    if (isArray(changelog)) {
        const { newFeatures, bugFixes } = changelog[0]
        // const { version } = changelogCore[0]
        const { newFeatures: newFeaturesCore, bugFixes: bugFixesCore, version } = changelogCore[0]

        const _build = (array, title) => {
            let result = ''
            if (isArray(array) && array.length) {
                const log = array.map(name => `- ${name}`).join('\n')
                if (title) {
                    result += `##### ${title} (${array.length} changes)\n`
                }

                result += `${log}\n\n`
            }

            return result
        }

        releaseNote += _build(newFeatures, titleNewFeatures)
        releaseNote += _build(bugFixes, titleBugFixes)

        releaseNote += '---\n'
        releaseNote += `#### CORE v${version}\n`
        releaseNote += _build(newFeaturesCore, titleNewFeatures)
        releaseNote += _build(bugFixesCore, titleBugFixes)

        // Проверять длинну при комите
        releaseNote += '---\n'
        // releaseNote += `${releaseNote.length + 15} / 5000`;
    }

    return releaseNote
}

module.exports = buildNotesHockeyapp
