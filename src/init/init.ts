import {PrismaClient} from "@prisma/client";
import chalk from "chalk";
import {exec} from "child_process";

const prisma = new PrismaClient();
const GIT_COMMIT_HASH = process.env.GIT_COMMIT_HASH;

async function init(){
  const Sleep = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));
  let guild;
  let channels;
  console.log(chalk.yellow("Oshavery (" + GIT_COMMIT_HASH + ")"));
  console.log("Oshaveryの初期設定をします")
  console.log(chalk.red.bold.italic("ギルド,ユーザー,メッセージのデータが*すべて*削除されます。5秒後に作業を開始します..."))
  await Sleep(5000);
  console.log("DBを設定しています...");

  try {
    process.stdout.write(chalk.cyan("テーブルを初期化しています..."));
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
  console.log(chalk.cyan("完了\n"));

  try {
    process.stdout.write(chalk.cyan("システムアカウントを作成しています..."));

    try {
      const r = await prisma.users.delete({
        where: {id: "00000000-0000-0000-0000-000000000000"}
      })
    }
    catch (e){}

    await prisma.users.create({
      data: {
        id: "00000000-0000-0000-0000-000000000000",
        name: "SYSTEM ACCOUNT",
        bot: true,
        origin: "",
        avatarurl: "",
        sub: "oshavery|0"
      }
    });
  } catch (e){
    throw e;
  }
  console.log(chalk.cyan("完了"));

  try {
    process.stdout.write(chalk.cyan("テスト用アカウントを作成しています..."));
    try {
      const r = await prisma.users.delete({
        where: {id: "11111111-1111-1111-1111-111111111111"}
      })
    }catch {}



    await prisma.users.create({
      data: {
        id: "11111111-1111-1111-1111-111111111111",
        name: "TEST ACCOUNT",
        bot: true,
        origin: "",
        avatarurl: "",
        sub: "oshavery|1"
      }
    });
  } catch (e){
    throw e;
  }
  console.log(chalk.cyan("完了\n"));


  try {
    process.stdout.write(chalk.red("ギルドテーブルを初期化しています..."));
    await prisma.guilds.deleteMany({})
    console.log("完了\n")
    process.stdout.write(chalk.cyan("ギルドを作成しています..."));
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
    process.stdout.write(chalk.red("ギルドとユーザーの関連付けを解除しています..."));
    await prisma.guild_users_mappings.deleteMany({});
    console.log("完了\n");
    process.stdout.write(chalk.cyan("ギルドにシステムアカウントを追加しています..."));
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
  console.log(chalk.cyan("完了\n"));

  try {
    process.stdout.write(chalk.red("メッセージテーブルを初期化しています..."));
    await prisma.messages.deleteMany();
    console.log("完了\n")
    process.stdout.write(chalk.red("チャンネルテーブルを初期化しています..."));
    await prisma.channels.deleteMany({});
    console.log("完了\n")
    process.stdout.write(chalk.cyan("チャンネルを作成しています..."));
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
  console.log(chalk.cyan("完了\n"));

  try {
    process.stdout.write(chalk.cyan("初期メッセージを生成しています..."));
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
  console.log(chalk.cyan("完了\n"));


  console.log(chalk.bgBlue.black("すべて完了しました!"));
  process.exit();
  return;
}

init();

