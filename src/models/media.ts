import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// メディアの型
export interface media {
  name: string; // ファイル名
  mime: string; // mimeタイプ
  size: number; // サイズ(現在未使用)
  uploaderId: string; // アップロードしたユーザーのID
  channelId: string; // アップロード先
  ip: string; // アップロードしたユーザーのIP (ハリボテ化した)
  path: string; // アップロード先のパス(GCPのパス)
  fullpath: string; // アップロード先URI
  type: string; // ファイルタイプ
  guildId?: string; // ギルドのID
}

export class MediaNotFoundError extends Error{}


//命名がややこしいので要検討
export const medias = {

  async get(id: string) {
    const media =  await prisma.media.findUnique({
      where: {
        id: id
      }
    });

    if (!media) {
      throw new MediaNotFoundError();
    }else {
      return media
    }

  },

  async searchGuildIcon(id: string){
    return await prisma.media.findUnique({
      where: {
        guild_id: id
      }
    })
  },

  // POST
  async upload(media:media) {
    let id:string = "";
    await prisma.messages.create({
      data: {
        ip: media.ip,
        content: "",
        user: {connect: {id: media.uploaderId}},
        channels: {connect: {id: media.channelId}},
      }
    })
    .then((f) => {
      id = f.id
    })
    .catch((e) => {
      console.error("error!: "+e);
      return;
    });


    return await prisma.media.create({
      data: {
        name: media.name,
        mime: media.mime,
        size: 0,
        path: media.path,
        fullpath: media.fullpath,
        type: media.type,
        channel: {
          connect: {id: media.channelId},
        },
        guild: {
          connect: {id: media.guildId}
        },
        message: {
          connect: {id: id},
        }
      },
    }).then((r) => {return r;})

  },

  async delete(id:string){
    await prisma.media.delete({
      where: {
        id: id,
      }
    });
    return;

  },

  async getMediaFromMessageId(id:string){
    const media =  await prisma.media.findFirst({
      where: {
        message_id: id
      }
    });

    if (!id){
      throw new MediaNotFoundError();
    }else {
      return media;
    }

  }
}
