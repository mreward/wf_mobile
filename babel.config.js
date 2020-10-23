module.exports = {
    presets: [
        [
            '@babel/env',
            {
                targets: {
                    chrome: '40',
                    safari: '9.1',
                },
                //useBuiltIns: 'usage',
            },
        ],
    ],
    plugins: [
        [
            '@babel/plugin-transform-runtime',
            {
                corejs: 2,
            },
        ],
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-transform-modules-commonjs',
        'lodash',
    ],
    comments: false,
};
