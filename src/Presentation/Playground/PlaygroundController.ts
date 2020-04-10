import AbstractController from '../../Infrastructure/Api/Controller/AbstractController';
import ResponseInterface from '../../Infrastructure/Api/Response/ResponseInterface';
import { Request } from 'express';
import JsonResponse from '../../Infrastructure/Api/Response/JsonResponse';

class PlaygroundController extends AbstractController
{
    protected async processRequest(request: Request): Promise<ResponseInterface>
    {
        return new JsonResponse({
            playgroundResponse: 'Hello World!',
        });
    }

    public route(): string
    {
        return '/playground';
    }
}

export default PlaygroundController;
