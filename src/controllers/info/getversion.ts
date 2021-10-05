import express from "express";
import { info, serverInfo } from "../../models/info";

export function getVersion(req: express.Request, res: express.Response) {
  const GIT_COMMIT_HASH = process.env.GIT_COMMIT_HASH;
  const version: string = "Oshavery v.0.1";
  const revision: string = GIT_COMMIT_HASH || "";
  // バージョンを返す
  console.log(req.path);

  res.json({
    version: version,
    revision: revision
  });
}
