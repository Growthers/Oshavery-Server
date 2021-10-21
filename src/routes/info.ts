import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { updateServerInfo } from "../controllers/info/updateserverinfo";
import { getVersion } from "../controllers/info/getversion";
import { getServerInfo } from "../controllers/info/getserverinfo";
import { createServerInfo } from "../controllers/info/createserverinfo";
import { InstanceInformation } from "../types/info_types";

export async function InstanceInfoRouter(server: FastifyInstance) {
  const InstanceInfoSchema: RouteShorthandOptions = {
    schema: {
      body: {
        type: "object",
        properties: {
          name: { type: "string" },
          user_count: { type: "number" },
          message_count: { type: "number" },
          admin: {
            account: { type: "string" },
          },
          tos: { type: "string" },
          privacy_policy: { type: "string" },
        },
      },
    },
  };

  await server.get("/version", await getVersion);

  await server.get("/server-info", InstanceInfoSchema, getServerInfo);
  await server.post<{ Body: InstanceInformation }>(
    "/server-info",
    InstanceInfoSchema,
    createServerInfo
  );
  await server.patch("/server-info", InstanceInfoSchema, updateServerInfo);
}
