import { OnModuleInit } from '@nestjs/common';
import { Request, Response } from 'express';
import { NextServer } from 'next/dist/server/next';
export declare class ViewService implements OnModuleInit {
    private server;
    onModuleInit(): Promise<void>;
    getNextServer(): NextServer;
    handler(req: Request, res: Response): Promise<void>;
    getTodos(req: Request): Promise<any>;
}
