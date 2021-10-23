import { FastifyReply } from "fastify";
import { medias } from "../../models/media.js";
import { checklogin } from "../auth/checklogin";
import { InvalidTokenError } from "../auth/verifytoken";

// アップロードされるファイルの操作系統
// eslint-disable-next-line
export async function getMedia(req: any, res: FastifyReply) {
  if (!req.headers.authorization) return;
  const check = await checklogin(req.headers.authorization);
  if (check instanceof InvalidTokenError) {
    res.status(401).send("Invalid request");
    return;
  }
  const media = await medias.get(req.params.fileId);

  if (!media) {
    return res.status(404).send("Not found");
  }
  return res.status(200).send(media);
}
