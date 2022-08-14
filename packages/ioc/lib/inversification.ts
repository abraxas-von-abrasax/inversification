import { InversificationDiscover } from './inversification-discover';
import { RegisteredService } from './registered-service';
import { ContainerTools } from './container-tools';
import { InversificationStrategy } from './types';
import { ConfigManager } from './config-manager';

export namespace Inversification {
    export function setStrategy(strategy: InversificationStrategy): void {
        ConfigManager.getInstance().strategy = strategy;
    }

    export function discoverInjectables(srcDirectory = 'src'): string[] {
        return InversificationDiscover.getFilesRecursively(srcDirectory)
            .filter(filePath => InversificationDiscover.isDecorated(filePath.absPath))
            .map(filePath => filePath.importable)
            .map(filePath => filePath.replace('.ts', ''));
    }

    export function bind(name: string): RegisteredService {
        const service = new RegisteredService(name);
        ContainerTools.registerService(service);
        return service;
    }

    export function getService<T = any>(name: string): T {
        return ContainerTools.getService<T>(name);
    }
}
