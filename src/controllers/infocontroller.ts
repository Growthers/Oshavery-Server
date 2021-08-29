import express from "express";
import { info, serverInfo } from "../models/info"

export const infoController = {
  getVersion(req: express.Request, res: express.Response) {
    const version: string = "Oshavery v.0.0.1"
    const revision: string = "";
    // バージョンを返す
    console.log(req.path);

    res.json({
      version: version,
      revision: revision
    });
  },

  async getServerInfo(req: express.Request, res: express.Response) {
    // サーバー情報を返す
    console.log(req.path);
    const inf = await info.get()
    // console.log(inf[0]);
    res.json(inf[0]);
  },

  async createServerInfo(req: express.Request, res: express.Response) {
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
        return
      })
      .catch((e) => {
        console.log(e);
        res.status(400).send("Invalid request");
        return;
      });
    return;

  },

  async updateServerInfo(req:express.Request, res:express.Response) {
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
        res.status(200).json(serverInfo)
      })
      .catch((e) => {
        console.log(e);
        res.status(500).send("Invalid request");
        return;
      });
        return;
  }
}

// module.exports = infoController;
