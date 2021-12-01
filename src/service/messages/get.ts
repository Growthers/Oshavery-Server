import {
  getFirstMessage,
  getMessages,
  getOneMessage as getMes,
} from "../../repositories/message";
import { users } from "../../repositories/user";
import { getMediaFromMessageId } from "../../repositories/media";

export async function getMessage(
  beforeId: string | undefined,
  channelId: string,
  limit: number
) {
  let before;
  const respo = [];

  // before: 指定したidのメッセージより前のメッセージを取得できる  指定しないと最新のメッセージ以降100件を返す
  if (beforeId === undefined) {
    before = await getFirstMessage(channelId).then((r) => r?.id);
  } else {
    before = beforeId;
  }

  /*
  limit: 一回で取得するメッセージの数を指定
  最大は100件で何も指定しないと100件取得とみなす
  */
  const Limit = isNaN(limit) || limit >= 100 || !limit ? 100 : Number(limit);

  const messages = await getMessages(channelId, before, Limit);

  if (messages === null) {
    return console.error("error");
  }

  for (let i = 0; i < messages.length; i++) {
    const usr = await users.get(messages[i].userId || "");
    if (!usr) {
      return null;
    }

    // contentが空のメッセージはメディアファイルを含んでいるのでメディアをメッセージIDで検索
    if (messages[i].content === "") {
      const media = await getMediaFromMessageId(messages[i].id);
      if (!media) {
        return;
      }
      respo[i] = {
        id: messages[i].id,
        timestamp: messages[i].created_at,
        content: messages[i].content,
        guild_id: messages[i].guildsId || "",
        channel_id: messages[i].channel_id,
        edited_timestamp: messages[i].updated_at || null,
        author: {
          id: messages[i].userId || "",
          name: usr.name,
          avatarurl: usr.avatarurl,
          bot: usr.bot,
          state: 0,
        },
        media: {
          name: media.name,
          mime: media.mime,
          size: 0,
          uploaderId: media.uploaderId || "",
          channelId: media.channelId || "",
          type: "",
          ip: "",
          path: media.path,
          fullpath: media.fullpath,
        },
      };
    } else {
      respo[i] = {
        id: messages[i].id,
        timestamp: messages[i].created_at,
        content: messages[i].content,
        guild_id: messages[i].guildsId || "",
        channel_id: messages[i].channel_id,
        edited_timestamp: messages[i].updated_at || null,
        author: {
          id: messages[i].userId || "",
          name: usr.name,
          avatarurl: usr.avatarurl,
          bot: usr.bot,
          state: 0,
        },
      };
    }
  }

  return respo;
}

export async function getOneMessage(messageId: string) {
  const mes = await getMes(messageId);
  if (mes === null) {
    return null;
  } else {
    return mes;
  }
}
