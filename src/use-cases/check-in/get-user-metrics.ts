import type { CheckInsRepository } from '@/repositories/check-ins-repository';

interface GetUserMetricsUseCaseInput {
	userId: string;
}

interface GetUserMetricsUseCaseOutput {
	checkInsCount: number;
}

export class GetUserMetricsUseCase {
	constructor(private checkInsRepository: CheckInsRepository) {}

	async execute({
		userId,
	}: GetUserMetricsUseCaseInput): Promise<GetUserMetricsUseCaseOutput> {
		const checkInsCount = await this.checkInsRepository.countByUserId(userId);

		return { checkInsCount };
	}
}
