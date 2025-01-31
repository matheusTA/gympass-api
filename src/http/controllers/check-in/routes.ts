import { verifyJWT } from '@/http/middlewares/verify-jwt';
import type { FastifyInstance } from 'fastify';
import { createCheckInController } from './create';
import { checkInsHistoryController } from './history';
import { checkInsUserMetricsController } from './metrics';
import { validateCheckInController } from './validate';

export async function checkInsRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJWT);

	app.get('/check-ins/history', checkInsHistoryController);
	app.get('/check-ins/metrics', checkInsUserMetricsController);
	app.patch('/check-ins/:checkInId/validate', validateCheckInController);
	app.post('/check-ins', createCheckInController);
}
