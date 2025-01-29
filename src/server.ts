import { app } from '@/app';
import { env } from '@/env';

app
	.listen({
		port: env.PORT,
	})
	.then(() => {
		console.info(`🚀 Server listening on http://localhost:${env.PORT}`);
	});
