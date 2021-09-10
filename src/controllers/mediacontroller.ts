import express from "express";
import { media, medias } from "../models/media";
import FileType from "file-type";

// アップロードされるファイルの操作系統

/*
const keyFile = ""; // GCS接続用クレデンシャルファイルパス
const bucketName = ""; // GCSのバケット名
const storage = new Storage({keyFilename: keyFile});
const bucket = storage.bucket(bucketName);
*/

export const mediaController = {
  async uploadMedia(req:express.Request, res:express.Response){
    let media:media = {
      mime: "",
      name: "",
      size: 0,
      uploaderId: "",
      channelId: "",
      ip: "",
      path: ""
    };

    // ファイルをバッファに入れておく
    const buffer = req.file?.buffer;
    const channelId = req.body.channel_id;
    const filename = req.file?.filename;

    if (!buffer || !channelId || !filename || !req.file){return;}
    // ファイルサイズとチャンネルIDを取得
    media.channelId = channelId;
    media.size = req.file.size;
    media.ip = req.ip

    // フロント側からくるmimeは信用できないのでここで解析
    await FileType.fromBuffer(buffer)
    .then((f) => {
      if (!f){return;}
      media.mime = f?.mime;
      return;
    })
    .catch((e) => {console.error(e); res.status(400).send("Invaild reqest"); return;});

    /*
      ToDo: ここにオブジェクトストレージへのアップロード処理を書く
    */

    /*
    const upload = bucket.file(`/media/${media.channelId}/${media.filename}`); // ファイルパスとファイル名を指定
    await upload.save(file, {gzip: true})
    .catch((e) => {console.error(e)});
    */

    await medias.upload(media);

  },

  async getMedia(req:express.Request, res:express.Response){
    await medias.get(req.params.mediaId)
    .then((m)=> {
      return res.status(200).json(m);
    }).catch((e) => {res.status(404).send("Not found"); console.error(e); return;})

    return;
  },

  async deleteMedia(req:express.Request, res:express.Response){
    // ToDo: ここにオブジェクトストレージ上のファイルを消す処理を書く
    const mediaId = req.params.mediaId; // :mediaId

    const path =  await medias.get(mediaId).catch((e) => {res.status(404).send("Not found"); console.error(e); return;})

    /*
    await bucket.file(path).delete(); // ファイルをGCSから削除
    */

    await medias.delete(mediaId).then(() => {
      return res.status(204);
    }).catch((e) => {
      console.error(e);
      return res.status(400).send("Invalid request");
    });

    return;
  }

}



module.exports = mediaController;
