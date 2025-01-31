import { makeGetUserMetricsUseCase } from '@/use-cases/check-in/factories/make-get-user-metrics-use-case';
import type { FastifyReply, FastifyRequest } from 'fastify';

export async function checkInsUserMetricsController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const getUserMetricsUseCase = makeGetUserMetricsUseCase();

	const { checkInsCount } = await getUserMetricsUseCase.execute({
		userId: request.user.sub,
	});

	return reply.status(200).send({ checkInsCount });
}
