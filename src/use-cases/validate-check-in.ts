import type { CheckInsRepository } from '@/repositories/check-ins-repository';
import type { CheckIn } from '@prisma/client';
import dayjs from 'dayjs';
import { LateCheckInValidationError } from './errors/late-check-in-validation-error';
import { ResourceNotFoundError } from './errors/resource-not-found';

interface ValidateCheckInUseCaseInput {
	checkInId: string;
}

interface ValidateCheckInUseCaseOutput {
	checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
	constructor(private checkInsRepository: CheckInsRepository) {}

	async execute({
		checkInId,
	}: ValidateCheckInUseCaseInput): Promise<ValidateCheckInUseCaseOutput> {
		const checkIn = await this.checkInsRepository.findById(checkInId);

		if (!checkIn) {
			throw new ResourceNotFoundError();
		}

		const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
			checkIn.createdAt,
			'minutes',
		);

		if (distanceInMinutesFromCheckInCreation > 20) {
			throw new LateCheckInValidationError();
		}

		checkIn.validatedAt = new Date();

		await this.checkInsRepository.save(checkIn);

		return {
			checkIn,
		};
	}
}
