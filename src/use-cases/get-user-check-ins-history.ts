import type { CheckInsRepository } from '@/repositories/check-ins-repository';
import type { CheckIn } from '@prisma/client';

interface GetUserCheckInsHistoryUseCaseInput {
	userId: string;
	page: number;
}

interface GetUserCheckInsHistoryUseCaseOutput {
	checkIns: CheckIn[];
}

export class GetUserCheckInsHistoryUseCase {
	constructor(private checkInsRepository: CheckInsRepository) {}

	async execute({
		userId,
		page,
	}: GetUserCheckInsHistoryUseCaseInput): Promise<GetUserCheckInsHistoryUseCaseOutput> {
		const checkIns = await this.checkInsRepository.findManyByUserId(
			userId,
			page,
		);

		return { checkIns };
	}
}
