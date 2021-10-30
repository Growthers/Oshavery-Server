import { FastifyReply, FastifyRequest } from "fastify";

export async function getVersion(_req: FastifyRequest, res: FastifyReply) {
  const version = "Oshavery v.0.1.1";
  const { GIT_COMMIT_HASH } = process.env;
  const revision: string = GIT_COMMIT_HASH || "";
  // バージョンを返す
  res.type("application/json").code(200);
  res.send({
    version,
    revision,
  });
  return;
}
