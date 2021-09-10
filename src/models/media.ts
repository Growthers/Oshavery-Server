import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// メディアの型
export interface media {
  name: string;
  mime: string;
  size: number;
  uploaderId: string;
  channelId: string;
  ip: string;
  path: string;
};

//命名がややこしいので要検討
export const medias = {

  async get(id: string) {
    return await prisma.media.findUnique({
      where: {
        id: id
      }
    });
  },

  // POST
  async upload(media:media) {
    // Todo: 後でテストする
    let id:string = "";
    await prisma.messages.create({
      data: {
        ip: "",
        content: "",
        user: {connect: {id: media.uploaderId}},
        channels: {connect: {id: media.channelId}},
      }
    })
    .then((f) => {
      id = f.id
    })
    .catch((e) => {
      console.error(e);
      return;
    });


    await prisma.media.create({
      data: {
        name: media.name,
        mime: media.mime,
        size: media.size,
        path: media.path,
        channel: {
          connect: {id: media.channelId},
        },
        message: {
          connect: {id: id},
        }
      },
    });

  },

  async delete(id:string){
    await prisma.media.delete({
      where: {
        id: id,
      }
    });
    return;

  }

}
