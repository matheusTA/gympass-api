import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { describe, it, expect } from 'vitest'
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { UsersAlreadyExistsError } from '@/errors/users-already-exists-error';

describe('register use case', () => {
  it('should hash user password upon registration', async () => {
    const registerUseCase = new RegisterUseCase(new InMemoryUsersRepository())

    const user = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndow@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.user.passwordHash)

    expect(isPasswordCorrectlyHashed).toBeTruthy()
  });

  it('should not be able to register with same email twice', async () => {
    const registerUseCase = new RegisterUseCase(new InMemoryUsersRepository())

    const email = 'johndow@example.com'

    await registerUseCase.execute({
      name: 'John Doe one',
      email,
      password: '123456',
    })

    await expect(() => registerUseCase.execute({
      name: 'John Doe two',
      email,
      password: '123456',
    })).rejects.toBeInstanceOf(UsersAlreadyExistsError)
  });

  it('should be able to register', async () => {
    const registerUseCase = new RegisterUseCase(new InMemoryUsersRepository())

    const {user} = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndow@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  });
});
