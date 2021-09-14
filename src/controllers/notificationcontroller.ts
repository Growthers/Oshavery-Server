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
    id: string;
  };
};


async function channel(id: string, type: string) {
  const channel:opeChannel = {
    type: type,
    body: {
      id: id
    }
  };
  console.log(JSON.stringify(channel));
  wss.clients.forEach(function (client) {
    client.send(JSON.stringify(channel));
  });
}

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

// messageが完成したら
export async function messageCreated() {
  console.log("おｋ");
};
export async function messageUpdated() {
  console.log("おｋ");
};
export async function messageDeleted() {
  console.log("おｋ");
};

