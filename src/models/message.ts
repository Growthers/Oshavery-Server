import { PrismaClient } from "@prisma/client";
// import { channelController } from "../controllers/channelcontroller";
const prisma = new PrismaClient();

export interface message_struct {
  timestamp: Date;
  author: {
    id: string;
    name: string;
    avator: string;
    bot: boolean;
    state: number;
  },
  ip: string;
  content: string;
  guild_id: string;
  channel_id: string;
  edited_timestamp?: Date;
}


export const message = {

  async createMessage(body: message_struct){
    // ToDo: チャンネルとギルドの実装が終わったらここをアンコメントして実装する
    console.log(body);
    // await prisma.channels.update({
    //   where: {
    //     id: body.channel_id,
    //   },
    //   data: {
    //     messages: {
    //       create: {
    //         created_at: body.timestamp,
    //         content: body.content,
    //         ip: body.ip
    //       }
    //     }
    //   }
    // })

    return;
  },

  async getMessages(id:string,before:any,limit:number){
    /*
      id: チャンネルのUUID
      before: 取得したい範囲の最初のID
      limit: 取得したい件数
    */
    await prisma.messages.findMany({
      where: {
        channel_id: id
      },
      orderBy: [{
        created_at: "asc"
      }],
      cursor: {id: before},
      take: limit
    });
    return;
  },

  async getOneMessage(messageId:string){
    await prisma.messages.findUnique({
      where: {
        id: messageId
      }
    })
    return;
  }

}
