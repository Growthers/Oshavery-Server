import {FastifyInstance} from "fastify";


import {getMedia} from "../controllers/medias/getmedia";
// import {uploadMedia} from "../controllers/medias/uploadmedia";

// import multer from "multer";
// const uploader = multer();

export async function MediaRouter(server: FastifyInstance){

  /*server.post("/files", uploader.single("file"),uploadMedia);*/
  // ToDo: ファイルアップロードのやり方を調べて実装する

  server.get("/files/:fileId", getMedia)
  // .delete(mediaController.deleteMedia);
  // ファイルはGCSからは削除しないことになった
  // ToDo: ファイルの論理削除の実装

}

