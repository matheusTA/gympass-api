import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ValidateCheckInUseCase } from "./validate-check-in";
import { ResourceNotFoundError } from "./errors/resource-not-found";

let checkInsRepository: InMemoryCheckInsRepository;
let validateCheckInUseCase: ValidateCheckInUseCase;

describe("validate check in use case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    validateCheckInUseCase = new ValidateCheckInUseCase(checkInsRepository);

    // vi.useFakeTimers();
  });

  // afterEach(() => {
  //   vi.useRealTimers();
  // });

  it("should be to validate able to check-in", async () => {
    const createdCheckIn = await checkInsRepository.create({
      userId: "user-01",
      gymId: "gym-01",
    });

    const { checkIn } = await validateCheckInUseCase.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validatedAt).toEqual(expect.any(Date));
  });

  it("should not be to validate an inexistent check-in", async () => {
    await expect(() =>
      validateCheckInUseCase.execute({ checkInId: "invalid-id" }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
