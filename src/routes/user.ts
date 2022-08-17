import { RequestAuthType } from "./../types";
import { User } from "../entities/user";
import { generateAuth, userLoginValidation, userValidation } from "./../utils";
import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import { auth } from "../middlewares/auth";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const errors = await userValidation(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ messages: errors });
  }
  try {
    let { firstName, lastName, email, password } = req.body;
    password = await bcrypt.hash(password, 8);
    email = email.toLocaleLowerCase();
    const user = User.create({
      firstName,
      lastName,
      email,
      password,
    });
    await user.save();
    const token = generateAuth(user.email);
    res.status(201).json({token });
  } catch (e) {
    res.status(500).json({ error: "Server error!" });
  }
});

router.post("/signin", async (req, res) => {
 
});

router.get("/me", auth, async (req: RequestAuthType, res) => {
  res.json({ user: req.user });
});

router.delete("/me", auth, async (req: RequestAuthType, res) => {
  const user = req.user;
  try {
    await User.delete({ id: user?.id });
    res.json({ message: "User was Deleted!" });
  } catch (e) {
    res.status(500).json({ error: "Server error!" });
  }
});

export default router;
