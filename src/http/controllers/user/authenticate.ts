import { InvalidCredentialsError } from '@/use-cases/user/errors/invalid-credentials-error';
import { makeAuthenticateUseCase } from '@/use-cases/user/factories/make-athenticate-use-case';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function authenticateController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const authenticateBodyUser = z.object({
		email: z.string().email(),
		password: z.string().min(6),
	});

	const { email, password } = authenticateBodyUser.parse(request.body);

	try {
		const authenticateUseCase = makeAuthenticateUseCase();

		const { user } = await authenticateUseCase.execute({ email, password });

		const token = await reply.jwtSign(
			{ role: user.role },
			{ sign: { sub: user.id } },
		);
		const refreshToken = await reply.jwtSign(
			{ role: user.role },
			{ sign: { sub: user.id, expiresIn: '7d' } },
		);

		return reply
			.setCookie('refreshToken', refreshToken, {
				path: '/',
				secure: true,
				sameSite: true,
				httpOnly: true,
			})
			.status(200)
			.send({ token });
	} catch (error) {
		if (error instanceof InvalidCredentialsError) {
			return reply.status(400).send({ message: error.message });
		}

		throw error;
	}
}
