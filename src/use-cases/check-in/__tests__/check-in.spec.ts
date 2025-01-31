import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { CheckInUseCase } from '@/use-cases/check-in/check-in';
import { MaxDistanceError } from '@/use-cases/check-in/errors/max-distance-error';
import { MaxNumberOfCheckInsError } from '@/use-cases/check-in/errors/max-number-of-check-ins-error';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let checkInUseCase: CheckInUseCase;

describe('check in use case', () => {
	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInsRepository();
		gymsRepository = new InMemoryGymsRepository();
		checkInUseCase = new CheckInUseCase(checkInsRepository, gymsRepository);

		await gymsRepository.create({
			id: 'gym-01',
			title: 'Gym 01',
			latitude: -8.0412672,
			longitude: -34.9077504,
		});

		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('should be able to check in', async () => {
		const { checkIn } = await checkInUseCase.execute({
			userId: 'user-01',
			gymId: 'gym-01',
			userLatitude: -8.0412672,
			userLongitude: -34.9077504,
		});

		expect(checkIn.id).toEqual(expect.any(String));
	});

	it('should not be able to check in twice in the same day', async () => {
		vi.setSystemTime(new Date(2022, 0, 20, 0, 0, 0));

		await checkInUseCase.execute({
			userId: 'user-01',
			gymId: 'gym-01',
			userLatitude: -8.0412672,
			userLongitude: -34.9077504,
		});

		await expect(() =>
			checkInUseCase.execute({
				userId: 'user-01',
				gymId: 'gym-01',
				userLatitude: -8.0412672,
				userLongitude: -34.9077504,
			}),
		).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
	});

	it('should be able to check in twice in different days', async () => {
		vi.setSystemTime(new Date(2022, 0, 20, 0, 0, 0));

		await checkInUseCase.execute({
			userId: 'user-01',
			gymId: 'gym-01',
			userLatitude: -8.0412672,
			userLongitude: -34.9077504,
		});

		vi.setSystemTime(new Date(2022, 0, 21, 0, 0, 0));

		const { checkIn } = await checkInUseCase.execute({
			userId: 'user-01',
			gymId: 'gym-01',
			userLatitude: -8.0412672,
			userLongitude: -34.9077504,
		});

		expect(checkIn.id).toEqual(expect.any(String));
	});

	it('should not be able to check in on distant gym', async () => {
		await expect(() =>
			checkInUseCase.execute({
				userId: 'user-01',
				gymId: 'gym-01',
				userLatitude: -7.8477608,
				userLongitude: -34.8428543,
			}),
		).rejects.toBeInstanceOf(MaxDistanceError);
	});
});
