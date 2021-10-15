import { FastifyInstance } from "fastify";
import { getAllUsers, getUsers } from "../controllers/users/getusers";
import { register } from "../controllers/users/register";
import { updateUser } from "../controllers/users/updateuser";

export async function UserRouter(server: FastifyInstance) {
  server.get("/users", getAllUsers).post("/users", register);

  server.get("/users/:userId", getUsers);

  server.patch("/users/:userId", updateUser);
}
