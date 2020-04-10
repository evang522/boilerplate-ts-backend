import ExtendableError from '../../../../Domain/Common/Exception/ExtendableError';

class EventBusRegisterException extends ExtendableError
{
    private constructor(public message: string)
    {
        super(message);
    }

    public static forEventId(eventId: string, additionalDetails?: string): EventBusRegisterException
    {
        return new this(
            // eslint-disable-next-line max-len
            `Registering Event with Id: "${eventId}" to handler failed. ${additionalDetails ? ': ' + additionalDetails : ''}`
        );
    }
}

export default EventBusRegisterException;
