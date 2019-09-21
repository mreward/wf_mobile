const optipng = require('imagemin-optipng')
const svgo = require('imagemin-svgo')

/**
 * Сжатие картинок
 * @param grunt
 * @param wallet
 * @returns {{imagemin: {options: {cache: boolean, optimizationLevel: number, use: *[]}, dynamic: {files: *[]}}}}
 */
module.exports = function({ grunt, wallet }) {
    grunt.loadNpmTasks('grunt-contrib-imagemin')

    return {
        imagemin: {
            options: {
                cache: false,
                optimizationLevel: 7,
                use: [
                    optipng(), svgo({
                        plugins: [
                            { removeViewBox: false }, // Don't remove the viewbox atribute from the SVG
                            { removeUselessStrokeAndFill: false }, // Don't remove Useless Strokes and Fills
                            { removeEmptyAttrs: false }
                            // {
                            //     removeAttrs: {
                            //         attrs: ['xmlns'],
                            //     },
                            // },
                        ]
                    })]
            },

            dynamic: {
                files: [
                    {
                        expand: true,
                        cwd: `projects/${wallet.name}/src/img/`,
                        src: ['**/*.{png,jpg,gif,svg}'],
                        dest: `projects/${wallet.name}/src/img/`
                    }]
            },

            android: {
                files: [
                    {
                        expand: true,
                        cwd: `projects/${wallet.name}/platforms/android/app/src/main/res/`,
                        src: ['**/*.{png,jpg,gif}'],
                        dest: `projects/${wallet.name}/platforms/android/app/src/main/res/`
                    }]
            },

            svg: {
                files: [
                    {
                        expand: true,
                        cwd: `projects/${wallet.name}/src/img/`,
                        src: ['**/*.svg'],
                        dest: `projects/${wallet.name}/src/img/`
                    }]
            }
        }
    }
}
