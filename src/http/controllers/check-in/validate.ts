import { makeValidateCheckInsUseCase } from '@/use-cases/check-in/factories/make-validate-check-ins-use-case';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function validateCheckInController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const validateCheckInQuerySchema = z.object({
		checkInId: z.string().uuid(),
	});

	const { checkInId } = validateCheckInQuerySchema.parse(request.params);

	const validateCheckInsUseCase = makeValidateCheckInsUseCase();

	await validateCheckInsUseCase.execute({
		checkInId,
	});

	return reply.status(204).send();
}
