import { makeGetNearbyGymsUseCase } from '@/use-cases/gym/factories/make-get-nearby-gyms-use-case';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function getNearbyGymsController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const getNearbyGymsQuerySchema = z.object({
		latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
		longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
	});

	const { latitude, longitude } = getNearbyGymsQuerySchema.parse(request.query);

	const getNearbyGymsUseCase = makeGetNearbyGymsUseCase();

	const { gyms } = await getNearbyGymsUseCase.execute({
		userLatitude: latitude,
		userLongitude: longitude,
	});

	return reply.status(200).send({ gyms });
}
