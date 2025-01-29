import type { Gym, Prisma } from '@prisma/client';

export interface GymsRepository {
	findById(id: string): Promise<Gym | null>;
	findManyNearby(latitude: number, longitude: number): Promise<Gym[]>;
	searchManyByQuery(query: string, page: number): Promise<Gym[]>;
	create(data: Prisma.GymCreateInput): Promise<Gym>;
}
