import { makeCheckInUseCase } from '@/use-cases/check-in/factories/make-check-in-use-case';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createCheckInController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const createCheckInBodySchema = z.object({
		gymId: z.string().uuid(),
		latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
		longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
	});

	const { gymId, latitude, longitude } = createCheckInBodySchema.parse(
		request.body,
	);

	const checkInUseCase = makeCheckInUseCase();

	await checkInUseCase.execute({
		gymId,
		userId: request.user.sub,
		userLatitude: latitude,
		userLongitude: longitude,
	});

	return reply.status(201).send();
}
