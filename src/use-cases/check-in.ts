import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface CheckInUseCaseInput {
  userId: string;
  gymId: string;
}

interface CheckInUseCaseOutput {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ userId, gymId }: CheckInUseCaseInput): Promise<CheckInUseCaseOutput> {
    const checkIn = await this.checkInsRepository.create({ userId, gymId });

    return {
      checkIn
    };
  }
}
