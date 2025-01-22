import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { GetUserCheckInsHistoryUseCase } from "./get-user-check-ins-history";

let checkInsRepository: InMemoryCheckInsRepository;
let getUserCheckInsHistoryUseCase: GetUserCheckInsHistoryUseCase;

describe("get user check ins history use case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    getUserCheckInsHistoryUseCase = new GetUserCheckInsHistoryUseCase(
      checkInsRepository,
    );
  });

  it("should be able to get check-in history", async () => {
    await checkInsRepository.create({
      userId: "user-01",
      gymId: "gym-01",
    });

    await checkInsRepository.create({
      userId: "user-01",
      gymId: "gym-02",
    });

    const { checkIns } = await getUserCheckInsHistoryUseCase.execute({
      userId: "user-01",
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: "gym-01" }),
      expect.objectContaining({ gymId: "gym-02" }),
    ]);
  });

  it("should be able to get paginated check-in history", async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        userId: "user-01",
        gymId: `gym-${i}`,
      });
    }

    const { checkIns } = await getUserCheckInsHistoryUseCase.execute({
      userId: "user-01",
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: "gym-21" }),
      expect.objectContaining({ gymId: "gym-22" }),
    ]);
  });
});
