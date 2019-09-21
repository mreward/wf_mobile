/* DO NOT CHANGE: Auto-generated file */

import ApiClient from '_apiClient';

export const mWalletClient = {
    config: (data) => {
        if (data.options) {
            ApiClient.prototype._config(data.options);
        }
    },

    setCallbackUpdateToken: (callbackUpdateToken) => {
        if (callbackUpdateToken) {
            ApiClient.prototype._callbackUpdateToken = callbackUpdateToken;
        }
    },

    setSession: (session) => {
        if (session) {
            ApiClient.prototype.session = session;
        }
    },
    
};