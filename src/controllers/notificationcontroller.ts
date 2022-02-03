import WebSocket from "ws";
// import { guild } from "../models/guild";

console.log("呼び出されました");

export const wss = new WebSocket.Server({ port: 8080 });

export function wsClose() {
  console.log("消されました");
  wss.close();
}

// 資料が少ないため実装は間違ってると思われる
// というか絶対間違っているので再実装必須

interface opeChannel {
  type: string;
  body: {
    channelId: string;
  };
}

async function channel(type: string, channelId: string) {
  const channel: opeChannel = {
    type,
    body: {
      channelId,
    },
  };
  console.log(JSON.stringify(channel));
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(channel));
  });
}

interface opeMessage {
  type: string;
  body: {
    channelId: string;
    messageId: string;
  };
}

async function message(type: string, channelId: string, messageId: string) {
  const message: opeMessage = {
    type,
    body: {
      channelId,
      messageId,
    },
  };
  console.log(JSON.stringify(message));
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
}

interface opeUser {
  type: string;
  body: {
    userId: string;
    guildId: string;
  };
}

async function user(type: string, userId: string, guildId: string) {
  const user: opeUser = {
    type,
    body: {
      userId,
      guildId,
    },
  };
  console.log(JSON.stringify(user));
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(user));
  });
}

// 要検証
export async function channelCreated(id: string) {
  await channel(id, "CHANNEL_CREATED");
}

/// /Demoが終わったら
// export async function channelUpdated(id: string) {
//  await channel(id,"CHANNEL_UPDATED");
// };
//
// export async function channelDeleted(id: string) {
//  await channel(id,"CHANNEL_DELETED")
// };

// message
// messageが完成したら
export async function messageCreated(channelId: string, messageId: string) {
  await message("MESSAGE_CREATED", channelId, messageId);
}
export async function messageUpdated(channelId: string, messageId: string) {
  await message("MESSAGE_UPDATED", channelId, messageId);
}
export async function messageDeleted(channelId: string, messageId: string) {
  await message("MESSAGE_DELETED", channelId, messageId);
}

// user
// user部分が完成したら
export async function userJoined(userId: string, guildId: string) {
  await user("USER_JOINED", userId, guildId);
}

export async function userUpdated(userId: string, guildId: string) {
  await user("USER_UPDATED", userId, guildId);
}

export async function userStatusUpdate(userId: string, guildId: string) {
  await user("USER_STATUS_UPDATED", userId, guildId);
}
