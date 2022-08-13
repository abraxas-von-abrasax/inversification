# Inversification

A simple, lightweight, dependency-free and decorator-based IOC container for Node

## Basic Usage

Register a class with the `@injectable` decorator:

```typescript
// inject-me.ts

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
// consumer.ts

import { inject } from 'inversification';
import { InjectMe } from './inject-me.ts';

export class Consumer {
    @inject(InjectMe.name) private service: InjectMe;

    callMe() {
        this.service.doThings();
    }
}

/********/
/********/

// main.ts

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

## Auto-discover injectables

The basic usage assumes that you provide the actual class type when injecting
your services. However, `inversification` comes with an auto-discover functionality
which you can leverage to discover `injectables`:

```typescript
// services.ts

export enum Services {
    INJECTABLE_SERVICE = 'MyInjectableImpl',
}
```

```typescript
// interfaces.ts

export interface MyInjectable {
    doThings(): void;
}
```

```typescript
// my-injectable-impl.ts

import { injectable } from '@inversification/ioc';
import { MyInjectable } from './interfaces';

export class MyInjectableImpl implements MyInjectable {
    doThings(): void {
        console.log('Doing things');
    }
}
```

```typescript
// consumer.ts

import { inject } from '@inversification/ioc';
import { Services } from './services';
import { MyInjectable } from './interfaces';
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
import { setupIOC } from '@inversification/ioc';

// setupIOC assumes that your source files live in the 'src' directory
// and will find all classes with an @injectable() decorator.
const modules = setupIOC();

// You can then require these modules
modules.forEach(module => require(module));

// Consumer needs to be imported after requiring the injectables.
const { Consumer } = require('./consumer');
const consumer = new Consumer();
controller.run();
```

If your source files do not live in `src`, you can specify an alternative directory:

```typescript
import { setupIOC } from '@inversification/ioc';
import path from 'path';

const modules = setupIOC(path.join('packages', 'my-lib', 'sources'));

modules.forEach(module => require(module));
```

If you want to use the ES-style import syntax, you can wrap your
importing logic in an `async` function:

```typescript
import { setupIOC } from '@inversification/ioc';

const modules = setupIOC();

modules.forEach(module => require(module));

main();

async function main() {
    const { Consumer } = await import('./consumer');
    const consumer = new Consumer();
    controller.run();
}
```
