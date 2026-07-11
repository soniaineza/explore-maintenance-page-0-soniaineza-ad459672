import { getPayload as getPayloadInstance } from 'payload'
import config from '../payload.config'

let cachedPayload: Awaited<ReturnType<typeof getPayloadInstance>> | null = null

export async function getPayload() {
  if (cachedPayload) return cachedPayload
  cachedPayload = await getPayloadInstance({ config })
  return cachedPayload
}
