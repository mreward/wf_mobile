import Permission from '_CORE/plugins/common/Permission'
import Vue from 'vue'
import GoogleMapsLoader from 'google-maps'

import { computeDistanceBetween } from '_CORE/components/common/map/spherical.js'

export default {
    getCurrentPosition (options = {}) {
        return new Promise(async (resolve, reject) => {
            if (window.cordova) {
                const result = await Permission.GetPermission(cordova.plugins.permissions.ACCESS_FINE_LOCATION)
                if (!result.hasPermission) {
                    reject()
                }
            }
            if (window.plugin && plugin.google.maps) {
                const {latLng} = await plugin.google.maps.LocationService.getMyLocation()
                const currentPosition = {
                    latitude: latLng.lat,
                    longitude: latLng.lng
                }
                resolve(currentPosition)
            } else if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition((pos) => {
                    const { coords } = pos
                    resolve(coords)
                }, (e) => {
                    reject(e)
                }, {enableHighAccuracy: false})
            } else {
                console.log('Could not obtain location. Failing silently')
                reject()
            }
        })
    },
    // Use only for native map

    calculetDistance (firstPoint, secondPoint) {
        if (Vue.prototype.$ons.isWebView()) {
            return plugin.google.maps.geometry.spherical.computeDistanceBetween(
                new plugin.google.maps.LatLng(firstPoint.latitude, firstPoint.longitude),
                new plugin.google.maps.LatLng(secondPoint.latitude, secondPoint.longitude))
        }
        return computeDistanceBetween({
            lat: firstPoint.latitude,
            lng: firstPoint.longitude
        }, {
            lat: secondPoint.latitude,
            lng: secondPoint.longitude
        }) || 0
    },
    getCity(latLng, apiKey) {
        return new Promise(async (resolve, reject) => {
            GoogleMapsLoader.KEY = apiKey
            GoogleMapsLoader.VERSION = 'weekly'
            GoogleMapsLoader.LANGUAGE = 'en'
            GoogleMapsLoader.load((google) => {
                console.log('I just loaded google maps api')
                const geocoder = new google.maps.Geocoder()
                geocoder.geocode({location: latLng}, (results, status) => {
                    if (status === 'OK') {
                        console.log(results)
                        resolve(results)
                    } else {
                        console.log('Geocode was not successful for the following reason: ' + status)
                        reject(status)
                    }
                })
            })
        })

        // if (Vue.prototype.$ons.isWebView()) {
        //     return new Promise(async (resolve) => {
        //         plugin.google.maps.Geocoder.geocode({'position': latLng}, (results) => {
        //             resolve(results)
        //         })
        //     })
        // }
    }

}
