import ResponseHandlerFactoryInterface from './ResponseHandlerFactoryInterface';
import ResponseInterface from '../../ResponseInterface';
import JsonResponse from '../../JsonResponse';
import JsonResponseHandler from '../JsonResponseHandler';
import { Response } from 'express';
import ResponseHandlerInterface from '../Interface/ResponseHandlerInterface';

class ResponseHandlerFactory implements ResponseHandlerFactoryInterface
{
    public resolveHandler(response: ResponseInterface, responseService: Response): ResponseHandlerInterface
    {
        if (response instanceof JsonResponse)
        {
            return new JsonResponseHandler(response, responseService);
        }

        return new JsonResponseHandler(response, responseService);
    }
}

export default ResponseHandlerFactory;
