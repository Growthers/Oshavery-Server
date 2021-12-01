import { FastifyReply, FastifyRequest } from "fastify";
import { users } from "../../repositories/user";
import { logger } from "../../main";
import { updateMeAccountInfo } from "../../types/user_types";

// eslint-disable-next-line
export async function updateUser(req: any, res: FastifyReply) {
  if (req.params.userId === "me") {
    await updateMe(req, res);
  } else {
    res.status(403).send("Forbidden");
  }
  //  強制アップデート用
}

export async function updateMe(
  req: FastifyRequest<{ Body: updateMeAccountInfo }>,
  res: FastifyReply
) {
  const usr = await users.getFromSub("oshavery|1");

  if (!usr) {
    res.status(400).send("Invalid request");
    return;
  }
  // このupdateはインスタンスのユーザー情報の変更(ギルドごとの設定は未実装
  await users.updateUser(usr.id, req.body.name).catch((e) => {
    logger.error(e);
    res.status(400);
  });
  res.status(204).send("done");
}
