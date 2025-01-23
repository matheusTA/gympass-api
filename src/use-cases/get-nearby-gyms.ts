import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface GetNearbyGymsUseCaseInput {
  userLatitude: number;
  userLongitude: number;
}

interface GetNearbyGymsUseCaseOutput {
  gyms: Gym[];
}

export class GetNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: GetNearbyGymsUseCaseInput): Promise<GetNearbyGymsUseCaseOutput> {
    const gyms = await this.gymsRepository.findManyNearby(
      userLatitude,
      userLongitude,
    );

    return { gyms };
  }
}
