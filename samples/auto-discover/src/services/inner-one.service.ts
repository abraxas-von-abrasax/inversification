import { injectable } from '@inversification/ioc';
import { IInnerOneService } from './interfaces';

@injectable()
export class InnerOneService implements IInnerOneService {
    runInnerOne(): void {
        console.log('Inner One');
    }
}
