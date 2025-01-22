import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface GetUserCheckInsHistoryUseCaseInput {
  userId: string;
  page: number;
}

interface GetUserCheckInsHistoryUseCaseOutput {
  checkIns: CheckIn[];
}

export class GetUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: GetUserCheckInsHistoryUseCaseInput): Promise<GetUserCheckInsHistoryUseCaseOutput> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    );

    return { checkIns };
  }
}
