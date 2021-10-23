import { PrismaClient } from "@prisma/client";
import { Config, logger } from "../main.js";

const prisma = new PrismaClient();

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
  password: string | null;
  avatarurl: string;
  origin: string;
  sub: string;
}

export class UserNotFoundError extends Error {}

export const users = {
  // GET
  // /users/:userId
  async get(user_id: string) {
    let resp: user = {
      id: "",
      name: "",
      bot: true,
      avatarurl: "",
      password: "",
      origin: "",
      sub: "",
    };

    const res = await prisma.users
      .findUnique({
        where: {
          id: user_id,
        },
      })
      .catch((e) => logger.error(e));

    if (!res || !res.avatarurl) {
      return resp;
    }
    logger.debug(res, user_id);

    return (resp = {
      id: res.id,
      name: res.name,
      bot: res.bot,
      avatarurl: res.avatarurl,
      password: res.password,
      origin: res.origin,
      sub: res.sub,
    });
  },

  async getUserbyUsername(user_name: string) {
    logger.debug(user_name);
    let resp: user = {
      id: "",
      name: "",
      bot: true,
      avatarurl: "",
      password: "",
      origin: "",
      sub: "",
    };

    const res = await prisma.users
      .findFirst({
        where: {
          name: user_name,
          origin: Config.url,
        },
      })
      .catch((e) => logger.error(e));

    logger.debug(res);
    if (!res || !res.avatarurl) {
      return resp;
    }

    return (resp = {
      id: res.id,
      name: res.name,
      bot: res.bot,
      avatarurl: res.avatarurl,
      password: res.password,
      origin: res.origin,
      sub: res.sub,
    });
  },

  // グーロバルなユーザーIDで検索する関数
  async getFromSub(sub: string) {
    const user = await prisma.users.findUnique({
      where: {
        sub,
      },
    });

    if (!user) {
      throw new UserNotFoundError();
    } else {
      return user;
    }
  },

  async getAllUsers() {
    return prisma.users.findMany();
  },

  async createUserAccount(data: register) {
    return prisma.users.create({
      data: {
        name: data.name,
        bot: false,
        origin: Config.url,
        sub: data.sub,
        public_key: "", // ToDo: ユーザー用秘密鍵/公開鍵を発行する処理を作る
        password: data.password,
        avatarurl: data.avatar,
      },
    });
  },

  async updateUser(id: string, name: string) {
    return prisma.users.update({
      where: { id },
      data: {
        name,
      },
    });
  },
};
