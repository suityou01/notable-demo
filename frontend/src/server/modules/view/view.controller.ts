import { Controller, Get, Put, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';

import { ViewService } from './view.service';

@Controller('/')
export class ViewController {
  constructor(private viewService: ViewService) {}

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

  @Get('_next*')
  public async assets(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }

  @Get('favicon.ico')
  public async favicon(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }
}
