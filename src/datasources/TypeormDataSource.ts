import {registerProvider} from "@tsed/di";
// import {createConnection} from "@tsed/typeorm";
import {DataSource} from "typeorm";
import {Logger} from "@tsed/logger";
import {getTypeOrmConfig} from "../config/dbConfig.js";

export const TYPEORM_DATA_SOURCE = Symbol.for("TypeormDataSource");
export const TypeormDataSource = new DataSource(getTypeOrmConfig());

registerProvider<DataSource>({
  provide: TypeormDataSource,
  type: "typeorm:datasource",
  deps: [Logger],
  async useAsyncFactory(logger: Logger) {
    await TypeormDataSource.initialize();

    logger.info("Connected with typeorm to database");

    return TypeormDataSource;
  },
  hooks: {
    $onDestroy(dataSource: DataSource) {
      return dataSource.isInitialized && dataSource.close();
    }
  }
});
