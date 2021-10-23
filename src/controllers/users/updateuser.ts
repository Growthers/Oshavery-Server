import { FastifyReply, FastifyRequest } from "fastify";
import { users } from "../../models/user.js";
import { logger } from "../../main.js";
import { updateMeAccountInfo, userIdParams } from "../../types/user_types";
import { AuthHeaders } from "../../types/auth_types";
import { checklogin } from "../auth/checklogin";
import { InvalidTokenError } from "../auth/verifytoken";
import jwt_decode from "jwt-decode";

// eslint-disable-next-line
// export async function updateUser(req: any, res: FastifyReply) {
//   if (req.params.userId === "me") {
//     await updateMe(req, res);
//   } else {
//     res.status(403).send("Forbidden");
//   }
//   //  強制アップデート用
// }

export async function updateMe(
  req: FastifyRequest<{
    Body: updateMeAccountInfo;
    Headers: AuthHeaders;
    Params: userIdParams;
  }>,
  res: FastifyReply
) {
  if (!req.headers.authorization) return;
  const check = await checklogin(req.headers.authorization);
  if (check instanceof InvalidTokenError) {
    res.status(401).send("Invalid request");
    return;
  }

  const user = jwt_decode(req.headers.authorization);

  // eslint-disable-next-line
  // @ts-ignore
  const usr = await users.getFromSub(user.uid);

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
