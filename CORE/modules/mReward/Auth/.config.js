const PATH = '_CORE/modules/mReward/Auth';

module.exports = {
    directives: {
        //OnsModalOnScroll: true,
    },
    css: [
        `${PATH}/css/main.scss`,
    ],
    options: {
        lengthOtp: 5,
    },
    components: {
        InputBase: '_input_base',
        InputPin: '_input_pin_sequence',
        FormBase: '_form_base',
        FormItem: '_form_item',
        FormList: '_form_list',
        ToolBar: '_toolbar',
        LayoutAuth: '_layout_auth',
        ValidationError: '_validation_error',
        DatepickerCustom: '_datepicker_custom',
    },
    store: {
        MrewardUser: `${PATH}/store/modules/MrewardUser`,
    },
    locales: {
        en: [
            `${PATH}/locales/en`,
        ],
        ru: [
            `${PATH}/locales/ru`,
        ],
    },
    options: {
        showMobileHint: false
    },
};

