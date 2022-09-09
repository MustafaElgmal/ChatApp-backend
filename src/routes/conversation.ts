import { conversationVaildation} from "../utils/validations";
import { User } from "./../entities/user";
import { RequestAuthType } from "./../types";
import { Conversation } from "./../entities/conversation";
import { Router } from "express";
import { auth } from "../middlewares/auth";
import { In } from "typeorm";
import { getConversationImg, getConversationsImg } from "../utils/functions";

const router = Router();

router.post("/", auth, async (req: RequestAuthType, res) => {
  const { title, userIds } = req.body;
  const errors = await conversationVaildation(title, userIds);
  if (errors.length > 0) {
    return res.status(400).send(errors);
  }
  try {
    const user = req.user!;
    let users = await User.find({ where: { id: In(userIds) } });
    if (users.length === 0) {
      return res.status(404).send({ message: "User is not found!" });
    }
    users.push(user);
    const conversation = Conversation.create({
      title,
      users,
    });
    await conversation.save();
    const conversationAfterAddImgeUrl = getConversationImg(
      conversation,
      user
    );
    res.status(201).json({ conversation:conversationAfterAddImgeUrl});
  } catch (e) {
    res.status(500).json({ error: "Server error!" });
  }
});
router.get("/", auth, async (req: RequestAuthType, res) => {
  try {
    const user = req.user!;
    const { conversations } = (await User.findOne({
      where: { id: user.id },
      relations: { conversations: { users: true, messages: true } },
    }))!;
    const conversationsAfterAddImgeUrl = getConversationsImg(
      conversations,
      user
    );
    res.json({ conversations: conversationsAfterAddImgeUrl });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Server error!" });
  }
});

export default router;
