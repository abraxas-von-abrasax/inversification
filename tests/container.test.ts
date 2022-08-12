import { ContainerTools } from '../src';

const ServiceMock = jest.fn().mockImplementation(() => ({
    name: 'ServiceMock',
    someFn: jest.fn(),
}));

describe('container', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should register service correctly', () => {
        ContainerTools.registerService(ServiceMock);
        const service = ContainerTools.getService(ServiceMock.name);
        expect(service.name).toBe('ServiceMock');
        ContainerTools.clearServices();
    });

    it('should throw when registering service twice', () => {
        ContainerTools.registerService(ServiceMock);
        const secondRegister = () => ContainerTools.registerService(ServiceMock);
        expect(secondRegister).toThrow('Cannot register service');
    });

    it('should throw if trying to access unknown service', () => {
        const fetcher = () => ContainerTools.getService('unregistered');
        expect(fetcher).toThrow('No binding found');
    });
});
