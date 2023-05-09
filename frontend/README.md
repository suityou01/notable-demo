<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  <a href="http://nestjs.com/" target="blank"><img src="https://www.svgrepo.com/show/354113/nextjs-icon.svg" width="196" style="background-color: white; border-radius: 50%; border: 3px solid black;" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

[Please scroll down to CB-S Tweaks at the bottom to see the steps to integrate next-js](##cb-s-tweaks)

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## CB-S Tweaks

Based on the excellent article [Render next-js with-nestjs, did I just made (sic) next js better?](https://plainenglish.io/blog/render-next-js-with-nestjs-did-i-just-made-next-js-better-aa294d8d2c67)

Some gaps filled in with this article on how to build a [custom server using next.js](https://nextjs.org/docs/pages/building-your-application/configuring/custom-server)

```bash
# install dependencies
npm install next react react-dom

# install dev dependencies
npm install -d @types/react @types/react-dom rimraf

```

```bash
# create file structure
cd frontend
mkdir src/server/modules/view -p
mkdir src/client/pages -p
cp src app.module.ts src/server
cp src main.ts src/server
touch src/server/modules/view/view.service.ts
touch src/server/modules/view/view.controller.ts
touch src/server/modules/view/view.module.ts
touch src/client/pages/index.tsx
rm *.*
```

```js
// change nest-cli.json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src/server",
}
```

```json
// add include to tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2017",
    "sourceMap": true,
    "outDir": "./dist",
    "incremental": true,
    "jsx": "preserve"
  },
  "include": ["src/server/**/*.ts"],
}
```

```typescript
// add src/server/modules/view/view.service.ts code
import { Injectable, OnModuleInit } from '@nestjs/common';
import next from 'next';
import NextServer from 'next/dist/next-server/server/next-server';

@Injectable()
export class ViewService implements OnModuleInit {
  private server: NextServer;

  async onModuleInit(): Promise<void> {
    try {
      this.server = next({ dev: true, dir: './src/client' });
      await this.server.prepare();
    } catch (error) {
      console.log(error);
    }
  }

  getNextServer(): NextServer {
    return this.server;
  }
}
```

```typescript
// add src/server/modules/view/view.controller.ts code
import { Controller, Get, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';

import { ViewService } from './view.service';

@Controller('/')
export class ViewController {
  constructor(private viewService: ViewService) {}

  @Get('*')
  static(@Req() req: Request, @Res() res: Response) {
    const handle = this.viewService.getNextServer().getRequestHandler();
    handle(req, res);
  }
}
```

```typescript
// add src/server/modules/view/view.module.ts code
import { Module } from '@nestjs/common';

import { ViewController } from './view.controller';
import { ViewService } from './view.service';

@Module({
  imports: [],
  providers: [ViewService],
  controllers: [ViewController],
})
export class ViewModule {}

```

```typescript
// change contents of src/app.module.ts code
import { Module } from '@nestjs/common';

import { ViewModule } from './modules/view/view.module';

@Module({
  imports: [ViewModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

```

```typescript
import React from 'react';
import { NextPage } from 'next';

const Home: NextPage = () => {
 return <h1>Hello, World!</h1>
}

export default Home

```