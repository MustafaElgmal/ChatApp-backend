
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { Conversation } from "./conversation";
import { User } from "./user";

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @ManyToOne(() => User, user => user.messages, { nullable: false, })
  user: User;

  @ManyToOne(() => Conversation, conversation => conversation.messages, { nullable: false, })
  conversation: Conversation;
}
