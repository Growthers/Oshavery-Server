import { FastifyInstance } from "fastify";
import { loginHandler } from "../controllers/auth/login";
import { loginBody } from "../types/auth_types";
import { logoutHandler } from "../controllers/auth/logout";

export async function AuthRouter(server: FastifyInstance) {
  server.post<{ Body: loginBody }>("/login", loginHandler);
  server.post("/logout", logoutHandler);
}
