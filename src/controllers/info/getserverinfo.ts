import { FastifyRequest, FastifyReply } from "fastify";
import { info } from "../../models/info.js";

export async function getServerInfo(_req: FastifyRequest, res: FastifyReply) {
  // サーバー情報を返す
  const inf = await info.get();
  res.send(inf);
  return inf;
}
