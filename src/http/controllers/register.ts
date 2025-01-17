import { prisma } from '@/config/prisma'
import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { hash } from 'bcryptjs'

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

  const passwordHash = await hash(password, 6)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: passwordHash,
    },
  })

  return reply.status(201).send()
}
