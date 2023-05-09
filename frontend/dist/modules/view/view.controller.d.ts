import { Request, Response } from 'express';
import { ViewService } from './view.service';
export declare class ViewController {
    private viewService;
    constructor(viewService: ViewService);
    static(req: Request, res: Response): void;
    api_todos(req: Request, res: Response): Promise<void>;
    assets(req: Request, res: Response): Promise<void>;
    favicon(req: Request, res: Response): Promise<void>;
}
