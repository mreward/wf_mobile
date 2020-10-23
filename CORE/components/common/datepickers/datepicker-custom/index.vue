<template>
    <div
        :class="classesWrapper"
        @click="showDatePicker"
    >
        <input
            type="text"
            class="datepicker-custom--input text-input input__inner"
            @focus="showDatePicker"
        >
        <slot
            v-bind="slotProps"
            name="default"
        />
    </div>
</template>

<script>
    import DatePicker from '_PLUGINS/common/DatePicker'
    import moment from 'moment'

    export default {
        name: 'datepicker-custom',
        props: {
            /**
             * Selected date
             */
            date: {
                type: [Date, String],
                default: new Date()
            },
            /**
             * Date format for emitted value
             */
            dateFormat: {
                type: String,
                default: 'YYYY-MM-DD'
            },
            /**
             * Max date available to select
             */
            maxDate: {
                type: [Date, String],
                default: ''
            },
            /**
             * Min date available to select
             */
            minDate: {
                type: [Date, String],
                default: ''
            },
            /**
             * Android themes: https://github.com/VitaliiBlagodir/cordova-plugin-datepicker#androidtheme---android
             */
            theme: {
                type: String,
                default: 'default'
            },
            /**
             * DEBUG only option, to be able to use datepicker in browser for test.
             */
            mockDate: {
                type: [Date, String],
                default: ''
            }
        },
        computed: {
            classesWrapper() {
                return [
                    'datepicker-custom--wrapper'
                ]
            },
            datepickerOptions() {
                return {
                    maxDate: this.maxDate,
                    minDate: this.minDate,
                    date: this.date,
                    format: this.dateFormat,
                    theme: this.theme,
                    mockDate: this.mockDate
                }
            },
            slotProps() {
                return {
                    date: this.date
                }
            }
        },
        methods: {
            async showDatePicker() {
                try {
                    this.$emit('focus')
                    const date = await this.pickDate(this.datepickerOptions)
                    if (date) {
                        this.$emit('update:date', moment(date).format(this.dateFormat))
                    }
                    this.$emit('blur')
                } catch (error) {
                    this.alertError(error)
                    throw error
                }
            },
            async pickDate(options) {
                const date = await DatePicker.Pick(options)
                return date
            },
            alertError(error) {
                if (this.$Alert && typeof this.$Alert.Error === 'function') {
                    this.$Alert.Error(error)
                }
            }
        }
    }
</script>

<style lang="scss">
    .datepicker-custom {
        &--input {
            //height: 0;
            //width: 0;
            position: absolute;
            border: 0;
            z-index: -1;
        }
    }
</style>
