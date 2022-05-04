import {Controller} from "@tsed/di";
import {Get} from "@tsed/schema";
import {PathParams} from "@tsed/common";
import {ProfileService} from "../../services/ProfileService.js";

@Controller("/profile")
// @UseAuth(ApiKeyAuthMiddleware)
export class ProfileController {
  // ceramic: CeramicClient;

  constructor(private readonly profileService: ProfileService) {
    // this.ceramic = new CeramicClient(config.CERAMIC_API_ENDPOINT)
  }

  @Get("/:did")
  async getProfileByDid(@PathParams("did") did: string): Promise<string> {
    return await this.profileService.getProfile(did);
  }

  @Get("/address/:address")
  async getProfileByAddress(@PathParams("address") address: string): Promise<string> {
    const did = await this.profileService.getDidFromAddress(address);
    return await this.profileService.getProfile(did);
  }
}
