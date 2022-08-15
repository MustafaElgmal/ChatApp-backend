import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Message } from "./message";

@Entity()
export class Conversation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chatName: string;

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}
