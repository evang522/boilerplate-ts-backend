import express, {
    Request, Response,
} from 'express';

export default interface ControllerInterface {
    handleRequest(request: Request, responseService: Response): Promise<void>;
    initialize(app: express.Application): void;
    route(): string;
}
