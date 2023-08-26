import "reflect-metadata";
import "dotenv/config";
import path from "path";
import { DataSource } from "typeorm";
import { User } from "../entities/user.entities";
import { Films } from "../entities/film.entities";
import { CreateTables1693006420064 } from "./migrations/1693006420064-createTables";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PGHOST,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT),
  database: process.env.DB,
  synchronize: false,
  logging: true,
  entities: [User, Films],
  migrations: [CreateTables1693006420064],
});

export default AppDataSource;
