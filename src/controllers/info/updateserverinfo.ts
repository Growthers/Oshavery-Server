import express from "express";
import { info, serverInfo } from "../../models/info";


export async function updateServerInfo(req:express.Request, res:express.Response) {
  const body = req.body;
  const serverInfo: serverInfo = {
    instance_name: body["instance-name"],
    admin: {
      account: body["admin"]["account"],
      mail: body["admin"]["mail"],
    },
    tos: body["tos"],
    privacy_policy: body["privacy-policy"],
  };

  await info.update(serverInfo)
    .then(()=> {
      res.status(200).json(serverInfo);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send("Invalid request");
      return;
    });
  return;
}

