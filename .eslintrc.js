// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
    },
    env: {
        browser: true,
        node: true,
    },
    extends: [
        'standard',
        'plugin:vue/recommended',
        // 'plugin:lodash/recommended'
    ],
    // required to lint *.vue files
    plugins: [
        // 'html',
        'vue',
    ],
    globals: {
        cordova: 'readonly',
        device: 'readonly',
        hockeyapp: 'readonly',
        Keyboard: 'readonly',
        PushNotification: 'readonly',
        CardIO: 'readonly',
        FirebasePlugin: 'readonly',
        resolveLocalFileSystemURL: 'readonly',
        ContactFindOptions: 'readonly',
        FileUploadOptions: 'readonly',
        datePicker: 'readonly',
        FileTransfer: 'readonly',
        EmvNfc: 'readonly',
        IRoot: 'readonly',
        QRScanner: 'readonly',
        appAvailability: 'readonly',
        StatusBar: 'readonly',
        ga: 'readonly',
        shake: 'readonly',
        SMSReceive: 'readonly',
        FingerprintAuth: 'readonly',
        Keychain: 'readonly',
        plugin: 'readonly',
        _DEVMOD: 'readonly',
    },
    // check if imports actually resolve
    'settings': {
        'import/resolver': {
            'webpack': {
                'config.js': 'webpack.config.js',
            },
        },
    },
    // add your custom rules here
    'rules': {
        // don't require .vue extension when importing
        'import/extensions': ['off', 'never'],
        'import/prefer-default-export': ['off', 'never'],
        // constructor name can start with small case
        'new-cap': [
            'off', {
                'newIsCap': true,
            }],
        'no-constant-condition': ['error', { 'checkLoops': false }],
        'no-useless-escape': 'off',
        'no-shadow': 'off',
        'import/first': 'off',
        'global-require': 'off',
        'no-underscore-dangle': 'off',

        'no-param-reassign': 'error',
        'no-console': 'off',
        'prefer-destructuring': 'off',
        // 'import/no-extraneous-dependencies': ['off', 'never'],
        'import/no-unresolved': ['off', 'never'],

        'consistent-return': 'off',
        'object-curly-newline': 'off',
        'arrow-body-style': 'off',
        'space-before-function-paren': 'off',
        'func-names': 'off',
        'prefer-promise-reject-errors': 'off',
        'no-alert': 'off',

        // 'import/no-duplicates': ['off', 'never'],
        // 'import/no-named-as-default': ['off', 'never'],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'indent': ['error', 4, { 'SwitchCase': 1 }],
        'max-len': [
            'error', 160, 2, {
                ignoreUrls: true,
                ignoreComments: false,
                ignoreRegExpLiterals: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
            }],
        'linebreak-style': 0,
        'vue/html-indent': ['error', 4, { alignAttributesVertically: true }],
        'vue/script-indent': ['error', 4, { baseIndent: 1, switchCase: 1 }],
        'vue/name-property-casing': ['error', 'kebab-case'],
        'vue/no-v-html': 'off',
        'vue/no-unused-components': "off",
        "vue/order-in-components": ["error", {
            "order": [
                "el",
                "name",
                "parent",
                "functional",
                ["delimiters", "comments"],
                ["components", "directives", "filters"],
                "extends",
                "mixins",
                "inheritAttrs",
                "model",
                ["props", "propsData"],
                "data",
                "computed",
                "watch",
                "fetch",
                "LIFECYCLE_HOOKS",
                "methods",
                ["template", "render"],
                "renderError",
                "validations",
            ]
        }],
        'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    },
    'overrides': [
        {
            'files': ['*.vue'],
            'rules': {
                'indent': 'off',
            },
        },
    ],
};
