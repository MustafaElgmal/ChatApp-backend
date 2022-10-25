import { BaseEntity, CreateDateColumn,PrimaryGeneratedColumn } from 'typeorm';
import { User } from './entities/user';
import { Request } from "express";
export interface RequestAuthType extends Request {
  user?: User;
  file?:any
}

export interface CreateUserType{
  firstName:string,
  lastName:string,
  email:string,
  password:string
}


export class MainEntityType extends BaseEntity{
  @PrimaryGeneratedColumn()
  id:number
  @CreateDateColumn({type:'timestamptz'})
  createdAt:Date
  @CreateDateColumn({type:'timestamptz',onUpdate:'CURRENT_TIMESTAMP(6)'})
  updatedAt:Date
}
