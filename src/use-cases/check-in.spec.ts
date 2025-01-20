import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './check-in';

let checkInRepository: InMemoryCheckInsRepository;
let checkInUseCase: CheckInUseCase;

describe('check in use case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    checkInUseCase = new CheckInUseCase(checkInRepository);
  })

  it('should be able to check in', async () => {
    const { checkIn } = await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01'
    })

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
