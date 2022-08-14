import { Inversification, InversificationStrategy } from '@inversification/ioc';

Inversification.setStrategy(InversificationStrategy.MANUAL);

import { Controller } from './controller';
import { OuterService } from './services/outer-service';
import { InnerServiceOne } from './services/inner-service-one';
import { InnerServiceTwo } from './services/inner-service-two';

Inversification.bind(Controller.name).to(Controller);
Inversification.bind(OuterService.name).to(OuterService);
Inversification.bind(InnerServiceOne.name).to(InnerServiceOne);
Inversification.bind(InnerServiceTwo.name).to(InnerServiceTwo);
