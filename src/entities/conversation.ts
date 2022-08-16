import { MainEntityType } from './../types';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { Message } from "./message";
import { User } from "./user";

@Entity()
export class Conversation extends MainEntityType {
  @Column()
  title:string

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];

  @ManyToMany(() => User, user=> user.conversations,{nullable:false})
  users:User[]

}
