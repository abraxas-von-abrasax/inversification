import { inject } from '@inversification/ioc';
import { Services } from './services/services';
import { IOuterService } from './services/interfaces';

export class Controller {
    @inject(Services.OUTER_SERVICE) private service: IOuterService;

    run(): void {
        this.service.runInnerOne();
        this.service.runInnerTwo();
    }
}
