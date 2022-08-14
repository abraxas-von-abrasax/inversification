import { Inversification } from '@inversification/ioc';
import path from 'path';

Inversification
    .discoverInjectables(path.join('samples', 'auto-discover', 'src'))
    .forEach(module => require(module));

main().catch(error => {
    console.error('Error while running main:', error);
});

async function main() {
    const { Controller } = await import('./controller');
    const controller = new Controller();
    controller.run();
}
