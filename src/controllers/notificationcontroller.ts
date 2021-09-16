import WebSocket from "ws";

const wss = new WebSocket.Server({port: 8080})

//資料が少ないため実装は間違ってると思われる
//というか絶対間違っているので再実装必須

//const allowedOrigins = [
//  'http://localhost:5500'
//];
//async function checkorigin() {
//
//}




interface opeChannel {
  type: string;
  body: {
    channelId: string;
  };
};

async function channel(type: string, channelId: string) {
  const channel:opeChannel = {
    type: type,
    body: {
      channelId: channelId
    }
  };
  console.log(JSON.stringify(channel));
  wss.clients.forEach(function (client) {
    client.send(JSON.stringify(channel));
  });
};



interface opeMessage {
  type: string;
  body: {
    channelId: string;
    messageId: string;
  }
};

async function message(type: string, channelId: string, messageId: string) {
  const message:opeMessage = {
    type: type,
    body: {
      channelId: channelId,
      messageId: messageId
    }
  };
  console.log(JSON.stringify(message));
  wss.clients.forEach(function (client) {
    client.send(JSON.stringify(message))
  });
};



interface opeUser {
  type: string;
  body: {
    userId: string;
  }
};

async function user(type: string, userId: string) {
  const user:opeUser = {
    type: type,
    body: {
      userId
    }
  };
  console.log(JSON.stringify(user));
  wss.clients.forEach(function (client) {
    client.send(JSON.stringify(user))
  });
};



//要検証
export async function channelCreated(id: string) {
  channel(id,"CHANNEL_CREATED");
};

//Demoが終わったら
export async function channelUpdated(id: string) {
  channel(id,"CHANNEL_UPDATED");
};

export async function channelDeleted(id: string) {
  channel(id,"CHANNEL_DELETED")
};

//message
// messageが完成したら
export async function messageCreated(channelId: string, messageId: string) {
  message("MESSAGE_CREATED",channelId,messageId);
};
export async function messageUpdated(channelId: string, messageId: string) {
  message("MESSAGE_UPDATED",channelId,messageId);
};
export async function messageDeleted(channelId: string, messageId: string) {
  message("MESSAGE_DELETED",channelId,messageId);
};


//user
//user部分が完成したら
export async function userJoined(userId: string) {
  user("USER_JOINED",userId)
}

export async function userUpdated(userId: string) {
  user("USER_UPDATED",userId)
}

export async function userStatusUpdate(userId: string) {
  user("USER_STATUS_UPDATED",userId)
}
