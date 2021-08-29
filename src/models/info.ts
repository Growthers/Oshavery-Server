import { PrismaClient, server_info } from "@prisma/client";
const prisma = new PrismaClient();

// post時のbodyの型
export interface serverInfo {
  instance_name: string;
  admin: {
    account: string;
    mail: string;
  }
  tos: string;
  privacy_policy: string;
};

export const info = {
  // GET /server-info
  async get() {
    return await prisma.server_info.findMany();
  },

  // POST  /server-info
  async create(body: serverInfo) {
    // ToDo: このままだと2件以上登録できてしまう(読み出しは1つしかできない仕様にしてある)
    await prisma.server_info.create({
      data: {
        instance_name: body.instance_name,
        user_count: 0,
        message_count: 0,
        admin_id: body.admin.account,
        tos: body.tos,
        privacy_policy: body.privacy_policy,
      }
    });
    return;
  },

  async update(body: serverInfo){
    await prisma.server_info.update({
      where: { id: 1 },
      data: {
        instance_name: body.instance_name,
        user_count: 0,
        message_count: 0,
        admin_id: body.admin.account,
        tos: body.tos,
        privacy_policy: body.privacy_policy,
      }
    }).catch((e) => {console.log(e)})
  }

}
