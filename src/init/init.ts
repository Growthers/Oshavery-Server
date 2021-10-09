import {PrismaClient} from "@prisma/client";
import chalk from "chalk";
import {exec} from "child_process";

const prisma = new PrismaClient();
const GIT_COMMIT_HASH = process.env.GIT_COMMIT_HASH;

async function init(){
  const Sleep = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));
  let guild;
  let channels;
  console.log(chalk.yellow("Oshavery (" + GIT_COMMIT_HASH) + ")");
  console.log("Oshaveryの初期設定をします")
  console.log("DBを設定しています...")

  try {
    console.log(chalk.cyan("テーブルを初期化しています..."));
    await exec("npx prisma db push", (e,o,re) => {
      if (o) {
        console.log(o);
      } if (e){
        console.log(e);
      } if (re != null){
        console.log(re)
      }

    });
  } catch (e) {
    throw e;
  }
  await Sleep(4000);
  console.log(chalk.cyan("完了"));
  // return;

  // try {
  //   console.log(chalk.cyan("初期データを準備しています..."));
  //   await exec("npx prisma db seed");
  // } catch (e) {
  //   throw e;
  // }
  // console.log(chalk.cyan("完了"));

  try {
    console.log(chalk.cyan("システムアカウントを作成しています..."));
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
  console.log(chalk.cyan("完了"));


  try {
    console.log(chalk.cyan("ギルドを作成しています..."));
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
  console.log(chalk.cyan("完了"));


  try {
    console.log(chalk.cyan("ギルドにシステムアカウントを追加しています..."));
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
  console.log(chalk.cyan("完了"));

  try {
    console.log(chalk.cyan("チャンネルを作成しています..."));
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
  console.log(chalk.cyan("完了"));

  try {
    console.log(chalk.cyan("初期メッセージを生成しています..."));
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
  console.log(chalk.cyan("完了"));


  console.log(chalk.bgBlue.black("すべて完了しました!"));
  return;
}

init();

