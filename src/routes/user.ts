import { FastifyInstance } from "fastify";
import { getAllUsers, getUsers } from "../controllers/users/getusers";
import { CreateUserAccount } from "../controllers/users/register";
import { updateUser } from "../controllers/users/updateuser";
import { Register } from "../types/user_types";

export async function UserRouter(server: FastifyInstance) {
  server
    .get("/users", getAllUsers)
    .post<{ Body: Register }>("/users", CreateUserAccount);

  server.get("/users/:userId", getUsers);

  server.patch("/users/:userId", updateUser);
}
