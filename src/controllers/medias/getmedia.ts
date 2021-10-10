import {FastifyReply} from "fastify";
import { medias } from "../../models/media";

// アップロードされるファイルの操作系統

export async function getMedia(req:any, res:FastifyReply){
  const media = await medias.get(req.params.fileId)

  if (!media){
    return res.status(404).send("Not found");
  }else {
    return res.status(200).send(media);
  }

}


