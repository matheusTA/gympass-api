import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from './env';
import { checkInsRoutes } from './http/controllers/check-in/routes';
import { gymsRoutes } from './http/controllers/gym/routes';
import { usersRoutes } from './http/controllers/user/routes';

export const app = fastify();

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	cookie: { cookieName: 'refreshToken', signed: false },
	sign: { expiresIn: '1h' },
});

app.register(fastifyCookie);

app.register(usersRoutes);
app.register(gymsRoutes);
app.register(checkInsRoutes);

app.setErrorHandler((error, _, reply) => {
	if (error instanceof ZodError) {
		return reply
			.status(400)
			.send({ message: 'Validation error.', issues: error.format() });
	}

	if (env.NODE_ENV !== 'production') {
		console.error(error);
	} else {
		// TODO: Send error to monitoring service like Sentry/Datadog/NewRelic
	}

	return reply.status(500).send({ message: 'Internal server error.' });
});
