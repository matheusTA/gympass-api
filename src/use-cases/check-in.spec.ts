import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './check-in';

let checkInRepository: InMemoryCheckInsRepository;
let checkInUseCase: CheckInUseCase;

describe('check in use case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    checkInUseCase = new CheckInUseCase(checkInRepository);

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01'
    })

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 0, 0, 0))

    await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01'
    })

    await expect(() => checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01'
    })).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 0, 0, 0))

    await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01'
    })

    vi.setSystemTime(new Date(2022, 0, 21, 0, 0, 0))

    const { checkIn } = await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01'
    })

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
