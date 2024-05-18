import { z } from 'zod'

const CreateAgentSchema = z.object({
  name: z.string(),
  phone: z.string()
})

export { CreateAgentSchema }
