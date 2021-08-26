const router_guild = require("express").Router();

router_guild.route("/:guildId")
  .get(() => {console.log("げっとうえー")})
  .patch(() => {console.log("ぱっちうえー")})

router_guild.route("/:guildId/roles")
  .get(() => {console.log("げっとうえー")})
  .post(() => {console.log("ぽすとうえー")})
  .patch(() => {console.log("ぱっちうえー")})
  .delete(() => {console.log("でりーとうえー")})

router_guild.route("/:guildId/members")
  .get(() => {console.log("げっとうえー")})

router_guild.route("/:guildId/members/:userId")
  .get(() => {console.log("げっとうえー")})
  .put(() => {console.log("ぷっとうえー")})
  .delete(() => {console.log("でりーとうえー")})

router_guild.route("/:guildId/invites")
  .get(() => {console.log("げっとうえー")})
  .post(() => {console.log("ぽすとうえー")})

router_guild.route("/:guildId/invites/:inviteId")
  .put(() => {console.log("ぷっとうえー")})
  .delete(() => {console.log("でりーとうえー")})

module.exports = router_guild;
