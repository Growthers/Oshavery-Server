import { PrismaClient } from "@prisma/client";
import chalk from "chalk";

const prisma = new PrismaClient();
const { GIT_COMMIT_HASH } = process.env;

async function init() {
  const Sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  console.log(chalk.yellow(`Oshavery (${GIT_COMMIT_HASH})`));
  console.log("Oshaveryの初期設定をします");
  console.log(
    chalk.red.bold.italic(
      "ギルド,ユーザー,メッセージのデータが*すべて*削除されます。5秒後に作業を開始します..."
    )
  );
  await Sleep(5000);
  console.log("DBを設定しています...");

  // process.stdout.write(chalk.cyan("テーブルを初期化しています..."));
  // if (process.env.OSHAVERY_MODE === "production") {
  //   process.stdout.write(chalk.cyan("プロダクションDBを初期化中..."));
  //   await exec("npx prisma db push", (e, o, re) => {
  //     if (o) {
  //       console.log(o);
  //     }
  //     if (e) {
  //       console.log(e);
  //     }
  //     if (re != null) {
  //       console.log(re);
  //     }
  //   });
  // } else {
  //   process.stdout.write(chalk.cyan("テスト用DBを初期化中..."));
  //   await exec(
  //     "npx prisma db push --schema ./prisma/test.schema.prisma",
  //     (e, o, re) => {
  //       if (o) {
  //         console.log(o);
  //       }
  //       if (e) {
  //         console.log(e);
  //       }
  //       if (re != null) {
  //         console.log(re);
  //       }
  //     }
  //   );
  // }
  // await Sleep(4000);
  // console.log(chalk.cyan("完了\n"));

  process.stdout.write(chalk.cyan("システムアカウントを作成しています..."));

  if ((await prisma.users.count()) === 2) {
    await prisma.users.delete({
      where: { id: "00000000-0000-0000-0000-000000000000" },
    });
    await prisma.users.delete({
      where: { id: "11111111-1111-1111-1111-111111111111" },
    });
  }

  await prisma.users.create({
    data: {
      id: "00000000-0000-0000-0000-000000000000",
      name: "SYSTEM ACCOUNT",
      bot: true,
      origin: "",
      avatarurl: "",
      password: "Oshavery",
      sub: "oshavery|0",
    },
  });

  console.log(chalk.cyan("完了"));

  process.stdout.write(chalk.cyan("テスト用アカウントを作成しています..."));

  await prisma.users.create({
    data: {
      id: "11111111-1111-1111-1111-111111111111",
      name: "TEST ACCOUNT",
      bot: true,
      origin: "",
      avatarurl: "",
      password: "Oshavery",
      sub: "oshavery|1",
    },
  });
  console.log(chalk.cyan("完了\n"));

  process.stdout.write(chalk.red("ギルドテーブルを初期化しています..."));
  await prisma.guilds.deleteMany({});
  console.log("完了\n");
  process.stdout.write(chalk.cyan("ギルドを作成しています..."));
  const guild = await prisma.guilds.create({
    data: {
      name: "Default",
      topic: "Default guild",
      icon: "",
    },
  });
  console.log(chalk.cyan("完了"));

  process.stdout.write(chalk.red("インスタンス情報を削除しています..."));
  await prisma.server_info.deleteMany({});
  console.log(chalk.cyan("完了"));
  process.stdout.write(
    chalk.red("ギルドとユーザーの関連付けを解除しています...")
  );
  await prisma.guild_users_mappings.deleteMany({});
  console.log("完了\n");
  process.stdout.write(
    chalk.cyan("ギルドにシステムアカウントを追加しています...")
  );
  await prisma.guild_users_mappings.create({
    data: {
      name: "SYSTEM ACCOUNT",
      users: { connect: { id: "00000000-0000-0000-0000-000000000000" } },
      guild: { connect: { id: guild.id } },
    },
  });
  console.log(chalk.cyan("完了\n"));

  process.stdout.write(chalk.red("メッセージテーブルを初期化しています..."));
  await prisma.messages.deleteMany();
  console.log("完了\n");
  process.stdout.write(chalk.red("チャンネルテーブルを初期化しています..."));
  await prisma.channels.deleteMany({});
  console.log("完了\n");
  process.stdout.write(chalk.cyan("チャンネルを作成しています..."));
  const channels = await prisma.channels.create({
    data: {
      name: "general",
      topic: "general",
      type: "text",
      latest_message_id: "",
      guilds: { connect: { id: guild.id } },
      position: 0,
    },
  });
  console.log(chalk.cyan("完了\n"));

  process.stdout.write(chalk.cyan("初期メッセージを生成しています..."));
  await prisma.messages.create({
    data: {
      ip: "::1",
      deleted: false,
      content: "チャンネルが作成されました ここが`general`の始まりです",
      guilds: { connect: { id: guild.id } },
      channels: { connect: { id: channels.id } },
    },
  });
  console.log(chalk.cyan("完了\n"));

  console.log(chalk.bgBlue.black("すべて完了しました!"));
  process.exit();
}

init();
