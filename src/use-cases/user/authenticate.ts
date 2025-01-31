import type { UsersRepository } from '@/repositories/users-repository';
import { InvalidCredentialsError } from '@/use-cases/user/errors/invalid-credentials-error';
import type { User } from '@prisma/client';
import { compare } from 'bcryptjs';

interface AuthenticateUseCaseInput {
	email: string;
	password: string;
}

interface AuthenticateUseCaseOutput {
	user: User;
}

export class AuthenticateUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		email,
		password,
	}: AuthenticateUseCaseInput): Promise<AuthenticateUseCaseOutput> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new InvalidCredentialsError();
		}

		const doesPasswordMatchs = await compare(password, user.passwordHash);

		if (!doesPasswordMatchs) {
			throw new InvalidCredentialsError();
		}

		return {
			user,
		};
	}
}
