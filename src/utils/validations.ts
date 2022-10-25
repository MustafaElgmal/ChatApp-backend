import { User } from "../entities/user";
import { CreateUserType } from "../types";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const userValidation = async (user: CreateUserType) => {
  const errors = [];
  if (!user.firstName) {
    errors.push({ message: "FirstName is required!" });
  }
  if (!user.lastName) {
    errors.push({ message: "LastName is required!" });
  }
  if (!user.email) {
    errors.push({ message: "Email is required!" });
  } else {
    if (!validator.isEmail(user.email)) {
      errors.push({ message: "Email is not vaild!" });
    }
    const emailFind = await User.findOne({
      where: { email: user.email.toLocaleLowerCase() },
    });
    if (emailFind) {
      errors.push({ message: "Email is already exists!" });
    }
  }

  if (!user.password) {
    errors.push({ message: "Password is required!" });
  } else {
    if (!validator.isStrongPassword(user.password)) {
      errors.push({
        message:
          "Password should be {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}!",
      });
    }
  }

  return errors;
};
export const userLoginValidation = async (user: {
  email: string;
  password: string;
}) => {
  let errors = [];
  if (!user.password) {
    errors.push({ message: "Password is required!" });
  }
  if (!user.email) {
    errors.push({ message: "Email is required!" });
  }
  const userFind = await User.findOne({
    where: { email: user.email.toLocaleLowerCase() },
  });
  if (!userFind) {
    errors.push({ message: "Email is not vaild!" });
    return errors;
  }

  const vaild = await bcrypt.compare(user.password, userFind.password);
  if (!vaild) {
    errors.push({ message: "Password is wrong!" });
  }

  return errors;
};

export const conversationVaildation = async (
  title: string,
  userIds: number[]
) => {
  let errors = [];

  if (!title) {
    errors.push({ message: "Title is required!" });
  }
  if (!userIds || userIds.length === 0) {
    errors.push({ message: "MemberIds is required" });
  }
  return errors;
};
export const messageValidation = async (body: string, id: string) => {
  const errors = [];
  if (!body) {
    errors.push({ message: "Body is required!" });
  }
  if (!id) {
    errors.push({ message: "ConversationId is required as params!" });
  }
  return errors;
};

export const generateAuth = (email: string) => {
  const token = jwt.sign({ email }, process.env.SECRETKEY!, {
    expiresIn: "1d",
  });
  return token;
};


