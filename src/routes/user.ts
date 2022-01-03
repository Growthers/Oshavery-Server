import { FastifyInstance } from "fastify";
import { getUsers } from "../controllers/users/getusers";
// import { register } from "../controllers/users/register";
import { updateUser } from "../controllers/users/updateuser";
import { userIdParams } from "../types/user_types";

export async function UserRouter(server: FastifyInstance) {
  // server.get("/users", getAllUsers).post("/users", register);
  server.get<{ Params: userIdParams }>("/users/:userId", getUsers);

  server.patch("/users/:userId", updateUser);
}
