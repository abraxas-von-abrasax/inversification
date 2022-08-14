import { injectable } from '@inversification/ioc';

@injectable()
export class InnerServiceOne {
    doOne(): void {
        console.log('Inner One');
    }
}
