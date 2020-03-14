import {Global, Module} from "@nestjs/common";
import {CasbinService} from "./casbin.service";

@Global()
@Module({
    imports: [],
    providers: [CasbinService],
    exports: [CasbinService]
})
export class CasbinModule {

}


