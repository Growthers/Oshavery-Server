import { FastifyReply } from "fastify";
import get from "../../service/media/get";

// アップロードされるファイルの操作系統
// eslint-disable-next-line
export async function getMedia(req: any, res: FastifyReply) {
  const media = await get(req.params.fileId);

  if (!media) {
    return res.status(404).send("Not found");
  } else {
    return res.status(200).send(media);
  }
}
