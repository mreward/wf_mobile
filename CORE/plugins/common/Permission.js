/**
 * Permission plugin checks for permissions and request them.
 *
 * To use:
 * Call `Permission.GetPermission(permission)`
 */
export default {
    /**
     * Сhecks for permissions and request them. If permission is returned status{object}
     * else it requests these permissions
     * @param permission - list of requested permissions
     * @example
     * <caption>-----</caption>
     * import Permission from '_PLUGINS/common/Permission';
     *
     * const result = await Permission.GetPermission([
     *      cordova.plugins.permissions.READ_EXTERNAL_STORAGE,
     *      cordova.plugins.permissions.WRITE_EXTERNAL_STORAGE,
     * ]);
     * if (result.hasPermission) {
     *    ....
     * } else {
     *    ....
     * }
     * @return Promise
     */
    GetPermission(permission) {
        return new Promise((resolve) => {
            if (window.cordova) {
                const { permissions } = cordova.plugins
                permissions.checkPermission(permission, (status) => {
                    if (status.hasPermission) {
                        resolve(status)
                    } else {
                        let requstPermissions = permissions.requestPermission
                        if (typeof permission === 'object') {
                            requstPermissions = permissions.requestPermissions
                        }
                        requstPermissions(permission, (status) => {
                            resolve(status)
                        }, () => {
                            console.log(`${permission} permission is not turned on `)
                            resolve({ hasPermission: false })
                        })
                    }
                }, () => {
                    console.log(`${permission} permission is not turned on `)
                    resolve({ hasPermission: false })
                })
            } else {
                console.log(`${permission} permission is not turned on `)
                resolve({ hasPermission: false })
            }
        })
    },
    /**
     * Сhecks for permissions. If permission is returned status{object}
     * else it requests these permissions
     * @param permission - list of requested permissions
     * @example
     * <caption>-----</caption>
     * import Permission from '_PLUGINS/common/Permission';
     *
     * const result = await Permission.HasPermission(cordova.plugins.permissions.RECEIVE_SMS);
     * if (result.hasPermission) {
     *    ....
     * } else {
     *    ....
     * }
     * @return Promise
     */
    HasPermission(permission) {
        return new Promise((resolve) => {
            if (window.cordova) {
                const { permissions } = cordova.plugins
                permissions.checkPermission(permission, (status) => {
                    if (status.hasPermission) {
                        resolve(status)
                    } else {
                        resolve({ hasPermission: false })
                    }
                }, () => {
                    console.log(`${permission} permission is not turned on `)
                    resolve({ hasPermission: false })
                })
            } else {
                console.log(`${permission} permission is not turned on `)
                resolve({ hasPermission: false })
            }
        })
    }
}
