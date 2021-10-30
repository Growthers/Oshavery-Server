import { FastifyReply, FastifyRequest } from "fastify";
import { info, serverInfo } from "../../models/info";
import { InstanceInformation } from "../../types/info_types";

export async function updateServerInfo(
  req: FastifyRequest<{ Body: InstanceInformation }>,
  res: FastifyReply
) {
  const serverInfo: serverInfo = {
    instance_name: req.body.name,
    admin: {
      account: req.body.admin.account,
      mail: req.body.admin.mail,
    },
    tos: req.body.tos,
    privacy_policy: req.body.privacy_policy,
  };

  await info
    .update(serverInfo)
    .then(() => {
      res.status(200).send(serverInfo);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send("Invalid request");
    });
}
