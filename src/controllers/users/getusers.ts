import { FastifyRequest, FastifyReply } from "fastify";
import { users } from "../../models/user";
import { logger } from "../../main";
import { getMe } from "./me";
import { userIdParams } from "../../types/user_types";

export async function getAllUsers(_req: FastifyRequest, res: FastifyReply) {
  return users
    .getAllUsers()
    .then((r) => res.status(200).send(r))
    .catch((e) => console.log(e));
}

export async function getUsers(
  req: FastifyRequest<{ Params: userIdParams }>,
  res: FastifyReply
) {
  // /users/me へのアクセスはmeのハンドラに処理を投げる
  if (req.params.id === "me") {
    await getMe(req, res);
    return;
  }

  const user_id = req.params.id;

  await users
    .get(user_id)
    .then((ur) => {
      res.status(200).send(ur);
    })
    .catch((e) => {
      logger.error(e);
      res.status(404).send("User Not Found");
    });
}
