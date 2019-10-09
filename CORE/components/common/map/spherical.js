const EARTH_RADIUS = 6371009

function toRadians(d) {
    return d * Math.PI / 180
}

/**
 * Returns haversine(angle-in-radians).
 * hav(x) == (1 - cos(x)) / 2 == sin(x / 2)^2.
 */
function hav(x) {
    const sinHalf = Math.sin(x * 0.5)
    return sinHalf * sinHalf
}

/**
 * Computes inverse haversine. Has good numerical stability around 0.
 * arcHav(x) == acos(1 - 2 * x) == 2 * asin(sqrt(x)).
 * The argument must be in [0, 1], and the result is positive.
 */
function arcHav(x) {
    return 2 * Math.asin(Math.sqrt(x))
}

/**
 * Returns hav() of distance from (lat1, lng1) to (lat2, lng2) on the unit sphere.
 */
function havDistance(lat1, lat2, dLng) {
    return hav(lat1 - lat2) + hav(dLng) * Math.cos(lat1) * Math.cos(lat2)
}

/**
 * Returns distance on the unit sphere; the arguments are in radians.
 */
function distanceRadians(lat1, lng1, lat2, lng2) {
    return arcHav(havDistance(lat1, lat2, lng1 - lng2))
}

/**
 * Returns the angle between two LatLngs, in radians. This is the same as the distance
 * on the unit sphere.
 */
function computeAngleBetween(from, to) {
    return distanceRadians(toRadians(from.lat), toRadians(from.lng),
        toRadians(to.lat), toRadians(to.lng))
}

/**
 * Returns the distance between two LatLngs, in meters.
 */
export const computeDistanceBetween = (from, to) => {
    return computeAngleBetween(from, to) * EARTH_RADIUS
}
