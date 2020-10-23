/**
 * Messengers plugin open chat in messengers
 * For IOS need add .plist params
 * <key>LSApplicationQueriesSchemes</key>
 * <array>
 *      <string>tg</string>
 *      <string>viber</string>
 *      <string>fb-messenger</string>
 * </array>
 * To use:
 * Call `Messengers.FunctionName(chat)`
 */
export default {
    /**
     * Validates the link for a specific application.
     * @param schemeIOS - URI Scheme or Package Name
     * @param schemeAndroid - URI Scheme or Package Name
     * @param link - link to the chat
     * @param linkIOS - link to the application in itunes
     * @param linkAndroid - link to the application in play market
     * @example
     * <caption>-----</caption>
     * import Messengers from '_PLUGINS/common/Messengers';
     *
     * Messengers.OpenViber(this.settings.messengerSettings.viber);
     */
    $validateLink(schemeIOS, schemeAndroid, link, linkIOS, linkAndroid) {
        if (window.appAvailability) {
            appAvailability.check(
                // URI Scheme or Package Name
                device.platform === 'iOS' ? schemeIOS : schemeAndroid,
                // Success callback
                () => {
                    window.open(link, '_system')
                },
                // Error callback
                () => {
                    const _link = device.platform === 'iOS' ? linkIOS : linkAndroid
                    window.open(_link, '_system')
                },
            )
        } else {
            console.log('Messengers.$validateLink "appAvailability" is not defined')
            window.open(link, '_system')
        }
    },
    /**
     * @param chat - 'String' (chat phone number)
     * @example
     * <caption>-----</caption>
     * import Messengers from '_PLUGINS/common/Messengers';
     *
     * Messengers.OpenViber(this.settings.messengerSettings.viber);
     */
    OpenViber(chat) {
        this.$validateLink(
            'viber://',
            'com.viber.voip',
            chat.public ? `viber://pa?chatURI=${chat.public}` : `viber://chat?number=%2B${chat.private}`,
            'https://itunes.apple.com/app/viber-messenger/id382617920',
            'https://play.google.com/store/apps/details?id=com.viber.voip',
        )
    },
    /**
     * @param chat - 'String'
     * @example
     * <caption>-----</caption>
     * import Messengers from '_PLUGINS/common/Messengers';
     *
     * Messengers.OpenTelegram(this.settings.messengerSettings.telegram);
     */
    OpenTelegram(chat) {
        this.$validateLink(
            'tg://',
            'org.telegram.messenger',
            `https://telegram.me/${chat}`,
            'https://itunes.apple.com/app/telegram-messenger/id686449807',
            'https://play.google.com/store/apps/details?id=org.telegram.messenger',
        )
    },
    /**
     * @param chat - 'String'
     * @example
     * <caption>-----</caption>
     * import Messengers from '_PLUGINS/common/Messengers';
     *
     * Messengers.OpenWhatsApp(this.settings.messengerSettings.whatsapp);
     */
    OpenWhatsApp(chat) {
        this.$validateLink(
            'whatsapp://',
            'com.whatsapp',
            `https://wa.me/${chat}`,
            'https://itunes.apple.com/app/whatsapp-messenger/id310633997',
            'https://play.google.com/store/apps/details?id=com.whatsapp',
        )
    },
    /**
     * @param chat - 'String'
     * @example
     * <caption>-----</caption>
     * import Messengers from '_PLUGINS/common/Messengers';
     *
     * Messengers.OpenMessenger(this.settings.messengerSettings.messenger);
     */
    OpenMessenger(chat) {
        this.$validateLink(
            'fb-messenger://',
            'com.facebook.orca',
            `https://m.me/${chat}`,
            'https://itunes.apple.com/app/messenger/id454638411',
            'https://play.google.com/store/apps/details?id=com.facebook.orca',
        )
    },

    /**
     * @param chat - 'String'
     * @example
     * <caption>-----</caption>
     * import Messengers from '_PLUGINS/common/Messengers';
     *
     * Messengers.OpenInstagram(this.settings.messengerSettings.instagram);
     */
    OpenInstagram(chat) {
        this.$validateLink(
            'instagram://',
            'com.instagram.android',
            `https://www.instagram.com/${chat}`,
            'https://itunes.apple.com/app/instagram/id389801252',
            'https://play.google.com/store/apps/details?id=com.instagram.android',
        )
    },

    /**
     * @param chat - 'String'
     * @example
     * <caption>-----</caption>
     * import Messengers from '_PLUGINS/common/Messengers';
     *
     * Messengers.OpenVk(this.settings.messengerSettings.vk);
     */
    OpenVk(chat) {
        this.$validateLink(
            'vk://',
            'com.vkontakte.android',
            `https://vk.com/${chat}`,
            'https://itunes.apple.com/ua/app/vk/id564177498',
            'https://play.google.com/store/apps/details?id=com.vkontakte.android',
        )
    },

    /**
     * @param chat - 'String'
     * @example
     * <caption>-----</caption>
     * import Messengers from '_PLUGINS/common/Messengers';
     *
     * Messengers.OpenFacebook(this.settings.messengerSettings.facebook);
     */
    OpenFacebook(chat) {
        this.$validateLink(
            'fb://',
            'com.facebook.katana',
            `fb://page/${chat}`,
            'https://itunes.apple.com/us/app/facebook/id284882215',
            'https://play.google.com/store/apps/details?id=com.facebook.katana',
        )
    }
}
