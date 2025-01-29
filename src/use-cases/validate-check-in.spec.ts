import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LateCheckInValidationError } from './errors/late-check-in-validation-error';
import { ResourceNotFoundError } from './errors/resource-not-found';
import { ValidateCheckInUseCase } from './validate-check-in';

let checkInsRepository: InMemoryCheckInsRepository;
let validateCheckInUseCase: ValidateCheckInUseCase;

describe('validate check in use case', () => {
	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInsRepository();
		validateCheckInUseCase = new ValidateCheckInUseCase(checkInsRepository);

		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('should be to validate able to check-in', async () => {
		const createdCheckIn = await checkInsRepository.create({
			userId: 'user-01',
			gymId: 'gym-01',
		});

		const { checkIn } = await validateCheckInUseCase.execute({
			checkInId: createdCheckIn.id,
		});

		expect(checkIn.validatedAt).toEqual(expect.any(Date));
	});

	it('should not be to validate an inexistent check-in', async () => {
		await expect(() =>
			validateCheckInUseCase.execute({ checkInId: 'invalid-id' }),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to validate the check-in 20 minutes of its creation', async () => {
		vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

		const createdCheckIn = await checkInsRepository.create({
			userId: 'user-01',
			gymId: 'gym-01',
		});

		const twentyOneMinutesInMilliseconds = 21 * 60 * 1000;
		vi.advanceTimersByTime(twentyOneMinutesInMilliseconds);

		await expect(() =>
			validateCheckInUseCase.execute({ checkInId: createdCheckIn.id }),
		).rejects.toBeInstanceOf(LateCheckInValidationError);
	});
});
