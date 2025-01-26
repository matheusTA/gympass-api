import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createGymController } from "./create-gym";
import { searchGymsController } from "./search-gyms";
import { getNearbyGymsController } from "./get-nearby-gyms";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/gyms/search", searchGymsController);
  app.get("/gyms/nearby", getNearbyGymsController);
  app.post("/gyms", createGymController);
}
