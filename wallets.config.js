/* eslint-disable import/no-dynamic-require */
const walletType = require('./wallets')
module.exports.appleConnectId = 'euwalletfactory@gmail.com'
module.exports.appleConnectKey = 'hwey-qwnw-rzxm-ejpb'
module.exports.keyHockeyApp = '85d20fdb18b74fa2840e64fa171856aa'

let wallet = walletType.Kulikovsky

if (process.env.WALLET) {
    wallet = walletType[process.env.WALLET]
}

module.exports.walletName = wallet

// <--- auto generate --->
module.exports.dateBuild = 1568991620960
module.exports.versionCode = '40920'
module.exports.wallet = require('./projects/Kulikovsky/config.app.js')
// <---/auto generate --->
//  git clone https://oauth2:CtyFoSQKpzsZsMbRHMxZ@gitlab.walletfactory.com/mobileapp/e2e-tests.git ../E2E-Tests
