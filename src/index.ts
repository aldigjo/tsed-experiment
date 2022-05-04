import {$log} from "@tsed/common";
import {PlatformExpress} from "@tsed/platform-express";
import {importProviders} from "@tsed/components-scan";
import {Server} from "./Server.js";

async function bootstrap() {
  try {
    $log.info("Scan providers");
    const settings = await importProviders({
      mount: {
        "/rest": [
          "**/controllers/**/*.ts"
        ]
      }
    });

    $log.info("Create server");
    const platform = await PlatformExpress.bootstrap(Server, settings);
    await platform.listen();

    process.on("SIGINT", () => {
      platform.stop();
    });
  } catch (error) {
    $log.error({event: "SERVER_BOOTSTRAP_ERROR", error});
  }
}

bootstrap();
