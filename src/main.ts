import express from "express";
const app = express();
const infoRouter = require("./routes/info");
const userRouter = require("./routes/user");
const guildRouter = require("./routes/guild");
const channelRouter = require("./routes/channel");
const messageRouter = require("./routes/message");

app.use("/", infoRouter);
app.use("/users", userRouter);
app.use("/guilds", guildRouter);
app.use("/", channelRouter);
app.use("/channels", messageRouter);

app.listen(3000);
