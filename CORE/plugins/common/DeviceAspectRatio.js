export default {
    async hasUnSafeArea() {
        try {
            const aspectRatio = await this.GetAspectRatio()
            return (
                (aspectRatio[0] === 18.5 && aspectRatio[1] === 9) ||
                (aspectRatio[0] === 19.5 && aspectRatio[1] === 9) ||
                (aspectRatio[0] === 19 && aspectRatio[1] === 9)
            )
        } catch (e) {
            return false
        }
    },

    GetAspectRatio () {
        return new Promise((resolve, reject) => {
            if (window.plugins && window.plugins.screensize) {
                window.plugins.screensize.get((screenInfo) => {
                    resolve(this.Calculate(screenInfo.width, screenInfo.height))
                }, (e) => {
                    reject(e)
                })
            } else {
                console.log('need add install plugin cordova-plugin-screensize')
                resolve(this.Calculate(window.innerWidth, window.innerHeight))
                // reject()
            }
        })
    },

    Calculate (n1, d1) {
        let n2
        // const n2 = 18.5
        const d2 = 9

        // if (n2 == "")
        // {
        //     fob.num2.value = Math.round(d2 * n1 / d1);
        // }

        if (!n2) {
            n2 = Math.round(d2 * n1 / d1)
        }

        // if (!d2) {
        //     return Math.round(d1 * n2 / n1)
        // }

        return [n2, d2]
    }
}
