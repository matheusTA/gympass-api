import { randomUUID } from 'node:crypto';
import type { CheckInsRepository } from '@/repositories/check-ins-repository';
import type { CheckIn, Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

export class InMemoryCheckInsRepository implements CheckInsRepository {
	private checkIns: CheckIn[] = [];

	async findById(id: string) {
		return this.checkIns.find((checkIn) => checkIn.id === id) || null;
	}

	async findByUserIdOnDate(userId: string, date: Date) {
		const startOfTheDay = dayjs(date).startOf('date');
		const endOfTheDay = dayjs(date).endOf('date');

		const checkInOnSameDate = this.checkIns.find((checkIn) => {
			const checkInDate = dayjs(checkIn.createdAt);

			const isOnSameDate = checkInDate.isBetween(
				startOfTheDay,
				endOfTheDay,
				null,
				'[]',
			);

			return checkIn.userId === userId && isOnSameDate;
		});

		if (!checkInOnSameDate) {
			return null;
		}

		return checkInOnSameDate;
	}

	async findManyByUserId(userId: string, page: number) {
		return this.checkIns
			.filter((checkIn) => checkIn.userId === userId)
			.slice((page - 1) * 20, page * 20);
	}

	async countByUserId(userId: string) {
		return this.checkIns.filter((checkIn) => checkIn.userId === userId).length;
	}

	async create(data: Prisma.CheckInUncheckedCreateInput) {
		const checkIn: CheckIn = {
			createdAt: new Date(),
			id: randomUUID(),
			userId: data.userId,
			gymId: data.gymId,
			validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
		};

		this.checkIns.push(checkIn);

		return checkIn;
	}

	async save(checkIn: CheckIn) {
		const checkInIndex = this.checkIns.findIndex(
			(item) => item.id === checkIn.id,
		);

		if (checkInIndex >= 0) {
			this.checkIns[checkInIndex] = checkIn;
		}

		return checkIn;
	}
}
