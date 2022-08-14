import { ContainerTools } from './container-tools';
import { Ctor, InversificationStrategy } from './types';
import { Inversification } from './inversification';
import { ConfigManager } from './config-manager';
import { InjectionEventEmitter } from './injection-event-emitter';

export function injectable() {
    return (target: Ctor) => {
        if (ConfigManager.getInstance().strategy === InversificationStrategy.MANUAL) {
            return;
        }
        Inversification.bind(target.name).to(target);
    };
}

export function inject(name: string) {
    return (target: any, key: string): void => {
        const doInjection = () => {
            target[key] = ContainerTools.getService(name);
        };

        if (ConfigManager.getInstance().strategy === InversificationStrategy.AUTO) {
            doInjection();
            return;
        }

        InjectionEventEmitter.once(`inject:${name}`, () => doInjection());
    };
}
