import { prisma } from '@/config/prisma';
import { Role } from '@prisma/client';
import { hash } from 'bcryptjs';
import type { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function createAndAuthenticateUser(
	app: FastifyInstance,
	role: Role = Role.MEMBER,
) {
	await prisma.user.create({
		data: {
			name: 'John Doe',
			email: 'johndoe@example.com',
			passwordHash: await hash('123456', 6),
			role,
		},
	});

	const sessionResponse = await request(app.server).post('/sessions').send({
		email: 'johndoe@example.com',
		password: '123456',
	});
	const { token } = sessionResponse.body;

	return { token };
}
