import express from "express";
const app: express.Express = express();
app.use(express.json());
const infoRouter = require("./routes/info");
const userRouter = require("./routes/user");
const guildRouter = require("./routes/guild");
const channelRouter = require("./routes/channel");
const messageRouter = require("./routes/message");
const mediaRouter = require("./routes/media");


app.use("/", infoRouter);
app.use("/users", userRouter);
app.use("/guilds", guildRouter);
app.use("/", channelRouter);
app.use("/channels", messageRouter);
app.use("/files", mediaRouter);

app.listen(3000,() => {
  const black   = '\u001b[30m';
  const red     = '\u001b[31m';
  const green   = '\u001b[32m';
  const yellow  = '\u001b[33m';
  const blue    = '\u001b[34m';
  const magenta = '\u001b[35m';
  const cyan    = '\u001b[36m';
  const white   = '\u001b[37m';
  const reset   = '\u001b[0m';
  console.log(`
  ${red}░█████╗${reset}${green}░░██████╗${reset}${yellow}██╗░░██╗${reset}${blue}░█████╗${reset}${magenta}░██╗░░░██╗${reset}${cyan}███████╗${reset}${black}██████${reset}${white}╗░██╗░░░██╗
  ${red}██╔══██╗${reset}${green}██╔════╝${reset}${yellow}██║░░██║${reset}${blue}██╔══██╗${reset}${magenta}██║░░░██║${reset}${cyan}██╔════╝${reset}${black}██${white}╔══${black}██${white}╗╚██╗░██╔╝${reset}
  ${red}██║░░██║${reset}${green}╚█████╗${reset}${yellow}░███████║${reset}${blue}███████║${reset}${magenta}╚██╗░██╔╝${reset}${cyan}█████╗${reset}${black}░░██████${reset}${white}╔╝░╚████╔╝░${reset}
  ${red}██║░░██║${reset}${green}░╚═══██╗${reset}${yellow}██╔══██║${reset}${blue}██╔══██║${reset}${magenta}░╚████╔╝${reset}${cyan}░██╔══╝░░${reset}${black}██${white}╔══${black}██${white}╗░░╚██╔╝░░${reset}
  ${red}╚█████╔╝${reset}${green}██████╔╝${reset}${yellow}██║░░██║${reset}${blue}██║░░██║${reset}${magenta}░░╚██╔╝░░${reset}${cyan}███████╗${reset}${black}██${white}║${black}░░██${white}║░░░██║░░░${reset}
  ${red}░╚════╝░${reset}${green}╚═════╝░${reset}${yellow}╚═╝░░╚═╝${reset}${blue}╚═╝░░╚═╝${reset}${magenta}░░░╚═╝░░░${reset}${cyan}╚══════╝${reset}${white}╚═╝${black}░░${white}╚═╝░░░╚═╝░░░${reset}

  Oshavery(alpha)
  |c| 2021 Oshavery Developers

  [info] listening at http://localhost:3000
  `)
});
