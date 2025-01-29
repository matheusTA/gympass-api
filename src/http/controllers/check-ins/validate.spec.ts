import { app } from '@/app';
import { prisma } from '@/config/prisma';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('validate check-in controller', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to validate check-in', async () => {
		const { token } = await createAndAuthenticateUser(app);

		const user = await prisma.user.findFirstOrThrow();

		const gym = await prisma.gym.create({
			data: {
				title: 'Gym 01',
				latitude: -8.0412672,
				longitude: -34.9077504,
			},
		});

		const checkIn = await prisma.checkIn.create({
			data: {
				userId: user.id,
				gymId: gym.id,
			},
		});

		const response = await request(app.server)
			.patch(`/check-ins/${checkIn.id}/validate`)
			.set('Authorization', `Bearer ${token}`)
			.send();

		expect(response.status).toBe(204);
	});
});
