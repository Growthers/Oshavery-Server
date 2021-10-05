import express from "express";
import { media, medias } from "../../models/media";
import {Storage} from "@google-cloud/storage"
import dotenv from "dotenv";
import axios from "axios";
import { users } from "../../models/user";
import { logger } from "../../main";
dotenv.config();
// アップロードされるファイルの操作系統

export async function getMedia(req:express.Request, res:express.Response){
  const media = await medias.get(req.params.fileId)

  if (!media){
    return res.status(404).send("Not found");
  }else {
    return res.status(200).json(media);
  }

}


