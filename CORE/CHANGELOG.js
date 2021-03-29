module.exports = [
    {
        version: '4.1.0.0',
        newFeatures: [
            'CORDOVA 9',
            'Android@8.0',
            'Android@5.0'
        ],
        bugFixes: [
        ]
    },
    {
        version: '4.0.10.5',
        newFeatures: [
            '[#45179](https://tm.walletfactory.com/issues/45179) - Валидация полей на всех экранах',
            '[#12809](https://tm.walletfactory.com/issues/12809) - Добавить в 3ds типы операций',
            '[#13014](https://tm.walletfactory.com/issues/13014) - Просмотр списка купонов iDiscount',
            '[#KLKS-386](https://walletfactory.atlassian.net/browse/KLKS-386) - Сохранение данных при регистрации\n'
        ],
        bugFixes: [
            '[#45309](https://tm.walletfactory.com/issues/45309) - кнопка Добавить в избранное в Истории',
            '[#14393](https://tm.walletfactory.com/issues/14393) - Заменить InputMask на фильтры в компоненте Amount',
            '[#12735](https://tm.walletfactory.com/issues/12735) - неправильно подставляется маска телефона',
            'Fixed opening messenger Viber',
            '[#12121](https://tm.walletfactory.com/issues/12121) - Datepicker fixed value',
            'axios - Fixed GET requests caching'
        ]
    },
    {
        version: '4.0.10.4',
        newFeatures: [
            'InputNext v2 - ввод смс на Android, вставка кода из смс на IOS 12',
            'Support IphoneXS|XR|XS max',
            'Validate server errors',
            '[#12165](https://tm.walletfactory.com/issues/12165) - Рефакторинг подключаемых компонентов в модулях',
            '[#9131](https://tm.walletfactory.com/issues/9131) - Многократный ввод неверного ОТП',
            '[#8984](https://tm.walletfactory.com/issues/8984) - Отбражение ошибок',
            '[#12338](https://tm.walletfactory.com/issues/12338) - Забыл слово пароль - позвонить',
            '[#12329](https://tm.walletfactory.com/issues/12329) - Пропали подписи полей в настройках',
            '[#8616](https://tm.walletfactory.com/issues/8616) - Добавление функционала по работе c картами лояльности',
            '[#12451](https://tm.walletfactory.com/issues/12451) - Добавить автоматическое заполнение поля \'Email\' при выборе чек-бокса \'подарить себе\' в разделе \'магазин\', \'купить сертификат\''
        ],
        bugFixes: [
            'fixed method beforeUpdateHook: bug page not opening',
            'InputNext v2 - fixed paste from clipboard on ios',
            'Fixed error: \'Application error. The connection to the server was unsuccessful\'',
            '[#12427](https://tm.walletfactory.com/issues/12427) - Поправить Ру текст при добавлении карты'
        ]
    }
]
