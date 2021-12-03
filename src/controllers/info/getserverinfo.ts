import { FastifyRequest, FastifyReply } from "fastify";
import { getInstanceInfo } from "../../service/info/get";

export async function getServerInfo(_req: FastifyRequest, res: FastifyReply) {
  const resp = await getInstanceInfo();
  if (resp !== null) {
    return res.status(200).send(resp);
  } else {
    return res.status(400).send("Invalid Request");
  }
}
