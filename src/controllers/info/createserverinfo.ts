import { FastifyReply } from "fastify";
import { info, serverInfo } from "../../models/info";

// eslint-disable-next-line
export async function createServerInfo(req: any, res: FastifyReply) {
  const Requestbody = req.body;

  const serverInfo: serverInfo = {
    instance_name: req.body.instance_name,
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
