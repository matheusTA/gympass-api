import { CheckInUseCase } from "../check-in";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const GymsRepository = new PrismaGymsRepository();

  return new CheckInUseCase(checkInsRepository, GymsRepository);
}
