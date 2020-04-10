import ResponseInterface from '../../ResponseInterface';
import ResponseHandlerInterface from '../Interface/ResponseHandlerInterface';
import { Response } from 'express';

export default interface ResponseHandlerFactoryInterface
{
    resolveHandler(response: ResponseInterface, responseService: Response): ResponseHandlerInterface;
}
