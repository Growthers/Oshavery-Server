import {PrismaClient} from "@prisma/client";
import {logger} from "../refactor-main";

const prisma = new PrismaClient();

// post時のbodyの型
export type serverInfo = {
  instance_name: string;
  admin: {
    account: string;
    mail: string;
  }
  tos: string;
  privacy_policy: string;
}

export const info = {
  // GET /server-info
  async get() {

    const info = await prisma.server_info.findMany();
    const user_count = await prisma.users.count();
    const message_count = await prisma.messages.count();

    return {
      instance_name: info[0].instance_name,
      admin: {
        account: info[0].admin_id,
      },
      tos: info[0].tos,
      privacy_policy: info[0].privacy_policy,
      user_count: user_count,
      message_count: message_count
    };


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

    const user_count = await prisma.users.count();
    const message_count = await prisma.messages.count();

    await prisma.server_info.update({
      where: { id: 1 },
      data: {
        instance_name: body.instance_name,
        user_count: user_count,
        message_count: message_count,
        admin_id: body.admin.account,
        tos: body.tos,
        privacy_policy: body.privacy_policy,
      }
    }).catch((e) => {logger.error(e)});
  },

}
