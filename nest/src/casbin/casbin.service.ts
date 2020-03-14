import { Injectable } from '@nestjs/common';
import { newSyncedEnforcer, SyncedEnforcer } from 'casbin';
import * as path from 'path';

@Injectable()
export class CasbinService {
  private enforcer: SyncedEnforcer;

  constructor() {
    const modelPath = path.join(__dirname, 'rbac.conf');
    const policyPath = path.join(__dirname, 'policy.csv');
    newSyncedEnforcer(modelPath, policyPath).then(e => this.enforcer = e).catch((e) => {
      console.error(e);
      process.exit(1);
    });
  }

  getEnforcer() {
    return this.enforcer;
  }

  getPolicy() {
    return this.enforcer.getPolicy();
  }

  getGroupingPolicy() {
    return this.enforcer.getGroupingPolicy();
  }
}
