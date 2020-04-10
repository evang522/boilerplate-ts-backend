import ResponseHandlerInterface from './Interface/ResponseHandlerInterface';
import AbstractResponseHandler from './AbstractResponseHandler';

class JsonResponseHandler extends AbstractResponseHandler implements ResponseHandlerInterface
{
    public handle(): void
    {
        this.responseService.json(this.response.getData());
    }
}

export default JsonResponseHandler;
