import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";

let gymsRepository: InMemoryGymsRepository;
let createGymUseCase: CreateGymUseCase;

describe("create gym use case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    createGymUseCase = new CreateGymUseCase(gymsRepository);
  });

  it("should be able to create gym", async () => {
    const { gym } = await createGymUseCase.execute({
      title: "Academia",
      description: "Academia de musculação",
      phone: "123456789",
      latitude: 123.123,
      longitude: 123.123,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
