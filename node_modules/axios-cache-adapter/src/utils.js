export function isOffline () {
  return 'navigator' in window && 'onLine' in navigator && !navigator.onLine
}
