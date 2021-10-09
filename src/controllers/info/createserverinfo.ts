import express from "express";
import { info, serverInfo } from "../../models/info";

export async function createServerInfo(req: express.Request, res: express.Response) {
  const body = req.body;

  console.log(req.body.instance_name);

  const serverInfo: serverInfo = {
    instance_name: body.instance_name,
    admin: {
      account: body.admin.account,
      mail: body.admin.mail,
    },
    tos: body.tos,
    privacy_policy: body.privacy_policy,
  };

  await info.create(serverInfo)
    .then(()=> {
      res.status(201).json(serverInfo);
      return;
    })
    .catch((e) => {
      console.log(e);
      res.status(400).send("Invalid request");
      return;
    });
  return;

}
