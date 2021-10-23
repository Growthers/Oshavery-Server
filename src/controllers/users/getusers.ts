import { FastifyRequest, FastifyReply } from "fastify";
import { users } from "../../models/user.js";
import { logger } from "../../main.js";
import { getMe } from "./me.js";
import { checklogin } from "../auth/checklogin";
import { InvalidTokenError } from "../auth/verifytoken";

export async function getAllUsers(_req: FastifyRequest, res: FastifyReply) {
  return users
    .getAllUsers()
    .then((r) => res.status(200).send(r))
    .catch((e) => console.log(e));
}

// eslint-disable-next-line
export async function getUsers(req: any, res: FastifyReply) {
  if (!req.headers.authorization) return;
  const check = await checklogin(req.headers.authorization);
  if (check instanceof InvalidTokenError) {
    res.status(401).send("Invalid request");
    return;
  }
  // /users/me へのアクセスはmeのハンドラに処理を投げる
  if (req.params.userId === "me") {
    await getMe(req, res);
    return;
  }

  const user_id = req.params.userId;

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
