import { prisma } from '@/config/prisma';
import type { Gym, Prisma } from '@prisma/client';
import type { GymsRepository } from '../gyms-repository';

export class PrismaGymsRepository implements GymsRepository {
	async findById(id: string) {
		const gym = await prisma.gym.findUnique({
			where: { id },
		});

		return gym;
	}

	async findManyNearby(latitude: number, longitude: number) {
		const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

		return gyms;
	}

	async searchManyByQuery(query: string, page: number) {
		const gyms = await prisma.gym.findMany({
			where: {
				OR: [
					{
						title: {
							contains: query,
							mode: 'insensitive',
						},
					},
					{
						description: {
							contains: query,
							mode: 'insensitive',
						},
					},
				],
			},
			take: 20,
			skip: (page - 1) * 20,
		});

		return gyms;
	}

	async create(data: Prisma.GymCreateInput) {
		const gym = await prisma.gym.create({
			data,
		});

		return gym;
	}
}
