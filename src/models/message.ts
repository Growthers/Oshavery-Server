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
  guild_id?: string;
  channel_id: string;
  edited_timestamp?: Date;
}


export const message = {

  async createMessage(body: message_struct) {
    console.log(body);
    const res = await prisma.messages.create({
      data: {
        content: body.content,
        ip: body.ip,
        user: { connect: { id: body.author.id } },
        channels: { connect: { id: body.channel_id } }
      }
    });
    // 最新メッセージを更新
    await prisma.channels.update({
      where: {
        id: body.channel_id
      },
      data: {
        latest_message_id: res.id
      }
    })
    return res;
  },

  async getMessages(id: string, before: any | null, limit: number) {
    /*
      id: チャンネルのUUID
      before: 取得したい範囲の最初のID
      limit: 取得したい件数
    */

    console.log(limit,id,before);
    if (!limit || !before){return;}
    return await prisma.messages.findMany({
      where: {
        channel_id: id,
        deleted: false
      },
      orderBy: [{
        created_at: "asc"
      }],
      cursor: { id: before },
      take: limit
    }).catch((e) => {console.log(e)}) || [];

  },

  async getFirstMessage(id: string) {
    // 何を血迷ったのか

    return await prisma.messages.findFirst({
      where: {
        channel_id: id
      },
      orderBy: [{ created_at: "asc" }]
    });


  },

  async getOneMessage(messageId: string) {
    const res = await prisma.messages.findUnique({
      where: {
        id: messageId
      }
    })
    return res;
  },

  async updateMessage(id: string, content: string) {
    return await prisma.messages.update({
      where: {
        id: id
      },
      data: {
        content: content
      }
    })
  },

  async deleteMessage(messageId: string, time: Date) {
    return await prisma.messages.update({
      where: {
        id: messageId
      },
      data: {
        deleted: true,
        deleted_at: time
      }
    });
  }

}
