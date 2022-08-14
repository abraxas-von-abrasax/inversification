import { inject, injectable } from '../lib';
import { ContainerTools } from '../lib/container-tools';

@injectable()
class InnerService {
    name = 'InnerService';
}

class OuterService {
    @inject(InnerService.name) innerService: InnerService;

    getName() {
        return this.innerService.name;
    }
}

describe('decorators', () => {
    it('should register service with injectable correctly', () => {
        const service = ContainerTools.getService<InnerService>(InnerService.name);
        expect(service.name).toBe('InnerService');
    });

    it('should inject service correctly', () => {
        const service = new OuterService();
        expect(service.getName()).toBe('InnerService');
    })
});
