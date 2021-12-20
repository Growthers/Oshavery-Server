import { PrismaClient } from "@prisma/client";
import { logger } from "../main";
import { users } from "@prisma/client";
const prisma = new PrismaClient();

// ToDo: Prismaの吐く型を使う
export interface register {
  name: string;
  avatar: string;
  sub: string;
  password: string;
}

export interface user {
  id: string;
  name: string;
  bot: boolean;
  avatarurl: string;
}

// GET
// /users/:userId
export async function get(id: string) {
  const res = await prisma.users
    .findUnique({
      where: {
        id: id,
      },
    })
    .catch((e) => logger.error(e));

  if (res == null) {
    return null;
  }

  return {
    id: res.id,
    name: res.name,
    bot: res.bot,
    avatarurl: res.avatarurl,
    password: res.password,
  };
}

// Auth0からのユーザーIDで検索する関数(廃止予定)
export async function getFromSub(sub: string) {
  const user = await prisma.users.findUnique({
    where: {
      sub,
    },
  });

  if (!user) {
    return null;
  } else {
    return user;
  }
}

export async function getAllUsers(): Promise<users[] | null> {
  const res = await prisma.users.findMany();
  if (res.length === 0) {
    return null;
  } else {
    return res;
  }
}

export async function createUserAccount(data: register) {
  return prisma.users.create({
    data: {
      name: data.name,
      bot: false,
      origin: "oshavery-app.net", // ToDo: オリジンの設定を変更できるようにする
      sub: data.sub,
      avatarurl: data.avatar,
      password: data.password,
    },
  });
}

export async function updateUser(id: string, name: string) {
  return prisma.users.update({
    where: { id },
    data: {
      name,
    },
  });
}
