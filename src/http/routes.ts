import { FastifyInstance } from 'fastify'
import { registerController } from './controllers/register'

export async function appRouter(app: FastifyInstance) {
  app.post('/users', registerController)
}
