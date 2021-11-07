import { FastifyInstance } from "fastify";

import { updateServerInfo } from "../controllers/info/updateserverinfo";
import { getVersion } from "../controllers/info/getversion";
import { getServerInfo } from "../controllers/info/getserverinfo";
import { createServerInfo } from "../controllers/info/createserverinfo";
import { InstanceInformation } from "../types/info_types";

export async function InstanceInfoRouter(server: FastifyInstance) {
  await server.get("/version", getVersion);

  await server.get("/server-info", getServerInfo);
  await server.post<{ Body: InstanceInformation }>(
    "/server-info",
    createServerInfo
  );
  await server.patch<{ Body: InstanceInformation }>(
    "/server-info",
    updateServerInfo
  );
  return;
}
