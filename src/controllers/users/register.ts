import axios from "axios";
import express from "express";
import { users, register } from "../../models/user";
import { conf , logger} from "../../main";
import { guild } from "../../models/guild";
conf;

export async function register(req: express.Request, res: express.Response) {
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
      logger.error(err);
    });

  logger.info("User Created")

  const data: register = {
    name: response.name,
    sub: response.sub,
    avatar: response.picture
  }

  //締め切り直前で動けばいい，動けばいいという処理をしています．
  //ここは再実装必須です．汚いコードには目をつぶってください
  await users.createUserAccount(data)
    .then((r) => {
      async function f(userId: string, name: string) {const guildarr = await guild.allget();for (let i = 0; i < guildarr.length; i++) {guild.addUsertoGuild(userId,guildarr[i].id,name);}}
      f(r.id,r.name);
      res.status(201).json(r);
      return;
    })
    .catch((e) => { logger.error(e); return res.status(400).send("Invalid request"); });
  return;
}
