/* eslint-disable */
// const upperFirst = require('lodash/upperFirst');
// const set = require('lodash/set');
// const get = require('lodash/get');
const isEmpty = require('lodash/isEmpty');
const isArray = require('lodash/isArray');

/**
 * generator web-font from SVG icons
 * @param grunt
 * @param wallet
 * @returns {{shell: {xcodebuild_xcarchive: {command: string}, xcodebuild_exportArchive: {command: string}, xcodebuild_exportArchiveA: {command: string}}}}
 */
module.exports = function({ grunt }) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    function _buildPayload(obj) {
        return Object.keys(obj).reduce((accumulator, objKey) => {
            return `${accumulator}${objKey}: "${obj[objKey]}",\n`;
        }, '');
    }

    try {
        const wallets = require('../../../wallets.js');

        Object.keys(wallets).forEach((walletKey) => {
            const walletName = wallets[walletKey];
            console.log(`docs generate for ${walletName}...`);
            let content = '';
            let navigation = '';
            let indexNavigation = 1;

            const config = require(`../../../projects/${walletName}/config.app.js`);
            const PROD = config.Environment.PROD;
            content += `## ${config.name}\n`;

            let paySystemString = '';
            if(PROD.meta[0].typeCards) {
                const _paySystemString = PROD.meta[0].typeCards.reduce((a, b) => {
                    let stringSystem = '';
                    if (a) {
                        stringSystem += `${a}, `;
                    }

                    stringSystem += `${b.name}(id:${b.id})`;
                    return stringSystem;
                }, '');

                paySystemString = `| **Payment systems** | ${_paySystemString} | Payment instruments that are integrated into the system |`;
            }

            content += `| Key | Value | Info |
| ------ | :------: | ------ |
| **Currency** | ${PROD.meta[0].currency} | Primary application currency for all financial transactions |
| **Default language** | ${PROD.lang} | The application's default language, if the application did not determine the language on the phone or the installed language on the phone does not match the available languages, then the default language is set |
| **Available languages** | ${PROD.languages.toString()} | Available application localization |
${paySystemString}\n\n`;

            Object.keys(config.Environment).forEach((envKey) => {
                const configEnv = config.Environment[envKey];

                navigation += `[${indexNavigation++}. Application environment: ${envKey}](#application-environment-${envKey.toLowerCase()})  \n`;
                content += `
### Application environment: ${envKey}
Name application: \`${configEnv.nameApp}\`   
BundleID: \`${configEnv.bundleID}\`   

#### API mWallet
\`\`\`javascript
${_buildPayload(configEnv.meta[0].API)}
\`\`\`\n`;

                if (configEnv.meta[0].mobiGift) {
                    content += `
#### API MobiGift
\`\`\`javascript
${_buildPayload(configEnv.meta[0].mobiGift)}
\`\`\`\n`;
                }
            });

            // TEST DATA
            const pathTestData = `./projects/${walletName}/test-data.js`;
            if (grunt.file.exists(pathTestData)) {
                const {
                    admin,
                    hockeyapp,
                    invision,
                    testFlight,
                    testData,
                    docs,
                } = require(`../../.${pathTestData}`);

                if (admin && !isEmpty(admin)) {
                    Object.keys(admin).forEach((adminKey) => {
                        const adminEnv = admin[adminKey];

                        navigation += `[${indexNavigation++}. Admin panel to ${adminKey}](#admin-panel-to-mwallet-${adminKey.toLowerCase()})  \n`;
                        content += `## Admin panel to ${adminKey}\n`;

                        if (adminKey === 'mWallet') {
                            content += '> Admin panel - control panel of service entities. Designed to use by system administrators. Allows you to perform necessary settings, view operations history and generate reports. There are two types of admin panels in the mWallet system: control administrator panel and control merchant panel.   \n\n';
                            content += '> Control Administrator Panel (web interface) to use by system administrator. Contains the system manage functionality: interaction with the customer mobile application, managements of the merchants, users and other entities.   \n\n';
                            content += '> Control Merchant Panel (web interface) to use by a particular merchant. Contains functionality to manage the entities of this merchant: viewing statistic, billing, sales point managing, etc.   \n';
                        } else if (adminKey === 'eWallet') {
                            content += '> Admin panel is a control panel to manage service’s entities. It is designed for system administrator’s usage. It allows configuring the system, viewing transaction history, and generating reports.   \n';
                        }
                        content += '\n';

                        Object.keys(adminEnv).forEach((adminEnvKey) => {
                            const adminEnvConfig = adminEnv[adminEnvKey];

                            content += `#### Environment: ${adminEnvKey.toUpperCase()}\n\n`;
                            content += `**Link**: ${adminEnvConfig.url}   \n`;
                            content += `**Login**: \`${adminEnvConfig.login}\`   \n`;
                            content += `**Password**: \`${adminEnvConfig.pass}\`   \n`;
                            content += '\n------    \n\n';
                        });
                    });
                }

                if (hockeyapp && !isEmpty(hockeyapp)) {
                    navigation += `[${indexNavigation++}. HockeyApp](#hockeyapp)  \n`;
                    content += '## <img src="https://dotnetco.de/wp-content/uploads/2017/02/HockeyApp-logo.jpeg" width="50px"> HockeyApp\n\n';
                    Object.keys(hockeyapp).forEach((hockeyappEnvKey) => {
                        const hockeyappEnv = hockeyapp[hockeyappEnvKey];

                        content += `#### HockeyApp environment: ${hockeyappEnvKey.toUpperCase()}\n\n`;
                        content += `**Android**: ${hockeyappEnv.android}   \n`;
                        content += `**iOS**: ${hockeyappEnv.ios}   \n`;

                        content += '\n------    \n\n';
                    });
                }

                if (invision && !isEmpty(invision)) {
                    navigation += `[${indexNavigation++}. Invision](#invision)  \n`;
                    content += '## <img src="http://market.designmodo.com/wp-content/uploads/2015/06/invision-logo.png" width="50px"> Invision\n\n';
                    content += `**Layout link**: ${invision.link}   \n`;
                    content += `**Link to interactive layout**: ${invision.prototypeLink}   \n`;
                    content += '\n------    \n\n';
                }

                if (testFlight) {
                    navigation += `[${indexNavigation++}. TestFlight](#testflight)  \n`;
                    content += '## <img src="https://developer.apple.com/assets/elements/icons/testflight/testflight-128x128_2x.png" width="50px"> TestFlight\n\n';
                    content += `**link**: ${testFlight}   \n`;
                    content += '\n------    \n\n';
                }

                if (testData && !isEmpty(testData)) {
                    navigation += `[${indexNavigation++}. Test data for testing](#test-data-for-testing)  \n`;
                    content += '## <img src="http://www.sclance.com/pngs/credit-card-icon-png/credit_card_icon_png_341378.png" width="50px"> Test data for testing\n\n';

                    if (testData.cards) {
                        testData.cards.forEach((item) => {
                            content += `#### ${item.title}\n\n`;
                            content += `**Number**: ${item.number}   \n`;
                            content += `**Date**: ${item.date}   \n`;
                            content += `**CVV**: ${item.cvv}   \n`;
                        });
                    }
                    content += '\n------    \n\n';
                }

                if (docs && !isEmpty(docs)) {

                }

                if (docs && !isEmpty(docs)) {

                }

                //
                // <details>
                //     <summary>How do I dropdown?</summary>
                //
                //     DFSDFSDF
                //
                //     </details>

            }

            // RELEASE NOTE
            const pathChangelog = `./projects/${walletName}/CHANGELOG.js`;
            if (grunt.file.exists(pathChangelog)) {
                const changelog = require(`../../.${pathChangelog}`);
                let releaseNote = '';
                const titleNewFeatures = 'New Features';
                const titleBugFixes = 'Bug Fixes';

                changelog.forEach((item) => {
                    const { newFeatures, bugFixes, version } = item;

                    const _build = (array, title) => {
                        let result = '';
                        if (isArray(array) && array.length) {
                            const log = array.map(name => `- ${name}`).join('\n');
                            if (title) {
                                result += `##### ${title} (${array.length} changes)\n`;
                            }

                            result += `${log}\n\n`;
                        }

                        return result;
                    };

                    releaseNote += `<details><summary>\n<h5>${walletName} v${version}</h5>\n</summary>\n\n`;

                    releaseNote += _build(newFeatures, titleNewFeatures);
                    releaseNote += _build(bugFixes, titleBugFixes);

                    releaseNote += '\n</details>\n';
                });
                navigation += `[${indexNavigation++}. Changelog](#changelog)  \n`;
                content += '## <img src="https://static.thenounproject.com/png/84467-200.png" width="50px"> Changelog\n\n';
                content += releaseNote;
            }
            content = `${navigation}\n\n${content}`;
            grunt.file.write(`./docs/mWallet_v4.wiki/Projects/${walletName}.md`, content);
        });
    }
    catch (e) {
        console.log(e);
    }
};
