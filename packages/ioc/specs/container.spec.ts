import { ContainerTools } from '../lib/container-tools';
import { RegisteredService } from '../lib/registered-service';

const ServiceMock = jest.fn().mockImplementation(() => ({
    name: 'ServiceMock',
    someFn: jest.fn(),
}));

const registeredServiceMock = new RegisteredService('mockConstructor');
registeredServiceMock.to(ServiceMock);

describe('container', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should register service correctly', () => {
        ContainerTools.registerService(registeredServiceMock);
        const service = ContainerTools.getService(ServiceMock.name);
        expect(service.name).toBe('ServiceMock');
        ContainerTools.clearServices();
    });

    it('should throw when registering service twice', () => {
        ContainerTools.registerService(registeredServiceMock);
        const secondRegister = () => ContainerTools.registerService(registeredServiceMock);
        expect(secondRegister).toThrow('Cannot register service');
    });

    it('should throw if trying to access unknown service', () => {
        const fetcher = () => ContainerTools.getService('unregistered');
        expect(fetcher).toThrow('No binding found');
    });
});
