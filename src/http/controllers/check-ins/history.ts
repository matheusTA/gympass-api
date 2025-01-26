import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-get-user-check-ins-history-use-case";

export async function checkInsHistoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const checkInsHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInsHistoryQuerySchema.parse(request.query);

  const getUserCheckInsHistoryUseCase = makeGetUserCheckInsHistoryUseCase();

  const { checkIns } = await getUserCheckInsHistoryUseCase.execute({
    page,
    userId: request.user.sub,
  });

  return reply.status(200).send({ checkIns });
}
