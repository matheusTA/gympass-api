import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeValidateCheckInsUseCase } from "@/use-cases/factories/make-validate-check-ins-use-case";

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
