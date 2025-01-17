import { prisma } from '@/config/prisma'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseInput {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseInput) {
  const useWithSameEmail = await prisma.user.findUnique({
    where: { email },
  })

  if (useWithSameEmail) {
    throw new Error('User already exists')
  }

  const passwordHash = await hash(password, 6)

  const prismaUsersRepository = new PrismaUsersRepository()

  await prismaUsersRepository.create({
    name,
    email,
    passwordHash,
  })
}
