import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { describe, it, expect } from 'vitest';
import { hash } from 'bcryptjs';
import { AuthenticateUseCase } from './authenticate';
import { InvalidCredentialsError } from '@/errors/invalid-credentials-error';

describe('authenticate use case', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndow@example.com',
      passwordHash: await hash('123456', 6),
    })

    const { user } = await authenticateUseCase.execute({
      email: 'johndow@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  });

  it('should not be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    await expect(() => authenticateUseCase.execute({
      email: 'johndow@example.com',
      password: '123456',
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  });

  it('should not be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndow@example.com',
      passwordHash: await hash('123456', 6),
    })

    await expect(() => authenticateUseCase.execute({
      email: 'johndow@example.com',
      password: '123123',
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  });
});
