import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { json } from "express";
import { urlencoded } from "express";
import { config } from "dotenv";
import { AppDataSource } from "./db/data-source";




const server = express();

config();
server.use(cors());
server.use(morgan("dev"));
server.use(helmet());
server.use(json());
server.use(urlencoded({ extended: false }));



server.listen(process.env.PORT, async() => {
    await AppDataSource.initialize()
  console.log(`listening on port ${process.env.PORT}`);
});
