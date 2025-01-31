import { randomUUID } from 'node:crypto';
import type { UsersRepository } from '@/repositories/users-repository';
import { type Prisma, Role, type User } from '@prisma/client';

export class InMemoryUsersRepository implements UsersRepository {
	private users: User[] = [];

	async findById(id: string) {
		const user = this.users.find((user) => user.id === id);

		if (!user) {
			return null;
		}

		return user;
	}

	async findByEmail(email: string) {
		const user = this.users.find((user) => user.email === email);

		if (!user) {
			return null;
		}

		return user;
	}

	async create(data: Prisma.UserCreateInput) {
		const user: User = {
			createdAt: new Date(),
			id: randomUUID(),
			name: data.name,
			email: data.email,
			passwordHash: data.passwordHash,
			role: data.role ?? Role.ADMIN,
		};

		this.users.push(user);

		return user;
	}
}
