import { app } from '@/app';
import { prisma } from '@/config/prisma';
import { createAndAuthenticateUser } from '@/shared/test/create-and-authenticate-user';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('create check-in controller', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to create check-in', async () => {
		const { token } = await createAndAuthenticateUser(app);

		const gym = await prisma.gym.create({
			data: {
				title: 'Gym 01',
				latitude: -8.0412672,
				longitude: -34.9077504,
			},
		});

		const response = await request(app.server)
			.post('/check-ins')
			.set('Authorization', `Bearer ${token}`)
			.send({
				gymId: gym.id,
				latitude: -8.0412672,
				longitude: -34.9077504,
			});

		expect(response.status).toBe(201);
	});
});
