/* eslint-disable class-methods-use-this */
import Axios from 'axios/index'
import { get } from 'lodash'

Axios.interceptors.response.use(
    response => response,
    (error) => {
        if (error.message === 'Network Error' || error.message === 'No internet connection') {
            return Promise.reject({
                error: 404,
                desc: 'Network Error'
            })
        }

        if (error.message && error.message.indexOf('timeout of') > -1) {
            return Promise.reject({
                error: 504,
                desc: 'Gateway Timeout.'
            })
        }

        return Promise.reject(error)
    },
)

export default class CommonClient {
    /**
     * Отправка журнала событий в HockeyApp
     * @param json - {Object} [object]
     * @param json.subject
     * @param json.oem
     * @param json.model
     * @param json.os_version
     * @param json.name
     * @param json.email
     * @param blob
     * @returns {AxiosPromise}
     * @constructor
     */
    SendFeedbackLog(json, blob) {
        console.log('mWalletClient.Core:SendFeedbackLog')
        const data = {
            text: 'log JS',
            subject: json.subject,
            oem: json.oem,
            model: json.model,
            os_version: json.os_version,
            name: json.name,
            lang: json.lang,
            email: json.email,
            attachment0: blob
        }

        const formData = new FormData()
        Object.keys(data).map((key) => {
            if (key === 'attachment0') {
                formData.append(key, get(data, key), 'log.json')
            } else {
                formData.append(key, get(data, key))
            }
            return true
        })

        return Axios({
            method: 'post',
            url: `https://rink.hockeyapp.net/api/2/apps/${json.hockeyAppID}/feedback`,
            data: formData,
            header: {
                'x-hockeyapptoken': json.hockeyAppToken
            }
        })
    }

    GetInfoDevice() {
        console.log('mWalletClient.Core:GetInfoDevice')

        return Axios({
            method: 'get',
            url: 'http://ipinfo.io',
            header: {
                Accept: 'application/json'
            }
        })
    }
}
