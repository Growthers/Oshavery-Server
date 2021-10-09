import express from "express";
import { info, serverInfo } from "../../models/info";

export async function getServerInfo(_req: express.Request, res: express.Response) {
  // サーバー情報を返す
  const inf = await info.get();
  res.json(inf);
  return inf;
}
