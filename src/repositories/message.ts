import { PrismaClient } from "@prisma/client";
// import { channelController } from "../controllers/channelcontroller";
const prisma = new PrismaClient();

// ToDo: Prismaの型を使う
export interface message_struct {
  timestamp: Date;
  author: {
    id: string;
    name: string;
    avator: string;
    bot: boolean;
    state: number;
  };
  ip: string;
  content: string;
  guild_id?: string;
  channel_id: string;
  edited_timestamp?: Date;
}

export async function createMessage(body: {
  timestamp: Date;
  author: {
    id: string;
    name: string;
    avatar: string;
    bot: boolean;
    state: number;
  };
  ip: string;
  content: string;
  guild_id?: string;
  channel_id: string;
  edited_timestamp?: Date;
}) {
  console.log(body);
  const res = await prisma.messages.create({
    data: {
      content: body.content,
      ip: body.ip,
      user: { connect: { id: body.author.id } },
      channels: { connect: { id: body.channel_id } },
    },
  });
  // 最新メッセージを更新
  await prisma.channels.update({
    where: {
      id: body.channel_id,
    },
    data: {
      latest_message_id: res.id,
    },
  });
  return res;
}

export async function getMessages(
  id: string,
  // eslint-disable-next-line
  before: any | null,
  limit: number
) {
  /*
      id: チャンネルのUUID
      before: 取得したい範囲の最初のID
      limit: 取得したい件数
    */

  if (!limit || !before) {
    return null;
  }

  const messages = await prisma.messages.findMany({
    where: {
      channel_id: id,
      deleted: false, // 論理削除されていないメッセージのみ取得するようにしてある
    },
    orderBy: [
      {
        created_at: "asc",
      },
    ],
    cursor: { id: before },
    take: limit,
  });

  // 取得に失敗したらエラーを投げる
  if (!messages) {
    return null;
  } else {
    return messages;
  }
}

export async function getFirstMessage(id: string) {
  const message = await prisma.messages.findFirst({
    where: {
      channel_id: id,
      deleted: false, // 削除されていないものだけ取得できるようにする
    },
    orderBy: [{ created_at: "asc" }],
  });
  // 同様に取得失敗時はエラーを投げる
  if (!message) {
    return null;
  } else {
    return message;
  }
}

export async function getOneMessage(messageId: string) {
  const res = await prisma.messages.findUnique({
    where: {
      id: messageId,
    },
  });
  // エラーを投げる
  if (!res) {
    return null;
  } else {
    return res;
  }
}

export async function updateMessage(id: string, content: string) {
  return prisma.messages.update({
    where: {
      id,
    },
    data: {
      content,
    },
  });
}

export async function deleteMessage(messageId: string, time: Date) {
  return prisma.messages.update({
    where: {
      id: messageId,
    },
    data: {
      deleted: true, // deletedをtrueにすると削除した扱いになる
      deleted_at: time,
    },
  });
}
