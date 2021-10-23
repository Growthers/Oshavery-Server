import { FastifyReply, FastifyRequest } from "fastify";
import { info, serverInfo } from "../../models/info.js";
import { InstanceInformation } from "../../types/info_types";
import { AuthHeaders } from "../../types/auth_types";
import { IncomingMessage, Server } from "http";
import { checklogin } from "../auth/checklogin";
import { InvalidTokenError } from "../auth/verifytoken";

export async function createServerInfo(
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
