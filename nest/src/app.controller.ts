import { Controller, Get } from '@nestjs/common';
import { CasbinService } from './casbin/casbin.service';

@Controller()
export class AppController {
  constructor(private readonly casbinService: CasbinService) {
  }

  @Get()
  async getHello() {
    return {
      policy: await this.casbinService.getPolicy(),
      groupingPolicy: await this.casbinService.getGroupingPolicy(),
    };
  }

}
