import { Ctor, InversificationStrategy } from './types';
import { InjectionEventEmitter } from './injection-event-emitter';
import { ConfigManager } from './config-manager';

export class RegisteredService {
    private readonly _name: string;
    private ctor: Ctor | null = null;

    constructor(name: string) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    get service(): Ctor {
        if (!this.ctor) {
            throw new Error(`No injectable bound to name '${this._name}'.`);
        }
        return this.ctor;
    }

    to<T extends Ctor>(service: T): void {
        this.ctor = service;
        if (ConfigManager.getInstance().strategy === InversificationStrategy.MANUAL) {
            InjectionEventEmitter.emit(`inject:${this._name}`);
        }
    }
}
