import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CasbinService } from './casbin.service';

@Injectable()
export class CasbinGuard implements CanActivate {
  constructor(@Inject('CasbinService') private casbinService: CasbinService) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // TODO check permission
    // this.casbinService.getEnforcer().enforce();
    return true;
  }
}
