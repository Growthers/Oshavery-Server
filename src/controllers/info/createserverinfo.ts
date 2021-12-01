import { FastifyReply, FastifyRequest } from "fastify";
import { InstanceInformation } from "../../types/info_types";
import { CreateInstanceInfo } from "../../service/info/create";

export async function createServerInfo(
  req: FastifyRequest<{ Body: InstanceInformation }>,
  res: FastifyReply
) {
  const Requestbody = req.body;

  const serverInfo = {
    name: req.body.name,
    admin: {
      account: Requestbody.admin.account,
      mail: Requestbody.admin.mail,
    },
    tos: Requestbody.tos,
    policy: Requestbody.privacy_policy,
  };

  const resp = await CreateInstanceInfo(serverInfo);
  if (resp === null) {
    res.log.error("Failed to create to InstanceInfo");
    return res.status(400).send("Invalid Request");
  } else {
    return res.status(201).send(resp);
  }
}
