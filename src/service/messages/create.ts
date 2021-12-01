import { users } from "../../repositories/user";
import { createMessage } from "../../repositories/message";
import { messageCreated } from "../../controllers/notificationcontroller";

export default async function CreateMessage(data: {
  ip: string;
  content: string;
  channelId: string;
}) {
  const now = new Date();

  // ToDo: ここでテスト用アカウントを使うことを強制しているのでそれをやめる(開発モードの影響)
  const author = await users.getFromSub("oshavery|1");

  if (!author) {
    return null;
  }

  // ここでメッセージの最大文字数を決めることができる
  /* nodejsで"<文字列>.length"を使うと漢字の異体字やUnicode絵文字の文字数がおかしくなるので、
      スプレッド構文 "[...<文字列>].length"を使ってバイト数ではなく文字数で判定している
      https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/length#unicode
  */

  if (
    data.content === "" ||
    !data.content ||
    [...data.content].length > 10000
  ) {
    return null;
  }

  const message = await createMessage({
    timestamp: now,
    author: {
      id: author.id,
      name: author.name,
      avatar: author.avatarurl,
      bot: author.bot,
      state: 0,
    },
    ip: data.ip,
    content: data.content,
    guild_id: "",
    channel_id: data.channelId,
  });

  await messageCreated(message.channel_id, message.id);
  return message;
}
