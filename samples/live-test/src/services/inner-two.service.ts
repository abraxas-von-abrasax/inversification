import { injectable } from '@inversification/ioc';
import { IInnerTwoService } from './interfaces';

@injectable()
export class InnerTwoService implements IInnerTwoService {
    runInnerTwo(): void {
        console.log('Inner Two');
    }
}
