import ResponseInterface from '../ResponseInterface';
import { Response } from 'express';

abstract class AbstractResponseHandler
{
    public constructor(protected response: ResponseInterface, protected responseService: Response)
    {}
}

export default AbstractResponseHandler;
