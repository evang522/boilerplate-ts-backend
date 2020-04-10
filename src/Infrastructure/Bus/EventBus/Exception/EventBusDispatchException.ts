import ExtendableError from '../../../../Domain/Common/Exception/ExtendableError';

class EventBusDispatchException extends ExtendableError
{
    private constructor(
        public message: string,
        private originalError: Error | null = null,
    )
    {
        super(message);
        this.originalError = originalError;
    }

    public static forEventId(
        eventId: string,
        originalError?: Error,
    ): EventBusDispatchException
    {
        return new this(
            // eslint-disable-next-line max-len
            `Dispatching Event with Id: "${eventId}" failed. ${originalError ? ': ' + originalError.message : ''}`,
            originalError,
        );
    }

    public getOriginalError(): Error | null
    {
        return this.originalError;
    }
}

export default EventBusDispatchException;
