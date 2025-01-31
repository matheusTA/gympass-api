import type { CheckInsRepository } from '@/repositories/check-ins-repository';
import type { GymsRepository } from '@/repositories/gyms-repository';
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found';
import { getDistanceBetweenCoordinates } from '@/shared/functions/get-distance-between-coordinates';
import { MaxDistanceError } from '@/use-cases/check-in/errors/max-distance-error';
import type { CheckIn } from '@prisma/client';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error';

interface CheckInUseCaseInput {
	gymId: string;
	userId: string;
	userLatitude: number;
	userLongitude: number;
}

interface CheckInUseCaseOutput {
	checkIn: CheckIn;
}

export class CheckInUseCase {
	constructor(
		private checkInsRepository: CheckInsRepository,
		private gymsRepository: GymsRepository,
	) {}

	async execute({
		gymId,
		userId,
		userLatitude,
		userLongitude,
	}: CheckInUseCaseInput): Promise<CheckInUseCaseOutput> {
		const gym = await this.gymsRepository.findById(gymId);

		if (!gym) {
			throw new ResourceNotFoundError();
		}

		const distance = getDistanceBetweenCoordinates(
			{ latitude: userLatitude, longitude: userLongitude },
			{
				latitude: gym.latitude.toNumber(),
				longitude: gym.longitude.toNumber(),
			},
		);

		const MAX_DISTANCE_IN_KM = 0.1;
		if (distance > MAX_DISTANCE_IN_KM) {
			throw new MaxDistanceError();
		}

		const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
			userId,
			new Date(),
		);

		if (checkInOnSameDay) {
			throw new MaxNumberOfCheckInsError();
		}

		const checkIn = await this.checkInsRepository.create({ userId, gymId });

		return {
			checkIn,
		};
	}
}
