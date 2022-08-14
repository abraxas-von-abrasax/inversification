import { injectable } from '@inversification/ioc';

@injectable()
export class InnerServiceTwo {
    doTwo(): void {
        console.log('Inner Two');
    }
}
