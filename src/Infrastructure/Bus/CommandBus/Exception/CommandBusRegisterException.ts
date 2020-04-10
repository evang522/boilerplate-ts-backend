import ExtendableError from '../../../../Domain/Common/Exception/ExtendableError';

class CommandBusRegisterException extends ExtendableError
{
    private constructor(public message: string)
    {
        super(message);
    }

    public static forCommandId(commandId: string, additionalDetails?: string): CommandBusRegisterException
    {
        return new this(
            // eslint-disable-next-line max-len
            `Registering Command with Id: "${commandId}" to handler failed. ${additionalDetails ? ': ' + additionalDetails : ''}`
        );
    }
}

export default CommandBusRegisterException;
