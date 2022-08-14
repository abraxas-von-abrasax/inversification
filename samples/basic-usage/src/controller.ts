import { inject } from '@inversification/ioc';
import { OuterService } from './services/outer-service';

export class Controller {
    @inject(OuterService.name) private service: OuterService;

    run(): void {
        this.service.runOne();
        this.service.runTwo();
    }
}
