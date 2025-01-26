import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetNearbyGymsUseCase } from "@/use-cases/factories/make-get-nearby-gyms-use-case";

export async function getNearbyGymsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getNearbyGymsQuerySchema = z.object({
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  });

  const { latitude, longitude } = getNearbyGymsQuerySchema.parse(request.query);

  const getNearbyGymsUseCase = makeGetNearbyGymsUseCase();

  const { gyms } = await getNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(200).send({ gyms });
}
