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
  fullpath: string;
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
        channel: {
          connect: {id: media.channelId},
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

  }

}
