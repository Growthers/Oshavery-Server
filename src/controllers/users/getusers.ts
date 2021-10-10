import {FastifyRequest,FastifyReply} from 'fastify';
import { users } from "../../models/user";
import {logger} from "../../main";
import {getMe} from "./me";


export async function getAllUsers(_req: FastifyRequest, res: FastifyReply) {
  return await users.getAllUsers().then((r) => { return res.status(200).send(r) }).catch((e) => { return console.log(e); })
}

export async function getUsers(req: any, res: FastifyReply) {
  // /users/me へのアクセスはmeのハンドラに処理を投げる
  if (req.params.userId === "me") { await getMe(req, res); return; }

  const user_id = req.params.userId;

  await users.get(user_id)
    .then((ur) => {
      res.status(200).send(ur);
      return;
    })
    .catch((e) => {
      logger.error(e);
      res.status(404).send("User Not Found");
      return;
    });
  return;
}
