import type { CheckInsRepository } from '@/repositories/check-ins-repository';
import type { GymsRepository } from '@/repositories/gyms-repository';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';
import type { CheckIn } from '@prisma/client';
import { MaxDistanceError } from './errors/max-distance-error';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error';
import { ResourceNotFoundError } from './errors/resource-not-found';

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
