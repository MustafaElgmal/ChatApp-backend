import { Request } from "express";

export interface UserType {
   id:number,
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RequestAuthType extends Request {
  user?: UserType;
}
