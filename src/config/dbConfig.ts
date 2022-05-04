import {DataSourceOptions} from "typeorm";
import {v4} from "uuid";
import {isProduction} from "./envs/index.js";

export const ORM_NAME = isProduction ? "disco-orm" : "disco-test-orm";

export const getTypeOrmConfig = (): DataSourceOptions => {
  return isProduction ? getProdConfig() : getTestConfig()
}

export const getTestConfig = (): DataSourceOptions => {
  const dbFilePath = `tmp/dbTest/disco-backend-${v4()}.sqlite`
  // const exitHandler = () => fs.unlinkSync(dbFilePath);
  // process.on("exit", exitHandler);
  // process.on("SIGINT", exitHandler);
  // process.on("SIGUSR1", exitHandler);
  // process.on("SIGUSR2", exitHandler);
  // process.on("uncaughtException", exitHandler);

  return {
    name: ORM_NAME,
    type: "sqlite",
    database: dbFilePath,
    synchronize: true,
    migrationsRun: false,
    entities: [`${__dirname}/../entity/*{.ts,.js}`],
    migrations: [`${__dirname}/../migrations/*{.ts,.js}`],
    subscribers: [`${__dirname}/../subscriber/*{.ts,.js}`]
  }

}

export const getProdConfig = (): DataSourceOptions => {
  return {
    name: ORM_NAME,
    type: "postgres",
    synchronize: false,
    dropSchema: false,
    migrationsRun: true,
    entities: [`${__dirname}/../entity/*{.ts,.js}`],
    migrations: [`${__dirname}/../migrations/*{.ts,.js}`],
    url: process.env.DB_URL
  }
}
