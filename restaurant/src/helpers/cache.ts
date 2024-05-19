import { redisClient } from '../initializers/redis.js'

async function clearCache (): Promise<void> {
  if (redisClient == null || redisClient.status !== 'ready') {
    return
  }
  await redisClient.flushdb()
}

export { clearCache }
