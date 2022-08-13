import { ContainerTools } from './container';
import { Ctor } from './types';

export function injectable() {
    return (target: Ctor) => {
        ContainerTools.registerService(target);
    };
}

export function inject(name: string) {
    return (target: any, key: string): void => {
        target[key] = ContainerTools.getService(name);
    };
}
