import GoogleMapsLoader from 'google-maps'
import { cloneDeep, find, get, isFunction } from 'lodash'
import MarkerClusterer from '@google/markerclusterer'
import runFunction from '_CORE/utils/runFunction'
import '_CORE/img/cluster-1.png'
import '_CORE/img/cluster-2.png'
import '_CORE/img/cluster-3.png'
import '_CORE/img/cluster-4.png'
import '_CORE/img/cluster-5.png'
/*eslint-disable */

/**
 * Google Maps Directive
 *
 * It appends JS Map or Native Map to a specific div.
 *
 * For JS Map it uses {@link https://developers.google.com/maps/documentation/javascript/}
 *
 * For Native Map it uses cordova-plugin-google-maps {@link https://github.com/mapsplugin/cordova-plugin-googlemaps}
 *
 * To use:
 * Add to any `div`
 *
 * @example
 * <caption>To apply native map, add `v-map` with native modifier </caption>
 * <div v-map.native />
 *
 * @example
 * <caption>To apply JS map, just add `v-map` to a `div`</caption>
 * <div v-map />
 *
 * @example
 * <caption>Pass array with markers ( each marker is an object ) to `v-map` attribute</caption>
 * <div v-map="{
 * markers: [
 *     {
 *     latitude: '1111',
 *     longitude: '1111',
 *     name: 'Title',
 *     address: 'Address',
 *     }],
 * }"/>
 *
 * @example
 * <caption>Pass callback function, that fires when map is loaded </caption>
 * <div v-map="{
 *  markers: [
 *     {
 *     latitude: '1111',
 *     longitude: '1111',
 *     name: 'Title',
 *     address: 'Address',
 *     }],
 *     callbackReady: callback,
 * }"/>
 *
 * @example
 * <caption>Pass showInfoWindow(default true), to show info window with description of markers</caption>
 * <div v-map="{
 * markers: [
 *     {
 *     latitude: '1111',
 *     longitude: '1111',
 *     name: 'Title',
 *     address: 'Address',
 *     }],
 *     showInfoWindow: false,
 * }"/>
 *
 * @example
 * <caption>To off default control buttons</caption>
 * <div v-map.disableDefaultUI />
 *
 * @type {{bind: function(*, {value: {markers: Array, Boolean, Number, callback}}, *)}}
 */
export default {
    name: 'map',
    bind: async (el, { value = {}, modifiers }) => {
        const {
            setActiveAnimation = false,
            showInfoWindow = true, zoom = 13, zoomMax = 18,
            callbackReady, callbackClickCancel, native = false,
            useClusters = false, callbackClick
        } = value
        const { iconSize = {} } = value
        const { width = 24, height = 24 } = iconSize
        let { markers = [] } = value;
        const { timeoutMarkerReady = 1200 } = value;

        const markersOrigin = cloneDeep(markers);

        let icon = './location.png'
        try {
            const LocationImg = await import('_img_location')
            icon = `./${LocationImg.default}`
        } catch (e) {}

        markers = markers.map((item) => {
            const { latitude: lat, longitude: lng } = item;
            item.icon = { url: icon, size: { width, height } };

            if (!lat || !lng) {
                return false;
            }

            item.latitude = parseFloat(item.latitude)
            item.longitude = parseFloat(item.longitude)

            item.position = { lat, lng };

            return item;
        });

        el.style.display = 'block !important';
        // if (markers.length === 0) {
        //     el.style.display = 'none';
        //     return;
        // }
        if (window.cordova && (modifiers.native || native)) {
            setTimeout(() => {
                const options = {
                    camera: {
                        target: markers[0].position,
                        zoom,
                    },
                };

                el.map = plugin.google.maps.Map.getMap(el, options);
                const onMapReady = () => {
                    document.body.className += ' map-active';
                    setTimeout(() => {
                        if (useClusters && markers.length >= 2) {
                            el.map.addMarkerCluster({
                                boundsDraw: false,
                                markers,
                                icons: [
                                    { min: 2, max: 10, url: './cluster-1.png', anchor: { x: 16, y: 16 } },
                                    { min: 10, max: 100, url: './cluster-2.png', anchor: { x: 16, y: 16 } },
                                    { min: 100, max: 500, url: './cluster-3.png', anchor: { x: 24, y: 24 } },
                                    { min: 500, max: 1000, url: './cluster-4.png', anchor: { x: 32, y: 32 } },
                                    { min: 1000, url: './cluster-5.png', anchor: { x: 48, y: 48 } },
                                ],
                            }, (markerCluster) => {
                                // Add a maker
                                markers.forEach((item) => {
                                    const options = {};

                                    if (item.icon) {
                                        options.icon = item.icon;
                                    }

                                    markerCluster.addMarker({
                                        position: { lat: item.latitude, lng: item.longitude },
                                        title: item.name,
                                        ...options,
                                    });
                                });

                                markerCluster.on(plugin.google.maps.event.MARKER_CLICK, (position, marker) => {
                                    const markerItem = find(markersOrigin, (item) => {
                                        return item.latitude === marker.get('position').lat && item.longitude === marker.get('position').lng;
                                    });

                                    if (isFunction(callbackClick)) {
                                        callbackClick(markerItem);

                                        el.map.on(plugin.google.maps.event.MAP_CLICK, () => {
                                            runFunction(callbackClickCancel)
                                        })
                                    }

                                    if(setActiveAnimation) {
                                        el.map.animateCamera({
                                            target: { lat: markerItem.latitude, lng: markerItem.longitude },
                                            zoom: zoomMax,
                                            duration: 3000
                                        })
                                    }
                                });
                            });
                        } else {
                            el.map.animateCamera({
                                target: { lat: markers[0].latitude, lng: markers[0].longitude },
                                zoom,
                                duration: 3000,
                            }, () => {
                                // Add a maker
                                markers.map((item) => {
                                    const options = {};

                                    if (item.icon) {
                                        options.icon = item.icon;
                                    }

                                    el.map.addMarker({
                                        position: { lat: item.latitude, lng: item.longitude },
                                        title: item.name,
                                        ...options,
                                    }, (marker) => {
                                        // Show the info window
                                        if (showInfoWindow) {
                                            marker.showInfoWindow();
                                        }

                                        // Catch the click event
                                        marker.on(plugin.google.maps.event.INFO_CLICK, () => {
                                            // To do something...
                                        });

                                        marker.on(plugin.google.maps.event.MARKER_CLICK, () => {
                                            if (isFunction(callbackClick)) {
                                                callbackClick(item)
                                                el.map.addListener('click', () => {
                                                    runFunction(callbackClickCancel)
                                                })
                                            }

                                            if(setActiveAnimation) {
                                                el.map.animateCamera({
                                                    target: { lat: item.latitude, lng: item.longitude },
                                                    zoom: zoomMax,
                                                    duration: 3000
                                                })
                                            }
                                        });
                                    });
                                    return true;
                                });
                            });
                        }
                    }, 200);

                    el.map.goTo = (to) => {
                        el.map.animateCamera({
                            target: { lat: to.latitude, lng: to.longitude },
                            zoomMax,
                            duration: 3000,
                        });
                    }

                    if (typeof callbackReady === 'function') {
                        callbackReady(el.map);
                    }
                };
                el.map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
            }, 600);
        } else {
            GoogleMapsLoader.KEY = value.apiKey;
            GoogleMapsLoader.VERSION = 'weekly';
            GoogleMapsLoader.load((google) => {
                let options = {
                    center: { lat: 0, lng: 0 },
                    zoom,
                    disableDefaultUI: modifiers.disableDefaultUI
                }
                const markerMain = get(markers, '0')
                if (markerMain) {
                    options.center = { lat: markerMain.latitude, lng: markerMain.longitude }
                }

                el.map = new google.maps.Map(el, options);

                el.map.goTo = (to) => {
                    el.map.setZoom(zoomMax)
                    el.map.setCenter(new google.maps.LatLng(to.latitude, to.longitude))
                }

                google.maps.event.addListenerOnce(el.map, 'idle', () => {
                    if (typeof callbackReady === 'function') {
                        callbackReady(el.map);
                    }
                });

                const listMarkers = [];

                markers.map((item, i) => {
                    if(!item) {
                        return
                    }

                    const newMarker = new google.maps.Marker({
                        position: { lat: item.latitude, lng: item.longitude },
                        title: item.name,
                        map: el.map,
                        icon: {
                            url: get(item, 'icon.url'),
                            size: new google.maps.Size(item.icon.size.width, item.icon.size.height),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(0, 0),
                            scaledSize: new google.maps.Size(item.icon.size.width, item.icon.size.height),
                        },
                    });

                    listMarkers.push(newMarker);
                    setTimeout(() => {
                        if (isFunction(callbackClick) || showInfoWindow) {
                            google.maps.event.addListener(newMarker, 'click', ((marker, i) => {
                                return () => {
                                    if (isFunction(callbackClick)) {
                                        callbackClick(item);
                                        el.map.addListener('click', () => {
                                            runFunction(callbackClickCancel)
                                        })
                                    }

                                    if(setActiveAnimation) {
                                        el.map.setZoom(zoomMax)
                                        el.map.setCenter(new google.maps.LatLng(item.latitude, item.longitude))
                                    }

                                    if (showInfoWindow) {
                                        const name = get(markers, `[${i}].name`)
                                        const address = get(markers, `[${i}].address`)
                                        const infowindow = new google.maps.InfoWindow({
                                            content: `<div>
                                                <div class="infowindow-content">
                                                    <div class="infowindow-title">${name}</div>
                                                    <strong>Address: </strong><span>${address}</span><br>
                                                </div>
                                              </div>`,
                                        });
                                        infowindow.open(el.map, marker);
                                    }
                                };
                            })(newMarker, i));
                        }
                    }, 600);
                    return true;
                });


                if (useClusters && listMarkers.length >= 2) {
                    const markerCluster = new MarkerClusterer(el.map, listMarkers, {
                        imagePath: './cluster-'
                    });
                }
            });
        }
    },
    unbind(el, { value: { native = false } = {}, modifiers }) {
        if (window.cordova && (modifiers.native || native)) {
            document.body.className = document.body.className.replace('map-active', '');
            setTimeout(() => {
                el.map.remove();
            }, 0);
        } else {
            GoogleMapsLoader.release(() => {
                console.log('No google maps api around');
            });
        }
    },
};
