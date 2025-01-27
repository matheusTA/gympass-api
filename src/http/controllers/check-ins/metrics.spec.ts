import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/config/prisma";

describe("check-in metrics controller", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get count of check-ins", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: {
        title: "Gym 01",
        latitude: -8.0412672,
        longitude: -34.9077504,
      },
    });

    await prisma.checkIn.createMany({
      data: [
        {
          userId: user.id,
          gymId: gym.id,
          createdAt: new Date("2021-01-01T00:00:00Z"),
        },
        {
          userId: user.id,
          gymId: gym.id,
          createdAt: new Date("2021-01-02T00:00:00Z"),
        },
      ],
    });

    const response = await request(app.server)
      .get("/check-ins/metrics")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.checkInsCount).toEqual(2);
  });
});
