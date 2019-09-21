<template>
    <div class="input-pin">
        <v-ons-input
            v-for="n in length"
            :key="n"
            ref="pin"
            v-model="valueArray[n-1]"
            v-mask="mask"
            v-next-input
            required
            type="tel"
            class="input-pin__inner input__inner"
            :class="{ 'is-active': !!valueArray[n-1] || n === activeIndex }"
            length-max="1"
            @focus="setActiveIndex(n)"
            @blur="blur"
        />
    </div>
</template>

<script>
    import isFunction from 'lodash/isFunction'

    export default {
        name: 'input-pin',
        model: {
            prop: 'value',
            event: 'input'
        },
        inject: {
            validation: {
                default: null
            }
        },
        props: {
            value: {
                type: String,
                default: ''
            },
            length: {
                type: Number,
                default: 4
            }
        },
        data() {
            return {
                valueArray: new Array(this.length),
                mask: {
                    mask: '9',
                    placeholder: ''
                },
                activeIndex: -1
            }
        },
        watch: {
            valueArray: {
                deep: true,
                handler() {
                    this.$emit('input', this.valueArray.join(''))
                }
            },
            value() {
                if (!this.value) {
                    this.valueArray = new Array(this.length).fill('')
                    this.$refs.pin.forEach(item => (item.$el.oldValue = ''))
                }

                if (this.value.toString().length === 0 && this.validation && isFunction(this.validation.$reset)) {
                    this.validation.$reset()
                }
            }
        },
        created() {
            this.valueArray = new Array(this.length).fill('')
        },
        methods: {
            focus() {
                this.$refs.pin[0].$el.children[0].focus()
            },
            setActiveIndex(index) {
                this.activeIndex = index
            },
            blur() {
                this.activeIndex = -1
            }
        }
    }
</script>
