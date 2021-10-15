import { FastifyInstance } from "fastify";

import { updateServerInfo } from "../controllers/info/updateserverinfo";
import { getVersion } from "../controllers/info/getversion";
import { getServerInfo } from "../controllers/info/getserverinfo";
import { createServerInfo } from "../controllers/info/createserverinfo";

export async function InstanceInfoRouter(server: FastifyInstance) {
  await server.get("/version", getVersion);

  await server.get("/server-info", getServerInfo);
  await server.post("/server-info", createServerInfo);
  await server.patch("/server-info", updateServerInfo);
}
