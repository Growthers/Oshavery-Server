import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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

  async getAllUsers(){
    return await prisma.users.findMany();
  }
}
