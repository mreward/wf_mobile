/**
 * Создание иконок
 * @param grunt
 * @param wallet
 * @returns {{shell: {xcodebuild_xcarchive: {command: string}, xcodebuild_exportArchive: {command: string}, xcodebuild_exportArchiveA: {command: string}}}}
 */
module.exports = function({ grunt, wallet }) {
    // для создание кучи икокно разного размера
    grunt.loadNpmTasks('grunt-gm-picturefill')
    const walletName = grunt.option('name') || wallet.name
    return {
        // создание иконок
        gm_picturefill: {

            ldpi: {
                options: {
                    picturefill: [
                        {
                            breakpoint: '36', name: 'ic_launcher', size: { width: 36, height: 36 }, quality: 100
                        }
                    ]
                },
                files: {
                    [`./projects/${walletName}/platforms/android/app/src/main/res/mipmap-ldpi`]: [
                        `./projects/${walletName}/src/img/icon-android.png`]
                }
            },
            ldpiBackgroundV26: {
                options: {
                    picturefill: [
                        {
                            breakpoint: '36', name: 'ic_launcher_background', size: { width: 36, height: 36 }, quality: 100
                        }
                    ]
                },
                files: {
                    [`./projects/${walletName}/platforms/android/app/src/main/res/mipmap-ldpi-v26`]: [
                        `./projects/${walletName}/src/img/icon-android-background.png`]
                }
            },
            ldpiForegroundV26: {
                options: {
                    picturefill: [
                        {
                            breakpoint: '36', name: 'ic_launcher_foreground', size: { width: 36, height: 36 }, quality: 100
                        }
                    ]
                },
                files: {
                    [`./projects/${walletName}/platforms/android/app/src/main/res/mipmap-ldpi-v26`]: [
                        `./projects/${walletName}/src/img/icon-android-foreground.png`]
                }
            },
            ldpiNotifications: {
                options: {
                    picturefill: [
                        {
                            breakpoint: '36', name: 'ic_stat_notification', size: { width: 36, height: 36 }, quality: 100
                        }
                    ]
                },
                files: {
                    [`./projects/${walletName}/platforms/android/app/src/main/res/mipmap-ldpi`]: [
                        `./projects/${walletName}/src/img/icon-android-notification.png`]
                }
            },

            mdpi: {
                options: {
                    picturefill: [
                        {
                            breakpoint: '48', name: 'ic_launcher', size: { width: 48, height: 48 }, quality: 100
                        }
                    ]
                },
                files: {
                    [`./projects/${walletName}/platforms/android/app/src/main/res/mipmap-mdpi`]: [
                        `./projects/${walletName}/src/img/icon-android.png`]
                }
            },
            mdpiBackgroundV26: {
                options: {
                    picturefill: [
                        {
                            breakpoint: '48', name: 'ic_launcher_background', size: { width: 48, height: 48 }, quality: 100
                        }
                    ]
                },
                files: {
                    [`./projects/${walletName}/platforms/android/app/src/main/res/mipmap-mdpi-v26`]: [
                        `./projects/${walletName}/src/img/icon-android-background.png`]
                }
            },
            mdpiForegroundV26: {
                options: {
                    picturefill: [
                        {
                            breakpoint: '48', name: 'ic_launcher_foreground', size: { width: 48, height: 48 }, quality: 100
                        }
                    ]
                },
                files: {
                    [`./projects/${walletName}/platforms/android/app/src/main/res/mipmap-mdpi-v26`]: [
                        `./projects/${walletName}/src/img/icon-android-foreground.png`]
                }
            },
            mdpiNotifications: {
                options: {
                    picturefill: [
                        {
                            breakpoint: '48', name: 'ic_stat_notification', size: { width: 48, height: 48 }, quality: 100
                        }
                    ]
                },
                files: {
                    [`./projects/${walletName}/platforms/android/app/src/main/res/mipmap-mdpi`]: [
                        `./projects/${walletName}/src/img/icon-android-notification.png`]
                }
            },

            hdpi: {
                options: {
                    picturefill: [
                        {
                            breakpoint: '72', name: 'ic_launcher', size: { width: 72, height: 72 }, quality: 100
                        }
                    ]
                },
                files: {
                    [`./projects/${walletName}/platforms/android/app/src/main/res/mipmap-hdpi`]: [
                        `./projects/${walletName}/src/img/icon-android.png`]
                }
            },
            hdpiBackgroundV26: {
                options: {
                    picturefill: [
                        {
                            breakpoint: '72', name: 'ic_launcher_background', size: { width: 72, height: 72 }, quality: 100
                        }
                    ]
                },
                files: {
                    [`./projects/${walletName}/platforms/android/app/src/main/res/mipmap-hdpi-v26`]: [
                        `./projects/${walletName}/src/img/icon-android-background.png`]
                }
            },
            hdpiForegroundV26: {
                options: {
                    picturefill: [
                        {
                            breakpoint: '72', name: 'ic_launcher_foreground', size: { width: 72, height: 72 }, quality: 100
                        }
                    ]
                },
                files: {
                    [`./projects/${walletName}/platforms/android/app/src/main/res/mipmap-hdpi-v26`]: [
                        `./projects/${walletName}/src/img/icon-android-foreground.png`]
                }
            },
            hdpiNotifications: {
                options: {
                    picturefill: [
                        {
                            breakpoint: '72', name: 'ic_stat_notification', size: { width: 72, height: 72 }, quality: 100
                        }
                    ]
                },
                files: {
                    [`./projects/${walletName}/platforms/android/app/src/main/res/mipmap-hdpi`]: [
                        `./projects/${walletName}/src/img/icon-android-notification.png`]
                }
            },

            xhdpi: {
                options: {
                    picturefill: [
                        {
                            breakpoint: '96', name: 'ic_launcher', size: { width: 96, height: 96 }, quality: 100
                        }
                    ]
                },
                files: {
                    [`./projects/${walletName}/platforms/android/app/src/main/res/mipmap-xhdpi`]: [
                        `./projects/${walletName}/src/img/icon-android.png`]
                }
            },
            xhdpiBackgroundV26: {
                options: {
                    picturefill: [
                        {
                            breakpoint: '216', name: 'ic_launcher_background', size: { width: 216, height: 216 }, quality: 100
                        }
                    ]
                },
                files: {
                    [`./projects/${walletName}/platforms/android/app/src/main/res/mipmap-xhdpi-v26`]: [
                        `./projects/${walletName}/src/img/icon-android-background.png`]
                }
            },
            xhdpiForegroundV26: {
                options: {
                    picturefill: [
                        {
                            breakpoint: '216', name: 'ic_launcher_foreground', size: { width: 216, height: 216 }, quality: 100
                        }
                    ]
                },
                files: {
                    [`./projects/${walletName}/platforms/android/app/src/main/res/mipmap-xhdpi-v26`]: [
                        `./projects/${walletName}/src/img/icon-android-foreground.png`]
                }
            },
            xhdpiNotifications: {
                options: {
                    picturefill: [
                        {
                            breakpoint: '96', name: 'ic_stat_notification', size: { width: 96, height: 96 }, quality: 100
                        }
                    ]
                },
                files: {
                    [`./projects/${walletName}/platforms/android/app/src/main/res/mipmap-xhdpi`]: [
                        `./projects/${walletName}/src/img/icon-android-notification.png`]
                }
            },

            xxhdpi: {
                options: {
                    picturefill: [
                        {
                            breakpoint: '144', name: 'ic_launcher', size: { width: 144, height: 144 }, quality: 100
                        }
                    ]
                },
                files: {
                    [`./projects/${walletName}/platforms/android/app/src/main/res/mipmap-xxhdpi`]: [
                        `./projects/${walletName}/src/img/icon-android.png`]
                }
            },
            xxhdpiBackgroundV26: {
                options: {
                    picturefill: [
                        {
                            breakpoint: '324', name: 'ic_launcher_background', size: { width: 324, height: 324 }, quality: 100
                        }
                    ]
                },
                files: {
                    [`./projects/${walletName}/platforms/android/app/src/main/res/mipmap-xxhdpi-v26`]: [
                        `./projects/${walletName}/src/img/icon-android-background.png`]
                }
            },
            xxhdpiForegroundV26: {
                options: {
                    picturefill: [
                        {
                            breakpoint: '324', name: 'ic_launcher_foreground', size: { width: 324, height: 324 }, quality: 100
                        }
                    ]
                },
                files: {
                    [`./projects/${walletName}/platforms/android/app/src/main/res/mipmap-xxhdpi-v26`]: [
                        `./projects/${walletName}/src/img/icon-android-foreground.png`]
                }
            },
            xxhdpiNotifications: {
                options: {
                    picturefill: [
                        {
                            breakpoint: '144', name: 'ic_stat_notification', size: { width: 144, height: 144 }, quality: 100
                        }
                    ]
                },
                files: {
                    [`./projects/${walletName}/platforms/android/app/src/main/res/mipmap-xxhdpi`]: [
                        `./projects/${walletName}/src/img/icon-android-notification.png`]
                }
            },

            xxxhdpi: {
                options: {
                    picturefill: [
                        {
                            breakpoint: '192', name: 'ic_launcher', size: { width: 192, height: 192 }, quality: 100
                        }
                    ]
                },
                files: {
                    [`./projects/${walletName}/platforms/android/app/src/main/res/mipmap-xxxhdpi`]: [
                        `./projects/${walletName}/src/img/icon-android.png`]
                }
            },
            xxxhdpiBackgroundV26: {
                options: {
                    picturefill: [
                        {
                            breakpoint: '432', name: 'ic_launcher_background', size: { width: 432, height: 432 }, quality: 100
                        }
                    ]
                },
                files: {
                    [`./projects/${walletName}/platforms/android/app/src/main/res/mipmap-xxxhdpi-v26`]: [
                        `./projects/${walletName}/src/img/icon-android-background.png`]
                }
            },
            xxxhdpiForegroundV26: {
                options: {
                    picturefill: [
                        {
                            breakpoint: '432', name: 'ic_launcher_foreground', size: { width: 432, height: 432 }, quality: 100
                        }
                    ]
                },
                files: {
                    [`./projects/${walletName}/platforms/android/app/src/main/res/mipmap-xxxhdpi-v26`]: [
                        `./projects/${walletName}/src/img/icon-android-foreground.png`]
                }
            },
            xxxhdpiNotifications: {
                options: {
                    picturefill: [
                        {
                            breakpoint: '192', name: 'ic_stat_notification', size: { width: 192, height: 192 }, quality: 100
                        }
                    ]
                },
                files: {
                    [`./projects/${walletName}/platforms/android/app/src/main/res/mipmap-xxxhdpi`]: [
                        `./projects/${walletName}/src/img/icon-android-notification.png`]
                }
            },

            ios: {
                options: {
                    picturefill: [
                        { breakpoint: 'icon-20@2x', name: 'icon-20@2x', size: { width: 40, height: 40 } },
                        { breakpoint: 'icon-20', name: 'icon-20', size: { width: 20, height: 20 } },
                        { breakpoint: 'icon-20@3x', name: 'icon-20@3x', size: { width: 60, height: 60 } },
                        { breakpoint: 'icon-24@2x', name: 'icon-24@2x', size: { width: 48, height: 48 } },
                        { breakpoint: 'icon-27.5@2x', name: 'icon-27.5@2x', size: { width: 55, height: 55 } },
                        { breakpoint: 'icon-29', name: 'icon-29', size: { width: 29, height: 29 } },
                        { breakpoint: 'icon-29@2x', name: 'icon-29@2x', size: { width: 58, height: 58 } },
                        { breakpoint: 'icon-29@3x', name: 'icon-29@3x', size: { width: 87, height: 87 } },
                        { breakpoint: 'icon-44@2x', name: 'icon-44@2x', size: { width: 88, height: 88 } },
                        { breakpoint: 'icon-86@2x', name: 'icon-86@2x', size: { width: 172, height: 172 } },
                        { breakpoint: 'icon-98@2x', name: 'icon-98@2x', size: { width: 196, height: 196 } },
                        { breakpoint: '180px', name: 'icon-60@3x', size: { width: 180, height: 180 } },
                        { breakpoint: '167px', name: 'icon-83.5@2x', size: { width: 167, height: 167 } },
                        { breakpoint: '152px', name: 'icon-76@2x', size: { width: 152, height: 152 } },
                        { breakpoint: '144px', name: 'icon-72@2x', size: { width: 144, height: 144 } },
                        { breakpoint: '120px', name: 'icon-60@2x', size: { width: 120, height: 120 } },
                        { breakpoint: '114px', name: 'icon@2x', size: { width: 114, height: 114 } },
                        { breakpoint: '100px', name: 'icon-50@2x', size: { width: 100, height: 100 } },
                        { breakpoint: '87px', name: 'icon-small@3x', size: { width: 87, height: 87 } },
                        { breakpoint: '80px', name: 'icon-40@2x', size: { width: 80, height: 80 } },
                        { breakpoint: '76px', name: 'icon-76', size: { width: 76, height: 76 } },
                        { breakpoint: '72px', name: 'icon-72', size: { width: 72, height: 72 } },
                        { breakpoint: '60px', name: 'icon-60', size: { width: 60, height: 60 } },
                        { breakpoint: '58px', name: 'icon-small@2x', size: { width: 58, height: 58 } },
                        { breakpoint: '57px', name: 'icon', size: { width: 57, height: 57 } },
                        { breakpoint: '50px', name: 'icon-50', size: { width: 50, height: 50 } },
                        { breakpoint: '40px', name: 'icon-40', size: { width: 40, height: 40 } },
                        { breakpoint: '1024px', name: 'icon-1024', size: { width: 1024, height: 1024 } },
                        { breakpoint: '29px', name: 'icon-small', size: { width: 29, height: 29 } }]
                },
                files: {
                    [`./projects/${walletName}/platforms/ios/${walletName}/Images.xcassets/AppIcon.appiconset`]: [`./projects/${walletName}/src/img/icon-ios.png`]
                }
            }
        }
    }
}
