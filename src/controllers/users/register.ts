import axios from "axios";
import {FastifyReply} from "fastify";
import { users, register } from "../../models/user";
import { logger } from "../../main";
import { guild } from "../../models/guild";

export async function register(req: any, res: FastifyReply) {
  // Auth0にユーザー情報を問い合わせる(廃止予定)
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

  await users.createUserAccount(data)
    .then((r) => {
      // 即時実行関数を使って処理を回す
      (async (userId: string, name: string) => {
        const guildarr = await guild.allget();
        for (let i = 0; i < guildarr.length; i++) {
          guild.addUsertoGuild(userId,guildarr[i].id,name);
        }
      })(r.id,r.name);

      res.status(201).send(r);
      return;
    })
    .catch((e) => { logger.error(e); return res.status(400).send("Invalid request"); });
  return;
}
