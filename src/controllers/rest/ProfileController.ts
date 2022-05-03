import {Controller} from "@tsed/di";
import {Get, Post} from "@tsed/schema";
// import { CeramicClient } from '@ceramicnetwork/http-client'
import { BodyParams, PathParams, UseAuth } from "@tsed/common";
import { config } from "../../config";
import { ProfileService } from "../../services/ProfileService";
// import { ApiKeyAuthMiddleware } from "../middleware/ApiKeyAuth";
// import {Use, UseBefore, UseBeforeEach} from "@tsed/platform-middlewares";

@Controller("/profile")
// @UseAuth(ApiKeyAuthMiddleware)
export class ProfileController {
  // ceramic: CeramicClient;

  constructor(private readonly profileService: ProfileService) {
    // this.ceramic = new CeramicClient(config.CERAMIC_API_ENDPOINT)
  }

  @Get("/:did")
  async getProfileByDid(@PathParams("did") did: string): Promise<string> {
    const result = await this.profileService.getProfile(did);
    return result
  }

  @Get("/address/:address")
  async getProfileByAddress(@PathParams("address") address: string): Promise<string> {
    const did = await this.profileService.getDidFromAddress(address);
    const result = await this.profileService.getProfile(did);
    return result;
  }
}
