import axios from "axios";
import express from "express";
import { users } from "../../models/user";
import { conf , logger} from "../../main";
conf;

export async function updateUser(req: express.Request, res: express.Response){
  if (req.path === "/me") { await updateMe(req, res); return; }
  else{
    return res.status(403).send("Forbidden")
  }
  //  強制アップデート用
}

export async function updateMe(req: express.Request, res: express.Response){
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
  if (!usr){return res.status(400).send("Invalid request")}
  // このupdateはインスタンスのユーザー情報の変更(ギルドごとの設定は未実装
  await users.updateUser(usr.id, req.body.name).then(() => {return}).catch((e) => {logger.error(e); res.status(400)})
  return res.status(204).send("");

}
