import type { GymsRepository } from '@/repositories/gyms-repository';
import type { Gym } from '@prisma/client';

interface SearchGymsUseCaseInput {
	query: string;
	page: number;
}

interface SearchGymsUseCaseOutput {
	gyms: Gym[];
}

export class SearchGymsUseCase {
	constructor(private gymsRepository: GymsRepository) {}

	async execute({
		query,
		page,
	}: SearchGymsUseCaseInput): Promise<SearchGymsUseCaseOutput> {
		const gyms = await this.gymsRepository.searchManyByQuery(query, page);

		return { gyms };
	}
}
