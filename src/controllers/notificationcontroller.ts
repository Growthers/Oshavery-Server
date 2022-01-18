import WebSocket from "ws";
import {
  notification,
  opeChannelBody,
  opeMessageBody,
  opeUserBody,
} from "../types/notification_types";
import { verifyToken } from "../service/auth/jwt";

const wss = new WebSocket.Server({ port: 8080 });

/*
  ToDo: 全体/個別送信のメソッドを生やす 認証生やす-> ok
*/

wss.on("connection", async (ws, req) => {
  if (req.url) {
    // Todo: 設定でURL指定できるように
    // ホスト部にwsから渡されるクエリパラメータをくっつける
    const u = new URL("ws://localhost:8080" + req.url);
    if (!u) {
      return ws.close(-1, "Token required");
    }
    // URLをパースして、クエリパラメータ"token"を取得
    const token = new URLSearchParams(u.search);
    const get = token.get("token");
    if (!get) {
      return ws.close(-1, "Authentication failed");
    } else {
      const checker = await verifyToken(get);
      if (checker) {
        ws.send(JSON.stringify(checker));
      } else {
        return ws.close();
      }
    }
  }
});

async function channel(type: string, channelId: string) {
  const channel: notification<opeChannelBody> = {
    type: type,
    body: {
      channelId: channelId,
    },
  };
  console.log(JSON.stringify(channel));
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(channel));
  });
}

async function message(type: string, channelId: string, messageId: string) {
  const message: notification<opeMessageBody> = {
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

async function user(type: string, userId: string, guildId: string) {
  const user: notification<opeUserBody> = {
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
