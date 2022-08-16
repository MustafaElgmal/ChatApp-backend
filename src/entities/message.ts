import { MainEntityType } from './../types';

import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { Conversation } from "./conversation";
import { User } from "./user";

@Entity()
export class Message extends MainEntityType {


  @Column()
  body: string;


  @ManyToOne(() => User, user => user.messages, { nullable: false, })
  user: User;

  @ManyToOne(() => Conversation, conversation => conversation.messages, { nullable: false, })
  conversation: Conversation;
}
