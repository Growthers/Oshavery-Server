const router_message = require("express").Router();
import { messageController } from "../controllers/messagecontroller"


router_message.route("/:channelId/messages")
  .get(messageController.getMessages)
  .post(messageController.createMessage);

router_message.route("/:channelId/messages/:messageId")
  .get(messageController.getOneMessage)
  .patch(messageController.updateMessage)
  .delete(messageController.deleteMessage)

module.exports = router_message;
