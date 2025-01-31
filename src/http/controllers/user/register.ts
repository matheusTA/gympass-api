import { UsersAlreadyExistsError } from '@/use-cases/user/errors/users-already-exists-error';
import { makeRegisterUseCase } from '@/use-cases/user/factories/make-register-use-case';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function registerController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const registerBodyUser = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6),
	});

	const { name, email, password } = registerBodyUser.parse(request.body);

	try {
		const registerUseCase = makeRegisterUseCase();

		await registerUseCase.execute({ name, email, password });

		return reply.status(201).send();
	} catch (error) {
		if (error instanceof UsersAlreadyExistsError) {
			return reply.status(409).send({ message: error.message });
		}

		throw error;
	}
}
