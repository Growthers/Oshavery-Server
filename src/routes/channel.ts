const router_channel = require("express").Router();

router_channel.route("/guilds/:guildId/channels")
  .get(() => {console.log("げっとうえー")})
  .post(() => {console.log("ぽすとうえー")})
  .patch(() => {console.log("ぱっちうえー")})

router_channel.route("/channels/:channelId/permissions")
  .get(() => {console.log("げっとうえー")})
  .post(() => {console.log("ぽすとうえー")})
  .put(() => {console.log("ぷっとうえー")})
  .delete(() => {console.log("でりーとうえー")})

module.exports = router_channel;
