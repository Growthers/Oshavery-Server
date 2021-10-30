import { FastifyReply } from "fastify";

// eslint-disable-next-line
export async function register(_req: any, _res: FastifyReply) {
  // ToDo: 認証の独自実装
  // const data: register = {
  //   name: response.name,
  //   sub: response.sub,
  //   avatar: response.picture,
  // };
  //
  // await users
  //   .createUserAccount(data)
  //   .then((r) => {
  //     // 即時実行関数を使って処理を回す
  //     (async (userId: string, name: string) => {
  //       const guildarr = await guild.allget();
  //       for (let i = 0; i < guildarr.length; i++) {
  //         await guild.addUsertoGuild(userId, guildarr[i].id, name);
  //       }
  //     })(r.id, r.name);
  //
  //     res.status(201).send(r);
  //   })
  //   .catch((e) => {
  //     logger.error(e);
  //     return res.status(400).send("Invalid request");
  //   });
}
