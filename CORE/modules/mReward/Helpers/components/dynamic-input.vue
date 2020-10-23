<template>
    <div class="will-change--helper">
        <template v-if="field.data_type === 1">
            <v-text-field
                v-model="currentValue"
                :label="label"
                :error-messages="errorMessages"
                :hint="field.hint"
                type="text"
                @focus="$emit('hideError')"
            />
        </template>
        <template v-else-if="field.data_type === 2">
            <v-select
                v-model="currentValue"
                :items="field.items"
                class="tile-selected"
                :label="label"
                :error-messages="errorMessages"
                :hint="field.hint"
                item-text="value"
                item-value="id"
                :menu-props="{maxHeight: 400}"
                @change="$emit('hideError')"
            />
        </template>
        <template v-else-if="field.data_type === 4">
            <v-checkbox
                v-model="currentValue"
                :true-value="1"
                :false-value="0"
                :label="label"
                :error-messages="errorMessages"
                :hint="field.hint"
                @change="$emit('hideError')"
            />
        </template>
        <template v-else-if="field.key === 'birth_day'">
            <datepicker-custom
                :date.sync="currentValue"
                :min-date="minDate"
                :max-date="maxDate"
                mockDate="2019-02-21"
            >
                <!--<div-->
                    <!--slot-scope="{ date }"-->
                    <!--class="input__inner"-->
                <!--&gt;-->
                    <!--{{ date | date({formatTo: 'DD MMMM YYYY', formatFrom: 'YYYY-MM-DD'}) }}-->
                <!--</div>-->
                <v-text-field
                    v-model="currentValue"
                    :label="label"
                    :error-messages="errorMessages"
                    :hint="field.hint"
                    type="text"
                    readonly
                    @change="$emit('hideError')"
                />
            </datepicker-custom>
        </template>
    </div>
</template>

<script>
    import moment from 'moment'
    import { mapGetters } from 'vuex'
    import constants from '_vuex_constants'

    export default {
        name: 'dynamic-input',
        props: {
            value: {
                type: [String, Boolean, Number],
                default: '',
                required: true
            },
            field: {
                type: Object,
                default: () => ({})
            },
            errorMessages: {
                type: [Array, String],
                default: () => ([])
            }
        },
        data() {
            return {
                currentValue: this.value,
                minDate: moment().subtract(100, 'year').format('YYYY-MM-DD'),
                maxDate: ''
            }
        },
        computed: {
            ...mapGetters({
                settings: constants.App.Getters.settings
            }),
            label() {
                if (this.field.key === 'birth_day') {
                    return this.$t('m_auth_date_of_birth', '', { required: this.field.required === 1 ? '*' : '' })
                }
                return this.field.required === 1 ? `${this.field.name} *` : this.field.name
            }
        },
        watch: {
            value(newVal) {
                this.currentValue = newVal
            },
            currentValue: {
                immediate: true,
                handler(newVal) {
                    this.$emit('input', newVal)
                    this.$emit('change', newVal)
                }
            }
        },
        created() {
            this.maxDate = moment().subtract(this.settings.minimumAge, 'year').format('YYYY-MM-DD')

            if (this.field.key === 'birth_day' && !this.currentValue) {
                this.currentValue = this.maxDate
            }
        }
    }
</script>

<style scoped>

</style>
