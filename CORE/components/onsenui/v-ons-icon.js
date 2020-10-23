/* eslint-disable */
import VOnsIcon from 'vue-onsenui/esm/components/VOnsIcon';
import provideData from '_CORE/components/utils/provideData';

export default {
    name: 'v-ons-icon',
    functional: true,
    props: {
        icon: {
            type: String,
            default: '',
        },
    },
    render: (createElement, context) => {
        const custom = {
            defaultClass: 'icon',
            class: {
                'ons-icon': true,
                fa: context.props.icon.startsWith('fa'),
            },
            attrs: context.props,
        };

        if (context.props.icon.startsWith('fa')) {
            custom.class[`fa-${context.props.icon}`] = true;
        }

        const data = provideData(context, custom);

        return createElement('div', data);
    },
};
