# @viness/di

A lightweight di framework base on vscode instantiation.

# Installation

```bash
npm install --save @viness/core
```

# Get Start

```ts
import { Container, createDecorator } from '@viness/core'

const container = new Container();

const ITestService = createDecorator('ITestService')

interface ITestService {
    hello(): void
}

class TestService implements ITestService {
    hello(): void {
        console.log('hello world');
    }
}

container.register(ITestService, TestService)
```

# Todo

- [x] support initialize mult-isntances of a service
- [ ] support complex hierarchical DI systems: one container can have multiple parents or children
