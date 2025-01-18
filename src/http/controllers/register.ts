import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '@/use-cases/register'

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
    const registerUseCase = new RegisterUseCase(new PrismaUsersRepository())

    await registerUseCase.execute({ name, email, password })

    return reply.status(201).send()
  } catch (error) {
    return reply.status(409).send()
  }
}
