const router_message = require("express").Router();
import {getMessages, getOneMessage} from "../controllers/messages/getmessage";
import {createMessage} from "../controllers/messages/createmessage";
import {deleteMessage} from "../controllers/messages/deletemessage";
import {updateMessage} from "../controllers/messages/updatemessage";

router_message.route("/:channelId/messages")
  .get(getMessages)
  .post(createMessage);

router_message.route("/:channelId/messages/:messageId")
  .get(getOneMessage)
  .patch(updateMessage)
  .delete(deleteMessage)

module.exports = router_message;
