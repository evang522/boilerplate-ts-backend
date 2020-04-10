import ExtendableError from '../../../../Domain/Common/Exception/ExtendableError';

class QueryBusDispatchException extends ExtendableError
{
    private constructor(
        public message: string,
        private originalError: Error | null = null,
    )
    {
        super(message);
        this.originalError = originalError;
    }

    public static forQueryId(
        queryId: string,
        originalError?: Error,
    ): QueryBusDispatchException
    {
        return new this(
            // eslint-disable-next-line max-len
            `Dispatching Query with Id: "${queryId}" failed. ${originalError ? ': ' + originalError.message : ''}`,
            originalError,
        );
    }

    public getOriginalError(): Error | null
    {
        return this.originalError;
    }
}

export default QueryBusDispatchException;
