import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { GetUserMetricsUseCase } from './get-user-metrics';

let checkInsRepository: InMemoryCheckInsRepository;
let getUserMetricsUseCase: GetUserMetricsUseCase;

describe('get user metrics use case', () => {
	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInsRepository();
		getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsRepository);
	});

	it('should be able to get check-ins count from metrics', async () => {
		await checkInsRepository.create({
			userId: 'user-01',
			gymId: 'gym-01',
		});

		await checkInsRepository.create({
			userId: 'user-01',
			gymId: 'gym-02',
		});

		const { checkInsCount } = await getUserMetricsUseCase.execute({
			userId: 'user-01',
		});

		expect(checkInsCount).toBe(2);
	});
});
