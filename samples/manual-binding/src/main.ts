import { Inversification } from '@inversification/ioc';
import './ioc';

import { Controller } from './controller';

const controller = Inversification.getService<Controller>(Controller.name);

controller.run();
