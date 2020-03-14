import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CasbinModule } from './casbin/casbin.module';
import { APP_GUARD } from '@nestjs/core';
import { CasbinGuard } from './casbin/casbin.guard';

@Module({
  imports: [CasbinModule], // setup casbin module
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD, // setup casbin guard
    useClass: CasbinGuard,
  }],
})
export class AppModule {
}
