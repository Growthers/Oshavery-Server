import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export interface register {
  name: string;
  avatar: string;
  sub: string;
}

export const users = {
  //GET
  // /users/:userId
  async get(user_id: string) {
    return await prisma.users.findUnique({
      where: {
        id: user_id
      }
    });
  },

  async getFromSub(sub: string) {
    return await prisma.users.findUnique({
      where: {
        sub: sub
      }
    })
  },

  async getAllUsers() {
    return await prisma.users.findMany();
  },

  async createUserAccount(data: register) {
    return await prisma.users.create({
      data: {
        name: data.name,
        bot: false,
        origin: "oshavery-app.net",
        sub: data.sub,
        avatarurl: data.avatar
      }
    });

  },

  async updateUser(id: string, name:string) {
    return await prisma.users.update({
      where: {id: id},
      data:{
        name: name
      }
    })
  }
}
