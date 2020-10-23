<template>
    <div
        v-show="isVisible"
        id="content-console"
        class="content-debug-console"
    >
        <v-ons-button
            modifier="quiet"
            class="btn-close"
            @click="$bus.$emit('on-open-debug-console')"
        >
            <v-ons-icon icon="ion-close-round" />
        </v-ons-button>

        <v-ons-list>
            <v-ons-list-item
                v-for="(item, key, index) in logs"
                :key="index"
                :class="item.data.level"
            >
                <div class="center list-item__center">
                    <span class="text">
                        <span class="level">{{ getDate(item.date_create) }} {{ item.data.level }}</span>
                        {{ item.data.text }}
                    </span>
                    <span v-if="item.data.args.length !== 0">:</span>
                    <pre
                        v-if="item.data.args.length !== 0"
                        class="code"
                    >
                        {{ JSON.stringify(item.data.args, null, 2) }}
                    </pre>
                </div>
            </v-ons-list-item>
        </v-ons-list>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import constants from '_vuex_constants'
    import moment from 'moment'

    export default {
        name: 'debug-console',
        props: {
            isVisible: {
                type: Boolean,
                required: false,
                default: true
            }
        },
        data() {
            return {
                contentConsole: 0
            }
        },
        computed: {
            ...mapGetters({
                logs: constants.App.Getters.logs
            })
        },
        watch: {
            logs() {
                this.scrollTop()
            },
            isVisible() {
                setTimeout(() => {
                    this.scrollTop()
                }, 600)
            }
        },
        methods: {
            getDate(date) {
                return moment(date).format('HH:mm:ss')
            },
            scrollTop() {
                if (!this.contentConsole) {
                    this.contentConsole = document.getElementById('content-console')
                }

                this.contentConsole.scrollTop = this.contentConsole.scrollHeight
            }
        }
    }
</script>

<style lang="scss"
       scoped>
    .content-debug-console {
        z-index: 9991;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        position: fixed;
        background-color: #fff;
        font-size: 0.8rem;
        color: #d4d4d4;
        text-align: left;
        padding: 10px;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;

        pre {
            padding: 0;
            margin: 0;
            overflow-x: auto;
        }
        pre.code {
            border-radius: 3px;
            color: #babab5;
            background-color: #2b2b2b;
            margin: 8px 0;
        }

        .error {
            color: #fff;
            background-color: #ea3434;
            padding: 10px;
            border-radius: 3px;
            margin: 0 0 5px;

            span.level {
                background-color: #fff;
                color: #ea3434;
                padding: 0 6px;
                border-radius: 3px;
            }

            pre.code {
                color: #fff;
                background-color: transparent;
            }
        }

        .log {
            span.level {
                background-color: #15d034;
                color: #ffffff;
                padding: 0 6px;
                border-radius: 3px;
            }
        }

        .center {
            width: 100% !important;
            display: block !important;
            word-wrap: break-word;
            padding: 0;
            min-height: 22px;
            padding-bottom: 3px;
        }

        .btn-close {
            position: fixed;
            right: 20px;
            bottom: 20px;
            z-index: 1;
            background-color: rgba(0, 0, 0, 0.52);
            border-radius: 50%;
            width: 56px;
            height: 56px;
            text-align: center;
            line-height: 38px;
            color: #fff;
            font-size: 25px;
        }
    }
</style>
