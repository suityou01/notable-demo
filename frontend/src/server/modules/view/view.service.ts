import { Injectable, OnModuleInit } from '@nestjs/common';
import next from 'next';
import { Request, Response } from 'express';
import { NextServer } from 'next/dist/server/next';
import urls from 'src/server/bffUrls';
import axios from 'axios';
import { ToDoItem } from '../../../common/types';

@Injectable()
export class ViewService implements OnModuleInit {
  private server: NextServer;

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

  getNextServer(): NextServer {
    return this.server;
  }

  handler(req: Request, res: Response) {
    return this.server.getRequestHandler()(req, res);
  }

  async getTodos() {
    return await axios
      .get(urls.todos, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.data);
  }

  async updateTodo(todo: ToDoItem) {
    return await axios
      .put(`${urls.todo}${todo.id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.data);
  }
}
