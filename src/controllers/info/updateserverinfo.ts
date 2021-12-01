import { FastifyReply, FastifyRequest } from "fastify";
import { InstanceInformation } from "../../types/info_types";
import { updateInstanceInfo } from "../../service/info/update";

export async function updateServerInfo(
  req: FastifyRequest<{ Body: InstanceInformation }>,
  res: FastifyReply
) {
  const serverInfo = {
    name: req.body.name,
    admin: {
      account: req.body.admin.account,
      mail: req.body.admin.mail,
    },
    tos: req.body.tos,
    policy: req.body.privacy_policy,
  };
  const resp = await updateInstanceInfo(serverInfo);
  if (resp !== null) {
    return res.status(200).send(resp);
  } else {
    req.log.error("Failed to update instance info");
    return res.status(500).send("Failed to get instance info");
  }
}
