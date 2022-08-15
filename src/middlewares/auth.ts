import { RequestAuthType } from "./../types";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities/user";

export const auth = async (
  req: RequestAuthType,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "Please Authenticate!" });
  }
  try {
    const { email } = jwt.verify(authorization!, process.env.SECRETKEY!) as {
      email: string;
    };
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(401).send({ error: "Please vaild Authenticate !" });
    }
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please vaild Authenticate !" });
  }
};
