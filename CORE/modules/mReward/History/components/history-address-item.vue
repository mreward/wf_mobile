<template>
    <v-ons-list class="list--transparent list--vertical margin-top--middle history-address-item">
        <v-ons-list-item>
            <div class="left">
                {{ item.name }}
            </div>
            <div v-show="item.address" class="center">
                {{ item.address }}
            </div>
        </v-ons-list-item>
        <v-list-item-icon>
            <i v-if="checked" class="icon-checkmark"></i>
        </v-list-item-icon>
    </v-ons-list>
</template>

<script>
    import MixinOpenProtocol from '_CORE/mixins/common/open-protocol'

    export default {
        name: 'history-address-item',
        mixins: [
            MixinOpenProtocol
        ],
        props: {
            item: {
                type: Object,
                default: () => {}
            },
            checked: {
                type: Boolean,
                default: false
            },
        },
        methods: {

        }
    }
</script>

<style scoped lang="scss">
   .history-address-item {
        display: flex;

       .v-list-item__icon {
           margin: 0;
           margin-left: 16px;
       }
    }
</style>
