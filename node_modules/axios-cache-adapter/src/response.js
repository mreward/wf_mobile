import limit from './limit'
import { write } from './cache'

async function response (config, req, res) {
  const { request = {} } = res

  // exclude binary response from cache
  if (['arraybuffer', 'blob'].indexOf(request.responseType) > -1) {
    return res
  }

  if (!config.excludeFromCache) {
    const maxAge = req.maxAge || config.maxAge
    config.expires = maxAge === 0 ? 0 : Date.now() + maxAge

    if (config.limit) {
      config.debug(`Detected limit: ${config.limit}`)

      await limit(config)
    }

    await write(config, req, res)
  }

  return res
}

export default response
