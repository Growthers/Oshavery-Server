import axios from "axios";
import {FastifyReply} from "fastify";
import { users } from "../../models/user";
import { logger } from "../../main";

export async function updateUser(req: any, res: FastifyReply){
  if (req.params.userId === "me") {
    await updateMe(req, res);
    return;
  }
  else{
    res.status(403).send("Forbidden");
    return;
  }
  //  強制アップデート用
}

export async function updateMe(req: any, res: FastifyReply){
  // Auth0からユーザー情報を取得(廃止予定
  const accessToken = req.headers.authorization;
  const response = await axios("https://" + process.env.AUTH0_DOMAIN + "/userinfo" || "", {
    method: "GET",
    headers: {
      Authorization: accessToken,
    }
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });


  const usr = await users.getFromSub(response.sub)
  if (!usr){res.status(400).send("Invalid request"); return}
  // このupdateはインスタンスのユーザー情報の変更(ギルドごとの設定は未実装
  await users.updateUser(usr.id, req.body.name).then(() => {return}).catch((e) => {logger.error(e); res.status(400)})
  res.status(204).send("done");
  return;

}
