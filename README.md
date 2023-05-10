# Notable Demo Project

NB to read about how I set up the front end please go [here](frontend/README.md)

Also a quick tour of the project folders

- backend 
  - Azure functions Docker container with a simple typescript based function using Prisma to talk to MySQL
- frontend 
  - src - The source code for the front end split into
    - client - consists of
      - pages
      - components
    - server
      - modules/view - A simple NestJS module for handling requests and routing them to NextJS when required
  - test
    - postman - A simple postman collection for making your manual testing life easier

- db-init
  - Super simple docker container that is only used once to set up the database, table and a few rows. I could have used Prisma migrations but where's the fun in that? Also this is more capable than Prisma migrations, say for example you wanted to deploy some DDL scripts to stand up some stored procedures, schemas, users etc. YMMV it's just a cool example of a throwaway docker container (known in Kubernetes land as an init container) doing its thing. Also some nice docker-compose stuff in there about waiting for health checks for databases to come up before proceeding.

## Background

This project was brought about by intrigue, as the best projects always are. The intrigue was triggered by a job spec.

An excerpt from this specification reads :

Skills:

- TypeScript
- React Next.js
- NestJS
- Prisma
- MySQL
- Azure Function Apps
- Azure DevOps

You may notice *both* Next and NestJS listed. This set me thinking. There are 2 possibilites :

- 1: Two seperate microservices, one running each.
- 2: One microservce, running both.

<img src='https://media2.giphy.com/media/k74OUg6bPJKy2JmyoS/giphy.gif?cid=ecf05e471fthp489xsw4ykk8fub10xw71b5oujy9ndcrq3lg&ep=v1_gifs_search&rid=giphy.gif&ct=g' />

Why would you want to do this?
Well we can think of NestJS being like the MVC part of the equation, where it is trying to bring some structure to the front end in the form of controllers and modules and services and stuff.
We can also think of NextJS as being good at rendering stuff client side, or server side (both as Server Side Rendering - SSR and Server side generated - SSG )

I'm either way off base here, or absolutely on the money. Either way I have to spin this tech stack up before I can fully grok it.
I'm glad I did as there are a few pitfalls to be aware of.

<img src='https://media3.giphy.com/media/3oKIPnbKgN3bXeVpvy/giphy.gif?cid=ecf05e474g9ntr0n52r3d7l1zktt34uvjeos0slncri3m0my&ep=v1_gifs_search&rid=giphy.gif&ct=g' />

OK first the boring stuff.

## The tech stack

![stack](./stack.png)

The key takeaway here is Next and Nest both side by side.

<img src='https://media3.giphy.com/media/XMFxEpeOSDNGE/giphy.gif?cid=ecf05e47xzhj5simp04y9ivldxebxf78geu69v917rawrw24&ep=v1_gifs_search&rid=giphy.gif&ct=g' />


Take a look at this controller class.

This is a NestJS Controller

```typescript
import { Controller, Get, Put, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';

import { ViewService } from './view.service';

@Controller('/')
export class ViewController {
  constructor(private viewService: ViewService) {}

  @Get('about')
  public async about(@Req() req: Request, @Res() res: Response) {
    const handle = this.viewService.getNextServer().getRequestHandler();
    handle(req, res);
  }

  @Get('todos')
  static(@Req() req: Request, @Res() res: Response) {
    const handle = this.viewService.getNextServer().getRequestHandler();
    handle(req, res);
  }

  @Get('api/todos')
  public async api_todos(@Req() req: Request, @Res() res: Response) {
    const todos = await this.viewService.getTodos();
    res.json(todos);
  }

  @Put('api/todos/:id')
  public async update_todo(@Req() req: Request, @Res() res: Response) {
    const todo = await this.viewService.updateTodo(req.body);
    res.json(todo);
  }
}
```

Take a look at the first endpoint

```typescript
@Get('about')
  public async about(@Req() req: Request, @Res() res: Response) {
    const handle = this.viewService.getNextServer().getRequestHandler();
    handle(req, res);
}
```

The viewService has a getNextServer method which returns an instance of the NextServer created at start up by this function within the service

```typescript
async onModuleInit(): Promise<void> {
    try {
      const dev = process.env.NODE_ENV !== 'production';
      this.server = next({
        dev: dev,
        dir: './src/client',
      });
      await this.server.prepare();
    } catch (error) {
      console.log(error);
    }
  }
```

The getRequestHandlerMethod of the NextServer then received the request and response objects and takes over the driving. 
NestJS effectively delegates responsibility to NextJS for this Route.

This in turn loads the page stored at /src/client/pages/about.tsx

```typescript
import { NextPage } from 'next';

const About: NextPage = () => {
    return (
        <>
            <h1>About this app</h1>
            <p>This app was put together to showcase using Nest and Next together.</p>
            <p>This page will be rendered at build time by next js and will be served as a static HTML file</p>
            <p>This is known as SSG - <a href='https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation'>Static Site Generation</a></p>
        </>
    )
}

export default About;
```

Normal NextJS rules apply so you can use CSR, SSR or SSG as you see fit.

<img src='https://media3.giphy.com/media/NEvPzZ8bd1V4Y/giphy.gif?cid=ecf05e4773yicf3sorsdlcwzhvhs974jz2l6nk8oekx5ppli&ep=v1_gifs_search&rid=giphy.gif&ct=g' />

The next route is 

```typescript
@Get('api/todos')
  public async api_todos(@Req() req: Request, @Res() res: Response) {
    const todos = await this.viewService.getTodos();
    res.json(todos);
  }
```

Which just fires of a request to the getTodos() method on the service.

```typescript
async getTodos(): Promise<ToDoItemType[]> {
    return await axios
      .get<ToDoItemType[]>(urls.todos, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.data);
  }
```

This in turn fires of an axios request to the azure function layer.

A double api call?

<img src='https://media1.giphy.com/media/gd09Y2Ptu7gsiPVUrv/giphy.gif?cid=ecf05e478inbrhlbngg9abeypgslxk00ek3d125ldrwsuufb&ep=v1_gifs_search&rid=giphy.gif&ct=g' />

This is the BFF Pattern (Backend for your front end). I will leave this reading up to you [here](https://medium.com/mobilepeople/backend-for-frontend-pattern-why-you-need-to-know-it-46f94ce420b0)

Suffice it so say in this trivial example it is overkill but there are examples like where you want to provide a single api call to the front end while making multiple api calls to the back end and stitching the response togtether in the bff. It's a great way to divide a room full of developers and cloud architects :-D

# Running locally 

### Create Environment file
```bash
echo "DATABASE_URL='mysql://notable_user:n0tabl3@localhost:3306/notable_db'" > backend/.env
```

# Docker
### Initial setup

```bash
git clone https://github.com/suityou01/notable-demo.git
cd notable-demo/frontend
npm install
cd ..
cd ..
```


```bash
# Make sure nothing is running on 0.0.0.0:3306
docker-compose --profile dbinit up --build
```

### Full stack
```bash
docker-compose --profile fullstack up
```

### DB Only 
```bash
docker-compose --profile dbonly
```

### Backend only
```bash
docker-compose --profile backendonly
```
