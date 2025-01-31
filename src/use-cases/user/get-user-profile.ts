import type { UsersRepository } from '@/repositories/users-repository';
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found';
import type { User } from '@prisma/client';

interface GetUserProfileUseCaseInput {
	userId: string;
}

interface GetUserProfileUseCaseOutput {
	user: User;
}

export class GetUserProfileUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		userId,
	}: GetUserProfileUseCaseInput): Promise<GetUserProfileUseCaseOutput> {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new ResourceNotFoundError();
		}

		return {
			user,
		};
	}
}
