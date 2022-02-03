import { logger } from "../main";
import { prisma } from "./client";

// GET /server-info
export async function getInstanceInfoFromDB() {
  const info = await prisma.server_info.findMany();
  const user_count = await prisma.users.count();
  const message_count = await prisma.messages.count();

  return {
    instance_name: info[0].instance_name,
    admin: {
      account: info[0].admin_id,
      mail: info[0].admin_mail,
    },
    tos: info[0].tos,
    privacy_policy: info[0].privacy_policy,
    user_count: user_count,
    message_count: message_count,
  };
}

// POST  /server-info
export async function create(body: {
  name: string;
  admin: {
    account: string;
    mail: string;
  };
  tos: string;
  policy: string;
}) {
  // ToDo: このままだと2件以上登録できてしまう(読み出しは1つしかできない仕様にしてある)
  const res = await prisma.server_info.create({
    data: {
      instance_name: body.name,
      user_count: 0,
      message_count: 0,
      admin_id: body.admin.account,
      admin_mail: body.admin.mail,
      tos: body.tos,
      privacy_policy: body.policy,
    },
  });
  if (!res) {
    return null;
  } else {
    return res;
  }
}

export async function update(body: {
  name: string;
  admin: {
    account: string;
    mail: string;
  };
  tos: string;
  policy: string;
}) {
  const user_count = await prisma.users.count();
  const message_count = await prisma.messages.count();

  await prisma.server_info
    .update({
      where: { id: 1 },
      data: {
        instance_name: body.name,
        user_count,
        message_count,
        admin_id: body.admin.account,
        tos: body.tos,
        privacy_policy: body.policy,
      },
    })
    .catch((e) => {
      logger.error(e);
    });
}
