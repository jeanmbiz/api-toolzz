import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "./entities/user.entities";
import { Films } from "./entities/film.entities";
import { CreateTables1693055076420 } from "./migrations/1693055076420-createTables";

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
  migrations: [CreateTables1693055076420],
});

export default AppDataSource;
