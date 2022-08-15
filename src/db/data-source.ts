import { Conversation } from './../entities/conversation';
import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entities/user"
import { config } from "dotenv";
import { Message } from "../entities/message";


config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT!,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [User, Message, Conversation],
    migrations: [],
    subscribers: [],
})
