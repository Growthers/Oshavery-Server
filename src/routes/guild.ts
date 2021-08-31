import express from "express";
const router_guild = express.Router();

import {guildController} from "../controllers/guildcontroller";

router_guild.route("/")
  .post(guildController.createGuild);

router_guild.route("/:guildId")
  .get(guildController.getGuild)
  .patch(guildController.updateGuild)
  .delete(guildController.deleteGuild);

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
