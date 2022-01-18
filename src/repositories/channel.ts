import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

const prisma = new PrismaClient();

export async function getChannels(guild_id: string) {
  const res = await prisma.channels.findMany({
    where: {
      guildId: guild_id,
    },
  });

  // 仕様上ギルドは1つ以上のチャンネルを持つ
  // よって、resの返り値が空の配列の場合はギルドが存在しないことになる
  if (res.length === 0) {
    // エラーのときは明示的にnullを返す
    return null;
  } else {
    return res;
  }
}

export async function updateChannel(data: {
  id: string;
  name: string;
  topic: string;
  position: number;
}) {
  if (data.name === "") {
    return undefined;
  }

  const res = await prisma.channels.update({
    where: {
      id: data.id,
    },
    data: { name: data.name, topic: data.topic, position: data.position },
  });

  if (!res) {
    return undefined;
  } else {
    return res;
  }
}

export async function createChannel(data: {
  name: string;
  topics: string;
  type: string;
  position: number;
  guildId: string;
}) {
  let res;
  try {
    // チャンネルを先に作る
    res = await prisma.channels.create({
      data: {
        latest_message_id: "",
        guilds: { connect: { id: data.guildId } },
        name: data.name,
        topic: data.topics,
        type: data.type,
        position: data.position,
      },
    });

    // Todo: この部分を分離してServiceに動かす
    // チャンネルの作成通知のシステムメッセージを登録する
    const SysMessage = await prisma.messages.create({
      data: {
        content: `チャンネルが作成されました ここが${res.name}のはじまりです`,
        ip: "SYSTEM",
        channels: { connect: { id: res.id } },
        user: { connect: { id: "00000000-0000-0000-0000-000000000000" } },
        // システムアカウントのIDは 00000000-0000-0000-0000-000000000000 で完全固定 (初期設定で自動生成されている
      },
    });

    // チャンネルの最新メッセージを更新
    await prisma.channels.update({
      where: {
        id: res.id,
      },
      data: {
        latest_message_id: SysMessage.id,
      },
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return undefined;
    }
  }

  return res;
}
