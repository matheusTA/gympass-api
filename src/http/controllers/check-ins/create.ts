import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeCheckInUseCase } from "@/use-cases/factories/make-check-in-use-case";

export async function createCheckInController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCheckInBodySchema = z.object({
    gymId: z.string().uuid(),
    latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
  });

  const { gymId, latitude, longitude } = createCheckInBodySchema.parse(
    request.body,
  );

  const checkInUseCase = makeCheckInUseCase();

  await checkInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(201).send();
}
