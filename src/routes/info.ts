import express from "express";
const router_info = express.Router();

import {updateServerInfo} from "../controllers/info/updateserverinfo";
import {getVersion} from "../controllers/info/getversion";
import {getServerInfo} from "../controllers/info/getserverinfo";
import {createServerInfo} from "../controllers/info/createserverinfo";

router_info.route("/version")
  .get(getVersion);

router_info.route("/server-info")
  .get(getServerInfo)
  .post(createServerInfo)
  .patch(updateServerInfo);

module.exports = router_info;
