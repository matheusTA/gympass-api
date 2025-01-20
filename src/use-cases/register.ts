import { UsersAlreadyExistsError } from '@/errors/users-already-exists-error'
import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

interface RegisterUseCaseInput {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseOutput {
  user: User
}

export class RegisterUseCase  {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseInput): Promise<RegisterUseCaseOutput> {
    const useWithSameEmail = await this.usersRepository.findByEmail(email)

    if (useWithSameEmail) {
      throw new UsersAlreadyExistsError()
    }

    const passwordHash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash,
    })

    return { user }
  }
}
