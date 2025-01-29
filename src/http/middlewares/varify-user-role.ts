import type { Role } from '@prisma/client';
import type { FastifyReply, FastifyRequest } from 'fastify';

export function verifyUserRole(roleToVerify: Role) {
	return async (request: FastifyRequest, reply: FastifyReply) => {
		const role = request.user.role;

		if (role !== roleToVerify) {
			reply.status(401).send({ message: 'Unauthorized' });
		}
	};
}
