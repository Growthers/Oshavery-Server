// メディアの型
// export interface media {
//   name: string; // ファイル名
//   mime: string; // mimeタイプ
//   size: number; // サイズ(現在未使用)
//   uploaderId: string; // アップロードしたユーザーのID
//   channelId: string; // アップロード先
//   ip: string; // アップロードしたユーザーのIP (ハリボテ化した)
//   path: string; // アップロード先のパス(GCPのパス)
//   fullpath: string; // アップロード先URI
//   type: string; // ファイルタイプ
//   guildId?: string; // ギルドのID
// }

import { prisma } from "./client";

export async function getMedia(id: string) {
  const media = await prisma.media.findUnique({
    where: {
      id,
    },
  });
  // メディアが存在しないときはnullを返す
  if (!media) {
    return null;
  } else {
    return media;
  }
}

// Todo: ここもリファクタリングする
export async function searchGuildIcon(id: string) {
  return prisma.media.findUnique({
    where: {
      guild_id: id,
    },
  });
}
//
// // POST
// export async function upload(media: media) {
//   let id = "";
//
//   // 先にメディアを含んだメッセージを作成
//   await prisma.messages
//     .create({
//       data: {
//         ip: media.ip,
//         content: "",
//         user: { connect: { id: media.uploaderId } },
//         channels: { connect: { id: media.channelId } },
//       },
//     })
//     .then((f) => {
//       id = f.id;
//     })
//     .catch((e) => {
//       console.error(`error!: ${e}`);
//     });
//
//   // メディアをDBに登録
//   return prisma.media
//     .create({
//       data: {
//         name: media.name,
//         mime: media.mime,
//         size: 0,
//         path: media.path,
//         fullpath: media.fullpath,
//         type: media.type,
//         channel: {
//           connect: { id: media.channelId },
//         },
//         guild: {
//           connect: { id: media.guildId },
//         },
//         message: {
//           connect: { id },
//         },
//       },
//     })
//     .then((r) => r);
// }
//
// export async function deleteMedia(id: string) {
//   await prisma.media.delete({
//     where: {
//       id,
//     },
//   });
// }
//
export async function getMediaFromMessageId(id: string) {
  const media = await prisma.media.findFirst({
    where: {
      message_id: id,
    },
  });
  // 同様に存在しないときにはエラーを投げる
  if (!id) {
    return null;
  } else {
    return media;
  }
}
