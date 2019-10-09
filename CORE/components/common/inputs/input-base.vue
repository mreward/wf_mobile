<template>
    <div
        :class="wrapperClasses"
    >
        <div
            v-if="prefix || $slots.prefix"
            class="input__prefix"
            @click="$emit('prefix')"
        >
            <slot name="prefix">
                <template v-if="prefix">
                    {{ prefix }}
                </template>
            </slot>
        </div>
        <template v-if="type === 'textarea'">
            <textarea-autosize
                ref="input"
                v-model="currentValue"
                :rows="textareaDefaultRows"
                :name="name"
                :placeholder="nativePlaceholder"
                :class="classes"
                :minlength="minLength"
                :maxlength="maxLength"
                @focus.native="onFocus"
                @blur.native="onBlur"
            />
        </template>
        <template v-else>
            <input
                ref="input"
                :key="inputKey"
                v-model="currentValue"
                v-mask.origin="mask"
                autocomplete="off"
                autocorrect="off"
                :class="classes"
                :type="nativeType"
                :placeholder="nativePlaceholder"
                :name="name"
                :modifier="modifier"
                :minlength="minLength"
                :maxlength="maxLength"
                v-bind="dataOptions"
                @focus="onFocus"
                @blur="onBlur"
            >
            <div
                v-if="type === 'password'"
                class="show-password-button"
                @click="toggleIconEye"
            >
                <i :class="showIcon ? iconHide : iconShow" />
            </div>
        </template>
        <div
            v-if="suffix || $slots.suffix || showClearIcon"
            class="input__suffix"
        >
            <slot name="suffix">
                <template v-if="suffix">
                    {{ suffix }}
                </template>
            </slot>
            <div v-if="showClearIcon">
                <v-ons-button
                    class="input__clear-button"
                    modifier="quiet"
                    @click="onClear"
                >
                    <v-ons-icon :icon="clearIcon" />
                </v-ons-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { maskAmount, maskInn, maskNumeric, maskPaymentCard, maskPhoneCode as maskPhone } from '_masks'
    import get from 'lodash/get'
    import isEmpty from 'lodash/isEmpty'
    import isFunction from 'lodash/isFunction'

    export default {
        name: 'input-base',
        props: {
            value: {
                required: true,
                default: '',
                validator: prop => typeof prop === 'string' || typeof prop === 'number' || prop === null
            },
            type: {
                type: String,
                default: 'text'
            },
            name: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: ''
            },
            modifier: {
                type: String,
                default: ''
            },
            maskSettings: {
                type: [String, Object, Boolean],
                default: () => ({})
            },
            min: {
                type: [String, Number],
                default: null
            },
            max: {
                type: [String, Number],
                default: null
            },
            minLength: {
                type: [String, Number],
                default: null
            },
            maxLength: {
                type: [String, Number],
                default: null
            },
            prefix: {
                type: [String, Number],
                default: null
            },
            suffix: {
                type: [String, Number],
                default: null
            },
            clearable: {
                type: [String, Boolean],
                default: false
            },
            dataOptions: {
                type: [Object],
                default: () => ({})
            },
            textareaDefaultRows: {
                type: [Number],
                default: 1
            },
            validateOnBlur: {
                type: Boolean,
                default: true
            },
            readonly: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                currentValue: this.value || '',
                active: false,
                iconHide: 'icon-eye-opened',
                iconShow: 'icon-eye-closed',
                showIcon: false,
                inputKey: 0
            }
        },
        inject: {
            validation: {
                default: null
            }
        },
        computed: {
            nativePlaceholder() {
                if (this.placeholder) {
                    return this.placeholder
                }

                switch (this.type) {
                    case 'card':
                        return maskPaymentCard.mask
                    case 'inn':
                        return maskInn.mask
                    default:
                        return ''
                }
            },
            mask() {
                if (!isEmpty(this.maskSettings)) {
                    return this.maskSettings
                }

                switch (this.type) {
                    case 'numeric':
                        return maskNumeric
                    case 'card':
                        return maskPaymentCard
                    case 'amount':
                        return maskAmount
                    case 'inn':
                        return maskInn
                    case 'phone':
                        return maskPhone
                    default:
                        return ''
                }
            },
            wrapperClasses() {
                return [
                    'input',
                    { 'input--clearable': this.showClearIcon },
                    { 'input--underbar': this.modifier === 'underbar' },
                    { 'input--default': !this.modifier },
                    { 'input--textarea': this.type === 'textarea' },
                    { 'text--security': (this.type === 'password' && !this.showIcon) || this.type === 'cvv' },
                    { 'is-active': this.active || this.currentValue.toString().length > 0 }
                ]
            },
            classes() {
                return [
                    'text-input',
                    'input__inner'
                ]
            },
            showPassword() {
                if (this.type === 'password') {
                    return { iconHide: 'icon-eye-opened', iconShow: 'icon-eye-closed' }
                }
                return {}
            },
            nativeType() {
                switch (this.type) {
                    case 'bank-account':
                    case 'card':
                    case 'phone':
                    case 'numeric':
                    case 'tel':
                    case 'inn':
                    case 'cvv':
                        return 'tel'
                    case 'number':
                    case '0':
                        return 'number'

                    // case 'cvv':
                    //     return 'password';
                    case 'amount':
                    case 'password':
                    default:
                        return 'text'
                }
            },
            showClearIcon() {
                return typeof this.value === 'string' && this.value.length > 0 && this.active && this.clearable
            },
            clearIcon() {
                return typeof this.clearable === 'string' ? this.clearable : 'x'
            }
        },
        watch: {
            value(newVal) {
                this.currentValue = newVal
            },
            currentValue: {
                immediate: true,
                handler(newVal) {
                    const originValue = this.mask ? get(this.$refs, 'input.$el.unmaskedValue') : newVal
                    this.$emit('input', newVal)
                    this.$emit('change', originValue)
                }
            }
        },
        methods: {
            focus() {
                this.active = true
                this.$refs.input.focus()
            },
            onFocus (event) {
                this.active = true
                this.$emit('focus', event)
                // this.validation.$reset();
            },
            onBlur (event) {
                setTimeout(() => {
                    this.active = false
                }, 0)
                this.$emit('blur', event)
                if (this.validateOnBlur && this.validation && isFunction(this.validation.$touch)) {
                    this.validation.$touch()
                }
            },
            onClear() {
                this.currentValue = ''
                this.$emit('focus', this.currentValue)
                // this.$refs.inputMain.$el.children[0].focus();
            },
            toggleIconEye() {
                this.showIcon = !this.showIcon

                this.updateDom()
            },
            // Force re-render to see the password when change icon
            updateDom() {
                this.inputKey += 1
            }
            // onKeyPress(event) {
            //     const value = event.target.value;
            //     return value.length > parseInt(this.maxLength, 10) || value.length < parseInt(this.minLength, 10);
            // },
        }
    }
</script>
