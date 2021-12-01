import { FastifyReply, FastifyRequest } from "fastify";
import { version } from "../../service/info/getversion";

export async function getVersion(_req: FastifyRequest, res: FastifyReply) {
  const resp = version();
  return res.status(200).send(resp);
}
