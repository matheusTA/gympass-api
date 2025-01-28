import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { Role } from "@prisma/client";

describe("nearby gyms controller", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser(app, Role.ADMIN);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Gym 1",
        description: "Gym 1 description",
        phone: "123456789",
        latitude: -7.8477608,
        longitude: -34.8428543,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Gym 2",
        description: "Gym 2 description",
        phone: "987654321",
        latitude: -8.0412672,
        longitude: -34.9077504,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({ latitude: -7.8477608, longitude: -34.8428543 })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Gym 1",
      }),
    ]);
  });
});
