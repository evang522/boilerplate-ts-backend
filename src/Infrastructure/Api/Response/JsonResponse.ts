import ResponseInterface from './ResponseInterface';

class JsonResponse implements ResponseInterface
{
    public constructor(private data: any)
    {
        // TODO: Put this in an assertion class
        try
        {
            JSON.stringify(data);
            if (!(data instanceof Object) )
            {
                throw Error('Bad data!');
            }
        }
        catch (e)
        {
            throw new Error(e.message);
        }
    }

    public getData(): string
    {
        return this.data;
    }

    public getHeaders(): any
    {
        return {};
    }
}

export default JsonResponse;
