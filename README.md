# Inversification

<div class="panel panel-warning">
Deprecation
{: .panel-heading}
<div class="panel-body">
Deprecated in favor of [https://www.npmjs.com/package/@inversification/ioc](https://www.npmjs.com/package/@inversification/ioc)
{: .alert .alert-warning}
</div>
</div>

A simple, lightweight, dependency-free and decorator-based IOC container for Node

## Usage

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
