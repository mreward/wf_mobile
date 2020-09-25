<template>
    <layout
        :layout="layout"
        :title="$t('m_cake_designer_title')"
        button-left="none"
        page="cake-designer"
    >
        <template slot="toolbar">
            <toolbar
                :title="$t('m_cake_designer_title')"
                button-left="back"
            >
                <div class="tabbar-button__wrapper">
                    <div class="tabbar-button">
                        <div
                            class="tabbar-button__item"
                            :class="{'tabbar-button__item--active': tab === 'standart'}"
                            @click="setActiveTab('standart', 0)"
                        >
                            <div class="tabbar-button__title">
                                {{ $t('m_cake_designer_standart') }}
                            </div>
                        </div>
                        <div
                            class="tabbar-button__item"
                            :class="{'tabbar-button__item--active': tab === 'exclusive'}"
                            @click="setActiveTab('exclusive', 1)"
                        >
                            <div class="tabbar-button__title">
                                {{ $t('m_cake_designer_exclusive') }}
                            </div>
                        </div>
                    </div>
                </div>
            </toolbar>
        </template>

        <div class="cake-designer-content">
            <v-ons-tabbar swipeable>
                <template slot="pages">
                    <transition>
                        <keep-alive>
                            <component
                                :is="tab"
                            />
                        </keep-alive>
                    </transition>
                </template>
            </v-ons-tabbar>
        </div>
    </layout>
</template>

<script>
    import ScreenDesignerTabberMixin from '_screen_designer_tabber_mixin'

    import Exclusive from './exclusive'
    import Standart from './standart'

    export default {
        name: 'screen-designer',
        components: {
            Exclusive,
            Standart
        },
        mixins: [
            ScreenDesignerTabberMixin
        ]
    }
</script>

<style lang="scss">
    .page[page="cake-designer"] {
        display: flex;
        flex: 1;
        flex-direction: column-reverse;
        justify-content: space-between;

        .toolbar {
            background: #fff;
            flex-wrap: wrap;
            height: 108px;
        }

        .tabbar-button__wrapper {
            background: #fff;
            flex: 1;
        }

        > .page__content {
            margin-top: 64px;
            padding: 0;
            flex: 1;
        }

        .page__background {
            background: #ffffff;
        }

        .toolbar__wrapper {
            padding-right: 0px;
        }

        .btn-select {
            display: flex;
            position: relative;
            padding: 14px;
            border-radius: 8px;
            box-shadow: 0px 8px 15px rgba(39, 45, 45, 0.06);
            background: #fff;
            margin-bottom: 8px;

            > span {
                flex: 1;
                font-size: 15px;
                font-weight: 600;
                line-height: 20px;
                letter-spacing: -0.24px;
                color: #000000;
            }

            > i {
                font-size: 10px;
                line-height: 20px;
                margin-right: 3px;
                color: #CECED2;
            }
        }
    }

    .cake-designer-content {
        margin-top: 0;
        padding: 16px;
        background-color: #F5F7FA;
        height: 100%;
        position: relative;

        .tabbar__content {
            bottom: 0 !important;
        }

        .page__content {
            background-color: #F5F7FA !important;
            padding: 16px !important;
        }

        .ons-tabbar__footer {
            display: none;
        }
    }
</style>
