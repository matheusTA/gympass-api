import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found';
import { GetUserProfileUseCase } from '@/use-cases/user/get-user-profile';
import { hash } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';

let usersRepository: InMemoryUsersRepository;
let getUserProfileUseCase: GetUserProfileUseCase;

describe('get user profile use case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);
	});

	it('should be able to get user profile', async () => {
		const createdUser = await usersRepository.create({
			name: 'John Doe',
			email: 'johndow@example.com',
			passwordHash: await hash('123456', 6),
		});

		const { user } = await getUserProfileUseCase.execute({
			userId: createdUser.id,
		});

		expect(user.email).toEqual('johndow@example.com');
	});

	it('should not be able get user profile with wrong id', async () => {
		await expect(() =>
			getUserProfileUseCase.execute({
				userId: 'wrong-id',
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
