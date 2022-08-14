import { inject, injectable } from '@inversification/ioc';
import { InnerServiceOne } from './inner-service-one';
import { InnerServiceTwo } from './inner-service-two';

@injectable()
export class OuterService {
    @inject(InnerServiceOne.name) private innerServiceOne: InnerServiceOne;
    @inject(InnerServiceTwo.name) private innerServiceTwo: InnerServiceTwo;

    runOne(): void {
        this.innerServiceOne.doOne();
    }

    runTwo(): void {
        this.innerServiceTwo.doTwo();
    }
}
