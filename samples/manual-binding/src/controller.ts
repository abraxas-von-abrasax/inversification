import { inject, injectable } from '@inversification/ioc';
import { OuterService } from './services/outer-service';

@injectable()
export class Controller {
    @inject(OuterService.name) private outerService: OuterService;

    run(): void {
        this.outerService.doOne();
        this.outerService.doTwo();
    }
}
