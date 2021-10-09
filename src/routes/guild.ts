import express from "express";
const router_guild = express.Router();

import { memberList } from "../controllers/guilds/memberlist";
import {createGuild} from "../controllers/guilds/createguild";
import {getGuild} from "../controllers/guilds/getguild";
import {updateGuild} from "../controllers/guilds/updateguild";
import {deleteGuild} from "../controllers/guilds/deleteguild";

router_guild.route("/")
  .post(createGuild);

router_guild.route("/:guildId")
  .get(getGuild)
  .patch(updateGuild)
  .delete(deleteGuild);

// router_guild.route("/:guildId/roles")
//   .get(() => {console.log("げっとうえー")})
//   .post(() => {console.log("ぽすとうえー")})
//   .patch(() => {console.log("ぱっちうえー")})
//   .delete(() => {console.log("でりーとうえー")})

router_guild.route("/:guildId/members")
  .get(memberList)

// router_guild.route("/:guildId/members/:userId")
//   .get(() => {console.log("げっとうえー")})
//   .put(() => {console.log("ぷっとうえー")})
//   .delete(() => {console.log("でりーとうえー")})
//
// router_guild.route("/:guildId/invites")
//   .get(() => {console.log("げっとうえー")})
//   .post(() => {console.log("ぽすとうえー")})
//
// router_guild.route("/:guildId/invites/:inviteId")
//   .put(() => {console.log("ぷっとうえー")})
//   .delete(() => {console.log("でりーとうえー")})

module.exports = router_guild;
