import { FastifyReply, FastifyRequest } from "fastify";
import { info, serverInfo } from "../../models/info";
import { InstanceInformation } from "../../types/info_types";

export async function createServerInfo(
  req: FastifyRequest<{ Body: InstanceInformation }>,
  res: FastifyReply
) {
  const Requestbody = req.body;

  const serverInfo: serverInfo = {
    instance_name: req.body.name,
    admin: {
      account: Requestbody.admin.account,
      mail: Requestbody.admin.mail,
    },
    tos: Requestbody.tos,
    privacy_policy: Requestbody.privacy_policy,
  };

  await info
    .create(serverInfo)
    .then(() => {
      res.status(201).send(serverInfo);
    })
    .catch((e) => {
      console.log(e);
      res.status(400).send("Invalid request");
    });
}
