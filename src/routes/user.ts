import { FastifyInstance } from "fastify";
import { getAllUsers, getUsers } from "../controllers/users/getusers.js";
import { CreateUserAccount } from "../controllers/users/register.js";
import { updateMe } from "../controllers/users/updateuser.js";
import {
  Register,
  updateMeAccountInfo,
  userIdParams,
} from "../types/user_types.js";
import { AuthHeaders } from "../types/auth_types";

export async function UserRouter(server: FastifyInstance) {
  server
    .get<{ Headers: AuthHeaders }>("/users", getAllUsers)
    .post<{ Body: Register; Headers: AuthHeaders }>(
      "/users",
      CreateUserAccount
    );

  server.get<{ Headers: AuthHeaders }>("/users/:userId", getUsers);

  server.patch<{
    Params: userIdParams;
    Headers: AuthHeaders;
    Body: updateMeAccountInfo;
  }>("/users/me", updateMe);
}
