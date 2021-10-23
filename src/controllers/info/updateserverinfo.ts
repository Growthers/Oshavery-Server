import { FastifyReply, FastifyRequest } from "fastify";
import { info, serverInfo } from "../../models/info.js";
import { InstanceInformation } from "../../types/info_types";
import { AuthHeaders } from "../../types/auth_types";
import { IncomingMessage, Server } from "http";
import { checklogin } from "../auth/checklogin";
import { InvalidTokenError } from "../auth/verifytoken";

export async function updateServerInfo(
  req: FastifyRequest<
    { Body: InstanceInformation; Headers: AuthHeaders },
    Server,
    IncomingMessage
  >,
  res: FastifyReply
) {
  if (!req.headers.authorization) return;
  const check = await checklogin(req.headers.authorization);
  if (check instanceof InvalidTokenError) {
    res.status(401).send("Invalid request");
    return;
  }

  const { body } = req;
  const serverInfo: serverInfo = {
    instance_name: req.body.name,
    admin: {
      account: body.admin.account,
      mail: body.admin.mail,
    },
    tos: body.tos,
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
