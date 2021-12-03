import { FastifyReply, FastifyRequest } from "fastify";
import { updateMeAccountInfo } from "../../types/user_types";
import { updateAccessedUserData } from "../../service/user/update";

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
  // このupdateはインスタンスのユーザー情報の変更(ギルドごとの設定は未実装
  const updated = await updateAccessedUserData(req.body.name);
  if (updated === null) {
    res.status(400).send("Invalid request");
    return;
  } else {
    res.status(204).send("done");
  }
}
