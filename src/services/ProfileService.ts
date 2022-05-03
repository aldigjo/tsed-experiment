import { Inject, Injectable, LazyInject } from "@tsed/di";
import { config } from "../config";
import { ethAddressRegex, tweetUrlRegex } from "../common/util";
import { TYPEORM_DATA_SOURCE } from "../datasources/TypeormDataSource";
import { CERAMIC_HTTP_CLIENT } from "../providers/CeramicClient";
const ACOUNTID_SUFFIX = "@eip155:1";

@Injectable()
export class ProfileService {

  @Inject(CERAMIC_HTTP_CLIENT)
  protected ceramicClient: CERAMIC_HTTP_CLIENT;

  constructor() {}

  $afterRoutesInit() { }

  async getProfile(did: string): Promise<string> {
    // const CeramicClient = await import("@ceramicnetwork/http-client")
    // const ceramicClient = new CeramicClient.CeramicClient(config.CERAMIC_API_ENDPOINT);
    const TileDocument = await import("@ceramicnetwork/stream-tile");
    const result = await TileDocument.default.TileDocument.deterministic(
      this.ceramicClient, 
      {
        controllers: [did],
        family: 'doc family',
        tags: ['tag1']
      }) as any;
    console.log(result.content)
    return result.content
  }

  async getDidFromAddress(address: string): Promise<string> {
    if(!address.match(ethAddressRegex)) {
      throw Error("Incorrect Address format")
    }
    // const CeramicClient = await import("@ceramicnetwork/http-client")
    // const ceramicClient = new CeramicClient.CeramicClient(config.CERAMIC_API_ENDPOINT);
    const Caip10Link = await import("@ceramicnetwork/stream-caip10-link");
    const link = await Caip10Link.default.Caip10Link.fromAccount(
      this.ceramicClient,
      address + ACOUNTID_SUFFIX,
    )
    // The `did` property of the loaded link will contain the DID string value if set
    if(!link.did || link.did === null) {
      throw Error("DID NOT SET");
    }
    return link.did
  }
  
}