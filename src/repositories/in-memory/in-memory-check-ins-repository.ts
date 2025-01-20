import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public checkIns: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      createdAt: new Date(),
      id: randomUUID(),
      userId: data.userId,
      gymId: data.gymId,
      validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
    }

    this.checkIns.push(checkIn);

    return checkIn;
  }
}
