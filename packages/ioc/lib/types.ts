import { RegisteredService } from './registered-service';

export type Ctor = new (...args: any[]) => any;

export class ServiceRegistry extends Map<string, RegisteredService> {}

export class InstanceMap<T = any> extends Map<string, T> {}

export enum InversificationStrategy {
    AUTO = 'auto',
    MANUAL = 'manual',
}
