import ControllerInterface from './ControllerInterface';
import {
    Request, Response,
} from 'express';
import ResponseInterface from '../Response/ResponseInterface';
import ResponseHandlerFactoryInterface from '../Response/Handler/Factory/ResponseHandlerFactoryInterface';
import ResponseHandlerFactory from '../Response/Handler/Factory/ResponseHandlerFactory';
import express from 'express';

abstract class AbstractController implements ControllerInterface
{
    public constructor(private responseHandlerFactory: ResponseHandlerFactoryInterface = new ResponseHandlerFactory() )
    {
    }

    /**
     * @description Do not override this method in a child class!
     */
    public handleRequest = async(request: Request, responseService: Response): Promise<void> =>
    {
        const response = await this.processRequest(request);

        this.responseHandlerFactory.resolveHandler(response, responseService).handle();
    }

    public initialize(app: express.Application): void
    {
        app.use(this.route(), this.handleRequest);
    }

    abstract route(): string;

    protected abstract async processRequest(request: Request): Promise<ResponseInterface>;
}

export default AbstractController;
