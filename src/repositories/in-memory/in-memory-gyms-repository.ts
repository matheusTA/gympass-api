import { randomUUID } from 'node:crypto';
import type { GymsRepository } from '@/repositories/gyms-repository';
import { getDistanceBetweenCoordinates } from '@/shared/functions/get-distance-between-coordinates';
import type { Gym } from '@prisma/client';
import { Prisma } from '@prisma/client';

export class InMemoryGymsRepository implements GymsRepository {
	private gyms: Gym[] = [];

	async findById(id: string) {
		const gym = this.gyms.find((gym) => gym.id === id);

		if (!gym) {
			return null;
		}

		return gym;
	}

	async findManyNearby(latitude: number, longitude: number) {
		return this.gyms.filter((gym) => {
			const distance = getDistanceBetweenCoordinates(
				{ latitude, longitude },
				{
					latitude: gym.latitude.toNumber(),
					longitude: gym.longitude.toNumber(),
				},
			);

			return distance < 10;
		});
	}

	async searchManyByQuery(query: string, page: number) {
		return this.gyms
			.filter((gym) => gym.title.includes(query))
			.slice((page - 1) * 20, page * 20);
	}

	async create(data: Prisma.GymCreateInput) {
		const gym: Gym = {
			id: data.id ?? randomUUID(),
			title: data.title,
			description: data.description ?? null,
			phone: data.phone ?? null,
			latitude: new Prisma.Decimal(data.latitude.toString()),
			longitude: new Prisma.Decimal(data.longitude.toString()),
		};

		this.gyms.push(gym);

		return gym;
	}
}
