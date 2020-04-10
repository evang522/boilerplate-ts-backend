import ExtendableError from '../../../../Domain/Common/Exception/ExtendableError';

class QueryBusRegisterException extends ExtendableError
{
    private constructor(public message: string)
    {
        super(message);
    }

    public static forQueryId(queryId: string, additionalDetails?: string): QueryBusRegisterException
    {
        return new this(
            // eslint-disable-next-line max-len
            `Registering Query with Id: "${queryId}" to handler failed. ${additionalDetails ? ': ' + additionalDetails : ''}`
        );
    }
}

export default QueryBusRegisterException;
