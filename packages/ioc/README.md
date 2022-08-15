# Inversification

<!--suppress HtmlDeprecatedAttribute -->
<p align="center">
    <img alt="License: MIT" src="https://img.shields.io/npm/l/@inversification/ioc" />
    <img alt="Version on npm" src="https://img.shields.io/npm/v/@inversification/ioc" />
    <img alt="Test coverage" src="https://img.shields.io/codecov/c/github/abraxas-von-abrasax/inversification/main" />
    <img alt="Minified size" src="https://img.shields.io/bundlephobia/min/@inversification/ioc" />
</p>

A simple, lightweight, dependency-free and decorator-based IOC container for Node

## Basic Usage

Register a class with the `@injectable` decorator:

```typescript
// src/inject-me.ts

import { injectable } from 'inversification';

@injectable()
export class InjectMe {
    doThings() {
        console.log('A thing');
    }
}
```

Inject your service with the property decorator `@inject`:

```typescript
// src/consumer.ts

import { inject } from 'inversification';
import { InjectMe } from './inject-me.ts';

export class Consumer {
    @inject(InjectMe.name) private service: InjectMe;

    callMe() {
        this.service.doThings();
    }
}
```

```typescript
// src/main.ts

import { Consumer } from './consumer.ts';

const consumer = new Consumer();
consumer.callMe(); // >> 'A thing'
```

In this basic example you need to typecast the injected service class
directly:

```typescript
import { inject } from '@inversification/ioc';

export class Consumer {
    @inject('InjectMe') private service: InjectMe;
    //      ^^^^^^^^^^------- injected service's name - can be a string
    // typecast to actual service -------^^^^^^^^
}
```

You can find a [full example here](https://github.com/abraxas-von-abrasax/inversification/tree/main/samples/basic-usage).

## Auto-discover injectables

The basic usage assumes that you provide the actual class type when injecting
your services. However, `inversification` comes with an auto-discover functionality
which you can leverage to discover `injectables`:

```typescript
// src/enums/services.ts

export enum Services {
    INJECTABLE_SERVICE = 'MyInjectableImpl',
}
```

```typescript
// src/interfaces/my-injectable.ts

export interface MyInjectable {
    doThings(): void;
}
```

```typescript
// src/services/my-injectable-impl.ts

import { injectable } from '@inversification/ioc';
import { MyInjectable } from '../interfaces/my-injectable';

export class MyInjectableImpl implements MyInjectable {
    doThings(): void {
        console.log('Doing things');
    }
}
```

```typescript
// src/consumer.ts

import { inject } from '@inversification/ioc';
import { Services } from './services/services';
import { MyInjectable } from './interfaces/my-injectable';
// Note: The actual implementation does not need to be imported!

export class Consumer {
    @inject(Services.INJECTABLE_SERVICE) private service: MyInjectable;
    //                           just an interface -------^^^^^^^^^^^^
    
    run(): void {
        this.service.doThings();
    }
}
```

```typescript
// src/main.ts

import { Inversification } from '@inversification/ioc';

// discoverInjectables() assumes that your source files live in the 'src'
// directory and will find all classes with an @injectable() decorator.
const modules = Inversification.discoverInjectables();

// You can then require these modules
modules.forEach(module => require(module));

// Consumer needs to be imported after requiring the injectables.
const { Consumer } = require('./consumer');
const consumer = new Consumer();
consumer.run();
```

If your source files do not live in `src`, you can specify an alternative directory:

```typescript
// main.ts

import { Inversification } from '@inversification/ioc';
import path from 'path';

const modules = Inversification
    .discoverInjectables(path.join('packages', 'my-lib', 'sources'));

modules.forEach(module => require(module));
```

If you want to use the ES-style import syntax, you can wrap your
importing logic in an `async` function:

```typescript
// src/main.ts

import { Inversification } from '@inversification/ioc';

Inversification
    .discoverInjectables()
    .forEach(module => require(module));

main();

async function main() {
    const { Consumer } = await import('./consumer');
    const consumer = new Consumer();
    controller.run();
}
```

You can find a [full example here](https://github.com/abraxas-von-abrasax/inversification/tree/main/samples/auto-discover).

## Manual binding

`inversification` comes with a handy auto-discover functionality. However,
sometimes you need to have full control over your dependency injection flow.
In this case, you can configure `inversification` to use the
`InversificationStrategy.MANUAL` strategy:

```typescript
// src/ioc.ts

import { Inversification, InversificationStrategy } from '@inversification/ioc';

// Setting the strategy to 'manual' disables the auto-injection.
// You need to set the strategy before importing/requiring your injectables.
Inversification.setStrategy(InversificationStrategy.MANUAL);

import { Controller } from './controller';
import { OuterService } from './services/outer-service';
import { InnerServiceOne } from './services/inner-service-one';
import { InnerServiceTwo } from './services/inner-service-two';

Inversification.bind(Controller.name).to(Controller);
Inversification.bind(OuterService.name).to(OuterService);
Inversification.bind(InnerServiceOne.name).to(InnerServiceOne);
Inversification.bind(InnerServiceTwo.name).to(InnerServiceTwo);
```

```typescript
// src/main.ts

import { Inversification } from '@inversification/ioc';
import './ioc';

import { Controller } from './controller';

const controller = Inversification
    .getService<Controller>(Controller.name);

controller.run();
```

You can find a [full example here](https://github.com/abraxas-von-abrasax/inversification/tree/main/samples/manual-binding).
