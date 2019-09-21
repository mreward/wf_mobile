<template>
    <layout
        :title="$t('m_profile_edit_profile')"
    >
        <div class="layout-auth__form">
            <v-text-field
                v-model="city.name"
                readonly
                :label="$t('m_auth_city', '', {required: '*'})"
                :error-messages="errorMessages['id_city']"
                type="text"
                @focus="goToSelectCity"
            />

            <template v-if="profileFields.length">
                <dynamic-input
                    v-for="(field, key) in profileFields"
                    v-model="dynamicInput[field.key]"
                    :key="key"
                    :field="field"
                    :error-messages="errorMessages[field.key]"
                    @hideError="() => errorMessages[field.key] = ''"
                />
            </template>

            <v-btn
                depressed
                class="margin-vertical--base"
                color="primary"
                type="main"
                block
                :disabled="nothingChanges"
                @click.prevent="editProfile"
            >
                {{ $t('m_profile_save') }}
            </v-btn>
        </div>
    </layout>
</template>

<script>
    import MixinScreenEditProfile from '_screen_edit_profile_mixin'
    import MixinChooseCity from '_mixin_choose_city'

    export default {
        name: 'screen-edit-profile',
        mixins: [
            MixinScreenEditProfile,
            MixinChooseCity
        ]
    }
</script>
