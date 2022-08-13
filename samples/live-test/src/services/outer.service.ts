import { inject, injectable } from '@inversification/ioc';
import { Services } from './services';
import { IInnerOneService, IInnerTwoService, IOuterService } from './interfaces';

@injectable()
export class OuterService implements IOuterService {
    @inject(Services.INNER_ONE_SERVICE) private innerOneService: IInnerOneService;
    @inject(Services.INNER_TWO_SERVICE) private innerTwoService: IInnerTwoService;

    runInnerOne(): void {
        this.innerOneService.runInnerOne();
    }

    runInnerTwo(): void {
        this.innerTwoService.runInnerTwo();
    }
}
