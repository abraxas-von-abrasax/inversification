import { Ctor, ServicesMap } from './types';

const services = new ServicesMap();

export namespace ContainerTools {
    export function registerService(service: Ctor): void {
        if (services.has(service.name)) {
            throw new Error(`Cannot register service '${service.name}'. A binding with this name already exists.`);
        }
        services.set(service.name, new service());
    }

    export function getService<T = any>(name: string): T {
        const service = services.get(name);

        if (!service) {
            throw new Error(`No binding found for service '${name}'.`);
        }

        return service as T;
    }

    export function clearServices(): void {
        services.clear();
    }
}
