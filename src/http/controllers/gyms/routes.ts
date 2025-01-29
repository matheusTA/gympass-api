import { verifyUserRole } from '@/http/middlewares/varify-user-role';
import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { Role } from '@prisma/client';
import type { FastifyInstance } from 'fastify';
import { createGymController } from './create-gym';
import { getNearbyGymsController } from './get-nearby-gyms';
import { searchGymsController } from './search-gyms';

export async function gymsRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJWT);

	app.get('/gyms/search', searchGymsController);
	app.get('/gyms/nearby', getNearbyGymsController);
	app.post(
		'/gyms',
		{ onRequest: [verifyUserRole(Role.ADMIN)] },
		createGymController,
	);
}
