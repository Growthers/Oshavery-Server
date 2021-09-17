import express from "express";
import { media, medias } from "../models/media";
import {Storage} from "@google-cloud/storage"
import dotenv from "dotenv";
import axios from "axios";
import { users } from "../models/user";

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
    }

    const accessToken = req.headers.authorization;
    console.log(accessToken)
    const response = await axios("https://" + process.env.AUTH0_DOMAIN + "/userinfo" || "", {
    method: "GET",
    headers: {
      Authorization: accessToken,
    }
    })
    .then((res) => {
      console.table(res.data)
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

    const uid = await users.getFromSub(response.sub);
    console.log(uid)
    if (!uid){return res.status(400).send("invalid request")}

    let media:media = {
      mime: "",
      name: "",
      size: 0,
      uploaderId: uid.id,
      channelId: "",
      ip: "",
      path: "",
      fullpath: ""
    };

    // ファイルをバッファに入れておく
    const buffer = req.file?.buffer;
    const channelId = req.body.channelId;
    const filename = req.file?.originalname;

    console.log(channelId,filename)
    if (!buffer || !channelId || !filename || !req.file){return res.status(400).send("Invalid request");}
    // ファイルサイズとチャンネルIDを取得

    media.channelId = channelId;
    // media.size = req.file.size;
    media.ip = req.ip;
    media.name = filename;
    media.mime = req.file.mimetype;
    media.path = `media/${media.channelId}/${Date.now()}_${media.name}`

    console.log(filename);
    console.table(media);

    // フロント側からくるmimeは信用できないのでここで解析
    // await FileType.fromBuffer(buffer)
    // .then((f) => {
    //   if (!f){return;}
    //   media.mime = f?.mime;
    //   return;
    // })
    // .catch((e) => {console.error(e); res.status(400).send("Invaild reqest"); return;});

    const upload = bucket.file(media.path); // ファイルパスとファイル名を指定
    await upload.save(buffer, {gzip: true})
    .then(() => {console.log("[info] file uploaded")})
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
          uploader_id: r.uploaderId
        }
        return res.json(media_struct);
      }).catch((e) => {console.log(e);})

    return;
  },

  async getMedia(req:express.Request, res:express.Response){
    await medias.get(req.params.fileId)
    .then((m)=> {
      return res.status(200).json(m);
    })
    .catch((e) => {res.status(404).send("Not found"); console.error(e); return;})

    return;
  },

  // async deleteMedia(req:express.Request, res:express.Response){
  //   // ToDo: ここにオブジェクトストレージ上のファイルを消す処理を書く
  //   const mediaId = req.params.fileId; // :fileId

  //   // console.log(req.params.fileId);
  //   const r = await medias.get(mediaId);
  //   // console.log(r?.id);
  //   // await medias.get(mediaId).then((f) => {console.log(f)}).catch((e) => {res.status(404).send("Not found"); console.error(e); return;})

  //   if (!r?.path){throw new Error("NameNotFoundError");}else{console.log("ok")}
  //   console.table(r.path);
  //   await bucket.file(r?.path).delete().then(() => {console.log("del ok")}).catch((e) => {throw e}); // ファイルをGCSから削除

  //   return res.send("no");

  //   // await medias.delete(mediaId).then(() => {
  //   //   return res.status(204);
  //   // }).catch((e) => {
  //   //   console.error(e);
  //   //   return res.status(400).send("Invalid request");
  //   // });

  //   return;
  // }
}

