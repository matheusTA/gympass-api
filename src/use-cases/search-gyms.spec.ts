import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { SearchGymsUseCase } from './search-gyms';

let GymsRepository: InMemoryGymsRepository;
let searchGymsUseCase: SearchGymsUseCase;

describe('search gyms use case', () => {
	beforeEach(async () => {
		GymsRepository = new InMemoryGymsRepository();
		searchGymsUseCase = new SearchGymsUseCase(GymsRepository);
	});

	it('should be able to search for gyms', async () => {
		await GymsRepository.create({
			title: 'Gym 1',
			latitude: 0,
			longitude: 0,
		});

		await GymsRepository.create({
			title: 'Gym 2',
			latitude: 0,
			longitude: 0,
		});

		const { gyms } = await searchGymsUseCase.execute({
			query: 'Gym',
			page: 1,
		});

		expect(gyms).toHaveLength(2);
		expect(gyms).toEqual([
			expect.objectContaining({ title: 'Gym 1' }),
			expect.objectContaining({ title: 'Gym 2' }),
		]);
	});

	it('should be able to get paginated gyms', async () => {
		for (let i = 1; i <= 22; i++) {
			await GymsRepository.create({
				title: `Gym ${i}`,
				latitude: 0,
				longitude: 0,
			});
		}

		const { gyms } = await searchGymsUseCase.execute({
			query: 'Gym',
			page: 2,
		});

		expect(gyms).toHaveLength(2);
		expect(gyms).toEqual([
			expect.objectContaining({ title: 'Gym 21' }),
			expect.objectContaining({ title: 'Gym 22' }),
		]);
	});
});
