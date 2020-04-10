import ExtendableError from '../../../../Domain/Common/Exception/ExtendableError';

class CommandBusDispatchException extends ExtendableError
{
    private constructor(
        public message: string,
        private originalError: Error | null = null,
    )
    {
        super(message);
        this.originalError = originalError;
    }

    public static forCommandId(
        commandId: string,
        originalError?: Error,
    ): CommandBusDispatchException
    {
        return new this(
            // eslint-disable-next-line max-len
            `Dispatching Command with Id: "${commandId}" failed. ${originalError ? ': ' + originalError.message : ''}`,
            originalError,
        );
    }

    public getOriginalError(): Error | null
    {
        return this.originalError;
    }
}

export default CommandBusDispatchException;
