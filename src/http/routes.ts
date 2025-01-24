import { FastifyInstance } from "fastify";
import { registerController } from "./controllers/register";
import { authenticateController } from "./controllers/authenticate";
import { profileController } from "./controllers/profile";
import { verifyJWT } from "./middlewares/verify-jwt";

export async function appRouter(app: FastifyInstance) {
  app.post("/users", registerController);
  app.post("/sessions", authenticateController);
  app.get("/me", { onRequest: [verifyJWT] }, profileController);
}
