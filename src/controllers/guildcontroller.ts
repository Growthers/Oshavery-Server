import express from "express";
import { guild } from "../models/guild";

export const guildController = {
  async getGuild(req: express.Request, res: express.Response) {
    console.log(req.path);

    await guild.get(req.params.guildId)
      .then((gld) => {
        console.log(gld);
        res.json(gld);
        return;
      })
      .catch((e) => {
        console.error(e);
        res.status(404).end();
        return;
      })
      return;
  },

  async createGuild(req: express.Request, res: express.Response) {
    const body = req.body;

    console.log(req.path);

    await guild.create(body)
      .then((gld) => {
        console.log(gld);
        res.status(201).json(gld);
        return;
      })
      .catch((e) => {
        console.error(e);
        res.status(400).send("Invaild reqest");
        return;
      });
      return;
  },

  async updateGuild(req: express.Request, res: express.Response) {
    const guild_id = req.params.guildId;
    const body = req.body;

    console.log(req.path);

    await guild.update(guild_id, body)
      .then(() => {
        res.status(204).end();
        return;
      })
      .catch((e) => {
        console.error(e);
        res.status(400).send("Invalid reqest");
        return;
      });
      return;
  },

  async deleteGuild(req: express.Request, res: express.Response) {
    console.log(req.path);
    await guild.delete(req.params.guildId)
      .then(() => {
        res.status(204).end();
        return;
      })
      .catch((e) => {
        console.error(e);
        res.status(400).send("Invalid reqest");
        return;
      });
      return;
  }
}
