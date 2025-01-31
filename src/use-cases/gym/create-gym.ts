import type { GymsRepository } from '@/repositories/gyms-repository';
import type { Gym } from '@prisma/client';

interface CreateGymUseCaseInput {
	title: string;
	description: string | null;
	phone: string | null;
	latitude: number;
	longitude: number;
}

interface CreateGymUseCaseOutput {
	gym: Gym;
}

export class CreateGymUseCase {
	constructor(private gymsRepository: GymsRepository) {}

	async execute({
		title,
		description,
		phone,
		latitude,
		longitude,
	}: CreateGymUseCaseInput): Promise<CreateGymUseCaseOutput> {
		const gym = await this.gymsRepository.create({
			title,
			description,
			phone,
			latitude,
			longitude,
		});

		return { gym };
	}
}
