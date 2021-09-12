import express from "express";
const router_media = express.Router();

import {mediaController} from "../controllers/mediacontroller";

import multer from "multer";
const uploader = multer();

router_media.route("/")
  .post(uploader.single("file"),mediaController.uploadMedia);
  // .post(() => {console.log("ぽすとうえー")})

router_media.route("/:fileId")
  .get(mediaController.getMedia)
  .delete(mediaController.deleteMedia);

module.exports = router_media;
