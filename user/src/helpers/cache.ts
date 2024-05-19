import { redisClient } from '../initializers/redis.js'
import { type RestaurantType } from '../models/restaurant.model.js'

async function setRestaurantsToCache (key: string, posts: RestaurantType[]): Promise<void> {
  if (redisClient == null || redisClient.status !== 'ready' || posts.length === 0) {
    return
  }
  await redisClient.set(key, JSON.stringify(posts))
}

async function fetchRestaurantsFromCache (key: string): Promise<RestaurantType[] | null> {
  if (redisClient == null || redisClient.status !== 'ready') {
    return null
  }
  const result = await redisClient.get(key)
  if (result == null) {
    return null
  }
  return JSON.parse(result) as RestaurantType[]
}

async function clearCache (): Promise<void> {
  if (redisClient == null || redisClient.status !== 'ready') {
    return
  }
  await redisClient.flushdb()
}

export { setRestaurantsToCache, fetchRestaurantsFromCache, clearCache }
