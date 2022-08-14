import { InstanceMap, ServiceRegistry } from './types';
import { RegisteredService } from './registered-service';
import { BindingAlreadyExists } from './errors';

const registry = new ServiceRegistry();
const instances = new InstanceMap();

export namespace ContainerTools {
    export function registerService(service: RegisteredService): void {
        if (registry.has(service.name)) {
            throw new BindingAlreadyExists(service.name);
        }
        registry.set(service.name, service);
    }

    export function getService<T = any>(name: string): T {
        if (instances.has(name)) {
            return instances.get(name) as T;
        }

        const registeredService = registry.get(name);

        if (!registeredService || !registeredService.service) {
            throw new Error(`No binding found for injectable '${name}'.`);
        }

        let instance: T;

        try {
            instance = new registeredService.service();
        } catch (error) {
            let msg = `Could not instantiate injectable '${name}'`;
            if (error instanceof Error) {
                msg += `: ${error.message}`;
            }
            throw new Error(msg);
        }

        instances.set(name, instance);

        return instance as T;
    }

    export function clearServices(): void {
        instances.clear();
        registry.clear();
    }
}
