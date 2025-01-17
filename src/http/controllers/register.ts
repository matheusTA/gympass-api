import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { registerUseCase } from '@/use-cases/register'

export async function registerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodyUser = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodyUser.parse(request.body)

  try {
    await registerUseCase({ name, email, password })
    return reply.status(201).send()
  } catch (error) {
    return reply.status(409).send()
  }
}
