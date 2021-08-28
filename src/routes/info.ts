import express from "express";
const router_info = express.Router();

import {infoController} from "../controllers/infocontroller"

router_info.route("/version")
  .get(infoController.getVersion)

router_info.route("/server-info")
  .get(infoController.getServerInfo)
  .post(infoController.createServerInfo)
  .patch(infoController.updateServerInfo)

module.exports = router_info;
