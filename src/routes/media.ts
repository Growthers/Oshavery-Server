import express from "express";
const router_media = express.Router();

import {getMedia} from "../controllers/medias/getmedia";
import {uploadMedia} from "../controllers/medias/uploadmedia";

import multer from "multer";
const uploader = multer();

router_media.route("/")
  .post(uploader.single("file"),uploadMedia);

router_media.route("/:fileId")
  .get(getMedia)
  // .delete(mediaController.deleteMedia);
  // ファイルはGCSからは削除しないことになった
  // ToDo: ファイルの論理削除の実装

module.exports = router_media;
