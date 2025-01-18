import { prisma } from '@/config/prisma'
import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseInput {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseInput) {
    const useWithSameEmail = await this.usersRepository.findByEmail(email)

    if (useWithSameEmail) {
      throw new Error('User already exists')
    }

    const passwordHash = await hash(password, 6)

    await this.usersRepository.create({
      name,
      email,
      passwordHash,
    })
  }
}
