import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { Role } from '@prisma/client';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('create gym controller', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to create gym', async () => {
		const { token } = await createAndAuthenticateUser(app, Role.ADMIN);

		const response = await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Gym 1',
				description: 'Gym 1 description',
				phone: '123456789',
				latitude: -7.8477608,
				longitude: -34.8428543,
			});

		expect(response.status).toBe(201);
	});
});
