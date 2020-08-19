import Permission from '_CORE/plugins/common/Permission';

export default {
    IsAvailable() {
        return new Promise(async (resolve, reject) => {
            if (window.cordova) {
                const result = await Permission.GetPermission('android.permission.USE_FINGERPRINT');
                if (result.hasPermission) {
                    const platform = device.platform.toLowerCase();
                    if (platform === 'android') {
                        FingerprintAuth.isAvailable((result) => {
                            if (result.isAvailable) {
                                resolve(true);
                            } else {
                                reject(new Error('Not available'));
                            }
                        }, reject);
                    } else if (platform === 'ios') {
                        window.plugins.touchid.isAvailable(resolve, reject);
                    }
                } else {
                    reject();
                }
            } else {
                reject();
            }
        });
    },
    VerifyFingerprint(dialogTitle = {}) {
        const platform = device.platform.toLowerCase();
        return new Promise((resolve, reject) => {
            document.getElementsByTagName('html')[0].setAttribute('touchid-show', '');

            function successTouchId(e) {
                document.getElementsByTagName('html')[0].removeAttribute('touchid-show');
                resolve(e);
            }

            function errorTouchId(e) {
                document.getElementsByTagName('html')[0].removeAttribute('touchid-show');
                reject(e);
            }

            if (platform === 'android') {
                const encryptConfig = {
                    clientId: 'mWalletFactory',
                    maxAttempts: 3,
                    disableBackup: true,
                    locale: dialogTitle.locale || 'ru',
                };
                if (dialogTitle.title) {
                    encryptConfig.dialogTitle = dialogTitle.title || 'Scan your fingerprint please';
                }
                FingerprintAuth.encrypt(encryptConfig, successTouchId, errorTouchId);
            } else if (platform === 'ios') {
                window.plugins.touchid.verifyFingerprint(
                    'Scan your fingerprint please',
                    successTouchId,
                    errorTouchId,
                );
            }
        });
    },
};
