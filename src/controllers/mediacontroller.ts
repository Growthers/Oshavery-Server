import express from "express";
import { media, medias } from "../models/media";
import {Storage} from "@google-cloud/storage"
import dotenv from "dotenv";
import axios from "axios";
import { users } from "../models/user";
import { logger } from "../main";

const conf = dotenv.config();

// アップロードされるファイルの操作系統

const keyFile = process.env.KEYFILE; // GCS接続用クレデンシャルファイルパス
const bucketName = process.env.BUCKETNAME; // GCSのバケット名
const storage = new Storage({keyFilename: keyFile});
const bucket = storage.bucket(bucketName || "");
const mediaServerURL = process.env.MEDIA_SERVER_URL

export const mediaController = {

  async uploadMedia(req:express.Request, res:express.Response){

    interface reponse {
      id: string;
      name: string;
      mime: string;
      size: number;
      path: string;
      fullpath: string;
      message_id: string;
      channel_id: string | null;
      uploader_id: string | null;
      type: string;
      guildId?: string;
    }

    const accessToken = req.headers.authorization;
    const response = await axios("https://" + process.env.AUTH0_DOMAIN + "/userinfo" || "", {
    method: "GET",
    headers: {
      Authorization: accessToken,
    }
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

    const uid = await users.getFromSub(response.sub);
    if (!uid){return res.status(400).send("invalid request")}

    let media:media = {
      mime: "",
      name: "",
      size: 0,
      uploaderId: uid.id,
      channelId: "",
      ip: "",
      path: "",
      fullpath: "",
      type: "",
      guildId: ""
    };

    // ファイルをバッファに入れておく
    const buffer = req.file?.buffer;
    const channelId = req.body.channelId;
    const filename = req.file?.originalname;
    const type: "icon" | "attachment" = req.body.type;

    console.log(channelId,filename)
    if (!buffer || !channelId || !filename || !req.file){return res.status(400).send("Invalid request");}
    // ファイルサイズとチャンネルIDを取得

    media.channelId = channelId;
    // media.size = req.file.size;
    media.ip = req.ip;
    media.name = filename;
    media.mime = req.file.mimetype;
    media.guildId = req.body.guildId;

    if (type === "icon"){
      media.path = `media/${media.guildId}/${media.guildId}`
    }else {
      media.path = `media/${media.channelId}/${Date.now()}_${media.name}`
    }


    const upload = bucket.file(media.path); // ファイルパスとファイル名を指定
    await upload.save(buffer, {gzip: true})
    .then(() => {logger.info("file uploaded")})
    .catch((e) => {console.error(e)});

    media.fullpath = `https://${mediaServerURL}/${media.path}`
    await medias.upload(media)
      .then((r) => {
         const media_struct:reponse= {
          id: r.id,
          name: r.name,
          mime: r.mime,
          size: r.size,
          path: r.path,
          fullpath: r.fullpath,
          message_id: r.message_id,
          channel_id: r.channelId,
          uploader_id: r.uploaderId,
          type: r.type
        }
        return res.json(media_struct);
      }).catch((e) => {logger.error(e);})

    return;
  },

  async getMedia(req:express.Request, res:express.Response){
    await medias.get(req.params.fileId)
    .then((m)=> {
      return res.status(200).json(m);
    })
    .catch((e) => {res.status(404).send("Not found"); logger.error(e); return;})

    return;
  }
}

