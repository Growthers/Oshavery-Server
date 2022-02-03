import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  await prisma.users.upsert({
    where: {
      id: "00000000-0000-0000-0000-000000000000",
    },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000000",
      name: "SYSTEM ACCOUNT",
      bot: true,
      origin: "",
      avatarurl: "",
      password: "",
      sub: "oshavery|0",
    },
  });

  await prisma.users.upsert({
    where: {
      id: "11111111-1111-1111-1111-111111111111",
    },
    update: {},
    create: {
      id: "11111111-1111-1111-1111-111111111111",
      name: "TEST ACCOUNT",
      bot: true,
      origin: "",
      avatarurl: "",
      password: "",
      sub: "oshavery|1",
    },
  });

  const guild = await prisma.guilds.upsert({
    where: { id: "00000000-0000-0000-0000-000000000000" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000000",
      name: "Default",
      topic: "Default guild",
      icon: "",
    },
  });

  await prisma.guild_users_mappings.upsert({
    where: { id: "00000000-0000-0000-0000-000000000000" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000000",
      name: "SYSTEM ACCOUNT",
      users: { connect: { id: "00000000-0000-0000-0000-000000000000" } },
      guild: { connect: { id: guild.id } },
    },
  });

  const channels = await prisma.channels.upsert({
    where: { id: "00000000-0000-0000-0000-000000000000" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000000",
      name: "general",
      topic: "general",
      type: "HOME",
      latest_message_id: "",
      guilds: { connect: { id: guild.id } },
      position: 0,
    },
  });

  await prisma.messages.create({
    data: {
      ip: "::1",
      deleted: false,
      content: "チャンネルが作成されました ここが`general`の始まりです",
      guilds: { connect: { id: guild.id } },
      channels: { connect: { id: channels.id } },
    },
  });
  process.exit();
}

seed();
