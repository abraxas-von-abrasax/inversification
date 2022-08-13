import { setupIOC } from '@inversification/ioc';
import path from 'path';

setupIOC(path.join('samples', 'live-test', 'src')).forEach(module => require(module));

main().catch(error => {
    console.error('Error while running main:', error);
});

async function main() {
    const { Controller } = await import('./controller');
    const controller = new Controller();
    controller.run();
}
