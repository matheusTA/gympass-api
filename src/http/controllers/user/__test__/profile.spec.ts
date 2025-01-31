import { app } from '@/app';
import { createAndAuthenticateUser } from '@/shared/test/create-and-authenticate-user';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('profile controller', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to get user profile', async () => {
		const { token } = await createAndAuthenticateUser(app);

		const profileResponse = await request(app.server)
			.get('/me')
			.set('Authorization', `Bearer ${token}`)
			.send();

		expect(profileResponse.status).toBe(200);
		expect(profileResponse.body.user).toEqual(
			expect.objectContaining({
				email: 'johndoe@example.com',
			}),
		);
	});
});
