import express from "express";
import { guild } from "../models/guild";
import { logger } from "../main";
import { medias } from "../models/media";
import { users,user } from "../models/user";

export interface guild {
  id: string,
  name: string,
  topic: string,
  icon: string
  created_at: Date | null,
  updated_at?: Date ,
  deleted_at?: Date
}

export const guildController = {
  async getGuild(req: express.Request, res: express.Response) {
    let resp:guild = {
      id: "",
      name: "",
      topic: "",
      icon: "",
      created_at: null
    };

    const g = await guild.get(req.params.guildId)
      .then((gld) => {
        return gld;
      })
      .catch((e) => {
        logger.error(e);
        res.status(404).send("Not found")
        return;
      });

    if (!g){return res.status(500)}

    const icon = await medias.searchGuildIcon(g?.id || "")
    if (icon) {
      resp = {
        id: g.id,
        name: g.name,
        icon: icon.fullpath,
        topic: g.topic || "",
        created_at: g.created_at
      }
    }else {
      resp = {
        id: g.id,
        name: g.name,
        icon: g.icon,
        topic: g.topic || "",
        created_at: g.created_at
      }
    }

    return res.json(resp);
  },

  async createGuild(req: express.Request, res: express.Response) {
    const body = req.body;

    await guild.create(body)
      .then((gld) => {
        logger.info("Guild created")
        res.status(201).json(gld);
        return;
      })
      .catch((e) => {
        logger.error(e);
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
        logger.error(e);
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
        logger.info("Guild Deleted")
        return;
      })
      .catch((e) => {
        logger.error(e);
        res.status(400).send("Invalid reqest");
        return;
      });
    return;
  },

  async memberList(req: express.Request, res:express.Response){
    const re:Array<any> = await guild.searchJoinedGuildMembers(req.params.guildId).then((r) => {return r;}).catch((e)=>{logger.error(e);return [];});
    const resp = Array<any>();

    for (let i=0; i<re.length; i++){
      resp[i] = await users.get(re[i].usersId)
        .then((r) => {return r;})
        .catch((e) => {logger.error(e); return;});
    }

    return res.status(200).json(resp);
  }
}
