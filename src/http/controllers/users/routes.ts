import { verifyJWT } from '@/http/middlewares/verify-jwt';
import type { FastifyInstance } from 'fastify';
import { authenticateController } from './authenticate';
import { profileController } from './profile';
import { refreshController } from './refresh';
import { registerController } from './register';

export async function usersRoutes(app: FastifyInstance) {
	app.post('/users', registerController);
	app.post('/sessions', authenticateController);
	app.patch('/token/refresh', refreshController);
	app.get('/me', { onRequest: [verifyJWT] }, profileController);
}
