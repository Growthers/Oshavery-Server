import {PrismaClient} from "@prisma/client";
import chalk from "chalk";
import {exec} from "child_process";

const prisma = new PrismaClient();
const GIT_COMMIT_HASH = process.env.GIT_COMMIT_HASH;

async function init(){
  let guild;
  let channels;
  console.log(chalk.yellow("Oshavery (" + GIT_COMMIT_HASH) + ")");
  console.log("Oshaveryの初期設定をします")
  console.log("DBを設定しています...")

  try {
    await exec("npx prisma db seed");
  } catch (e) {
    throw e;
  }

  try {
    await prisma.users.create({
      data: {
        id: "00000000-0000-0000-0000-000000000000",
        name: "SYSTEM ACCOUNT",
        bot: true,
        origin: "",
        avatarurl: "",
        sub: ""
      }
    });
  } catch (e){
    throw e;
  }



  try {
    guild = await prisma.guilds.create({
      data:{
        name: "Default",
        topic: "Default guild",
        icon: ""
      }
    });
  } catch (e) {
    throw e;

  }


  try {
    await prisma.guild_users_mappings.create({
      data:{
        name: "SYSTEM ACCOUNT",
        users: {connect: {id: "00000000-0000-0000-0000-000000000000"}},
        guild: {connect: {id: guild.id}}
      }
    });
  } catch (e) {
    throw e;
  }

  try {
    channels = await prisma.channels.create({
      data: {
        name: "general",
        topic: "general",
        type: "text",
        latest_message_id: "",
        guilds: {connect: {id: guild.id}},
        position: 0
      }
    });
  } catch (e) {
    throw e;
  }

  try {
    await prisma.messages.create({
      data: {
        ip: "::1",
        deleted: false,
        content: "チャンネルが作成されました ここが`general`の始まりです",
        guilds: {connect: {id: guild.id}},
        channels: {connect: {id: channels.id}}
      }
    })
  } catch (e) {
    throw e;
  }


  console.log(chalk.blue("完了しました"))
}

init();
