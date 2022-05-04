// @ts-ignore
import type { CeramicClient } from "@ceramicnetwork/http-client";
import { registerProvider } from "@tsed/di";
import { config } from "../config/index.js";

export const CERAMIC_HTTP_CLIENT = Symbol.for('ceramic:client');
export type CERAMIC_HTTP_CLIENT = CeramicClient;

registerProvider({
  provide: CERAMIC_HTTP_CLIENT,
  async useAsyncFactory() {
     try {
     console.log('===> import')
     const client = await import("@ceramicnetwork/http-client");
     console.log( "===", client);
     return new client.CeramicClient(config.CERAMIC_API_ENDPOINT)
     } catch(er) {
      console.log(er)
     }
   }
 })
