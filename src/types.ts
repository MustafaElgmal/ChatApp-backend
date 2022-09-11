import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './entities/user';
import { Request } from "express";
import { Conversation } from './entities/conversation';
export interface RequestAuthType extends Request {
  user?: User;
}

export interface CreateUserType{
  firstName:string,
  lastName:string,
  email:string,
  password:string,
  ImgUrl:string
}


export class MainEntityType extends BaseEntity{
  @PrimaryGeneratedColumn()
  id:number
  @CreateDateColumn({type:'timestamptz'})
  createdAt:Date
  @UpdateDateColumn({type:'timestamptz',onUpdate:'CURRENT_TIMESTAMP(6)'})
  updatedAt:Date
}
