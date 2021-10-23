import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { updateServerInfo } from "../controllers/info/updateserverinfo.js";
import { getVersion } from "../controllers/info/getversion.js";
import { getServerInfo } from "../controllers/info/getserverinfo.js";
import { createServerInfo } from "../controllers/info/createserverinfo.js";
import { InstanceInformation } from "../types/info_types.js";
import { AuthHeaders } from "../types/auth_types";

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
  await server.post<{ Body: InstanceInformation; Headers: AuthHeaders }>(
    "/server-info",
    InstanceInfoSchema,
    createServerInfo
  );
  await server.patch<{ Body: InstanceInformation; Headers: AuthHeaders }>(
    "/server-info",
    InstanceInfoSchema,
    updateServerInfo
  );
}
