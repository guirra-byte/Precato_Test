import { Request, Response } from 'express';
import { RequestMessageReceiversUseCase } from './RequestMessageReceiversUseCase'; 

export class RequestMessageReceiversController {
    constructor(private requestMessageReceiversUseCase: RequestMessageReceiversUseCase){}

    async handle(request: Request, response: Response): Promise<Response> {}
}