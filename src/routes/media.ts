const router_media = require("express").Router();
import {mediaController} from "../controllers/mediacontroller";
import multer from "multer";
const uploader = multer();

router_media.route("/")
  .post(uploader.single("file"),mediaController.uploadMedia)

router_media.route("/:fileId")
  .get(mediaController.getMedia)
  .delete(mediaController.deleteMedia);

module.exports = router_media;
