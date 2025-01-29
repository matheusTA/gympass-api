import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { GetNearbyGymsUseCase } from './get-nearby-gyms';

let GymsRepository: InMemoryGymsRepository;
let getNearbyGymsUseCase: GetNearbyGymsUseCase;

describe('get nearby gyms use case', () => {
	beforeEach(async () => {
		GymsRepository = new InMemoryGymsRepository();
		getNearbyGymsUseCase = new GetNearbyGymsUseCase(GymsRepository);
	});

	it('should be able to get nearby gyms', async () => {
		await GymsRepository.create({
			title: 'Gym 1',
			latitude: -8.0412672,
			longitude: -34.9077504,
		});

		await GymsRepository.create({
			title: 'Gym 2',
			latitude: -7.8477608,
			longitude: -34.8428543,
		});

		const { gyms } = await getNearbyGymsUseCase.execute({
			userLatitude: -8.0412672,
			userLongitude: -34.9077504,
		});

		expect(gyms).toHaveLength(1);
		expect(gyms).toEqual([expect.objectContaining({ title: 'Gym 1' })]);
	});
});
