<template>
    <div
        :class="['selected-item', `selected-item--${iconDirection}`]"
    >
        <div
            v-if="withImage"
            ref="image"
            class="selected-item__image"
            :style="{
                backgroundImage: `url(${image})`
            }"
            @click="$emit('click-image', image)"
        />

        <div class="selected-item__content">
            <div class="selected-item__title">
                <span class="selected-item__name">
                    {{ name }}
                </span>
            </div>

            <div
                class="selected-item__description"
            >
                {{ description }}
            </div>
        </div>

        <v-btn
            v-if="icon"
            small
            :class="['btn-check', 'btn-check--center', 'btn-check--active']"
            @click="$emit('select', value)"
        >
            <i :class="icon" />
        </v-btn>
    </div>
</template>

<script>
    import { get, has } from 'lodash'

    export default {
        name: 'selected-item',

        props: {
            value: {
                type: Object,
                default: () => ({})
            },
            icon: {
                type: String,
                default: 'icon-close'
            },
            iconDirection: {
                type: String,
                default: 'right'
            },
            defaultImage: {
                type: String,
                default: ''
            },
            defaultName: {
                type: String,
                default: ''
            },
            defaultDescription: {
                type: String,
                default: ''
            }
        },

        computed: {
            image() {
                return get(this.value, 'img_icon_40_40', this.defaultImage)
            },
            withImage() {
                return this.image || has(this.value, 'imageURI')
            },
            description() {
                return get(this.value, 'description', this.defaultDescription)
            },
            name() {
                return get(this.value, 'name', get(this.value, 'text', get(this.value, 'options.fileName', this.defaultName)))
            }
        },

        watch: {
            'value.imageURI'(value, oldValue) {
                if (value && value !== oldValue) {
                    this.loadImageFromFile(value)
                }
            }
        },

        mounted() {
            if (has(this.value, 'imageURI')) {
                this.loadImageFromFile(get(this.value, 'imageURI'))
            }
        },

        methods: {
            /**
             * Load image from file
             * @param imageURI is cdvfile:....... (string)
             */
            loadImageFromFile(imageURI) {
                const element = this.$refs.image
                window.resolveLocalFileSystemURL(imageURI, function success(fileEntry) {
                    fileEntry.file((file) => {
                        const reader = new FileReader()
                        reader.onloadend = function() {
                            if (this.result) {
                                const blob = new Blob([new Uint8Array(this.result)], { type: 'image/png' })
                                element.style.backgroundImage = `url(${window.URL.createObjectURL(blob)})`
                                window.URL.revokeObjectURL(blob)
                            }
                        }
                        reader.readAsArrayBuffer(file)
                    })
                }, () => {
                    console.log(`File not found: ${imageURI}`)
                })
            }
        }
    }
</script>

<style lang="scss">
    .selected-item {
        display: flex;
        position: relative;
        padding: 8px;
        border-radius: 8px;
        box-shadow: 0px 8px 15px rgba(39, 45, 45, 0.06);
        background: #fff;
        margin-bottom: 8px;

        &__image {
            width: 52px;
            height: 52px;
            border-radius: 8px;
            background-position: center;
            background-size: cover;
        }

        &__content {
            margin-left: 10px;
            padding: 6px;
        }

        &__title {
            display: flex;
            font-size: 15px;
            line-height: 20px;
            letter-spacing: -0.24px;
            font-weight: 600;
        }

        &__description {
            font-size: 12px;
            line-height: 16px;
            color: rgba(60, 60, 67, 0.6);
            margin-right: 50px;
            margin-top: 4px;
        }

        &__name {
            flex: 1;
        }

        .btn-check {
            &--active {
                background: #000!important;
            }
        }
    }
</style>
