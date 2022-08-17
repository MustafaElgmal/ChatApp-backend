import { DivideMessagesIntoTwoCategory } from "./../utils";
import { Conversation } from "./../entities/conversation";
import { Message } from "./../entities/message";
import { RequestAuthType, RequestMessage } from "./../types";
import { Router } from "express";
import { auth } from "../middlewares/auth";
import { messageValidation } from "../utils";
const router = Router();

router.post("/:id", auth, async (req: RequestAuthType, res) => {
  const { body } = req.body;
  const { id } = req.params;
  const errors = await messageValidation(body, id);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const conversation = await Conversation.findOne({ where: { id: +id } });
    if (!conversation) {
      return res.status(404).json({ message: "Conversation is not found!" });
    }
    const messgae = Message.create({
      body,
      user: req.user,
      conversation,
    });
    await messgae.save();
    res.status(201).json({ messgae });
  } catch (e) {
    res.status(500).json({ error: "Server error!" });
  }
});

router.get("/:id", auth, async (req: RequestMessage, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ message: "ConversationId is required as params!" });
  }
  try {
    const user = req.user!;
    const messages = await Message.find({
      where: { conversation: { id: +id } },
      relations: { user: true },
    });
    const newmessages=DivideMessagesIntoTwoCategory(messages,user.id)
    res.json({messages:newmessages});
  } catch (e) {
    res.status(500).json({ error: "Server error!" });
  }
});

export default router;
